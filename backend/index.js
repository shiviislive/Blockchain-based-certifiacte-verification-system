require("dotenv").config();
const express = require("express");
const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const rpcUrl = process.env.RPC_URL;
const privateKey = process.env.PRIVATE_KEY;
const contractAddress = process.env.CONTRACT_ADDRESS;

if (!rpcUrl || !privateKey || !contractAddress) {
  console.error("Missing .env values. Copy backend/.env.example to backend/.env and configure RPC_URL, PRIVATE_KEY, CONTRACT_ADDRESS.");
  process.exit(1);
}

const provider = new ethers.JsonRpcProvider(rpcUrl);
const wallet = new ethers.Wallet(privateKey, provider);

const artifactPath = path.join(__dirname, "..", "artifacts", "contracts", "Certificate.sol", "CertificateRegistry.json");
if (!fs.existsSync(artifactPath)) {
  console.error("Contract artifact not found. Run `npx hardhat compile` from the project root.");
  process.exit(1);
}

const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
const contract = new ethers.Contract(contractAddress, artifact.abi, wallet);

app.post("/issue", async (req, res) => {
  try {
    const { certificateHash, recipientName, course } = req.body;
    const tx = await contract.issueCertificate(certificateHash, recipientName, course);
    const receipt = await tx.wait();
    res.json({ success: true, txHash: receipt.transactionHash });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post("/verify", async (req, res) => {
  try {
    const { certificateHash } = req.body;
    const result = await contract.verifyCertificate(certificateHash);
    const [issuer, recipientName, course, timestamp] = result;

    res.json({
      success: true,
      data: {
        exists: true,
        issuer,
        recipientName,
        course,
        timestamp: Number(timestamp)
      }
    });
  } catch (err) {
    // Check if it's a "Certificate not found" error
    if (err.message.includes("Certificate not found")) {
      res.json({
        success: true,
        data: {
          exists: false
        }
      });
    } else {
      res.status(500).json({ success: false, error: err.message });
    }
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Backend API listening on http://localhost:${port}`);
});
