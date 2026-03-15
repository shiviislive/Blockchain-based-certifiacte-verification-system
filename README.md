# Blockchain-Based Certificate Verification System

A secure PDF-based certificate issuance and verification system using blockchain technology.

## 🧩 Overview
- **Smart contract**: Stores certificate hashes (SHA-256) on Ethereum.
- **Backend API**: Interacts with the contract via `ethers.js`.
- **Frontend**: Modern UI for uploading PDFs, generating hashes, issuing and verifying certificates.

## 🚀 Quick Start
1. Install dependencies:
   ```bash
   npm install
   cd backend && npm install && cd ..
   ```

2. Compile the contract:
   ```bash
   npx hardhat compile
   ```

3. Deploy locally (Hardhat network):
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

4. Configure environment (copy `backend/.env.example` to `backend/.env`):
   - Set `RPC_URL=http://127.0.0.1:8545`
   - Set your `PRIVATE_KEY` (without 0x prefix)
   - Set the deployed `CONTRACT_ADDRESS`

5. Start backend API:
   ```bash
   cd backend
   npm run start
   ```

6. Open the frontend:
   - Open `frontend/index.html` in your browser or use a local server

## 🔐 How it works
1. **Upload PDF**: User uploads a certificate PDF file
2. **Generate Hash**: System creates SHA-256 hash of the PDF content
3. **Issue Certificate**: Hash is stored on blockchain with metadata (recipient, course)
4. **Verify Certificate**: Anyone can upload the same PDF to verify against blockchain records

## 📁 Project Structure
- `contracts/`: Solidity smart contracts
- `scripts/`: Deployment scripts
- `backend/`: Node.js API server
- `frontend/`: Modern HTML/CSS/JS interface

## ✨ Features
- **PDF Upload**: Drag & drop or click to upload PDF certificates
- **Secure Hashing**: SHA-256 hash generation in the browser
- **Blockchain Storage**: Immutable certificate records on Ethereum
- **Verification**: Instant certificate authenticity checking
- **Modern UI**: Beautiful, responsive interface with animations
- **File Validation**: PDF type and size validation

---

*Built with Hardhat, Ethers.js, and modern web technologies.*
