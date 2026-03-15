// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @title Certificate Registry
/// @notice Store and verify certificates on-chain using a hash.
contract CertificateRegistry {
    struct Certificate {
        address issuer;
        string recipientName;
        string course;
        uint256 issuedAt;
    }

    mapping(bytes32 => Certificate) private certificates;

    event CertificateIssued(bytes32 indexed certificateHash, address indexed issuer, string recipientName, string course);

    /// @notice Stores a certificate fingerprint on-chain.
    /// @param certificateHash Keccak256 hash of the certificate payload.
    /// @param recipientName Name of the person receiving the certificate.
    /// @param course Course or program name.
    function issueCertificate(bytes32 certificateHash, string calldata recipientName, string calldata course) external {
        require(certificateHash != bytes32(0), "Invalid hash");
        require(certificates[certificateHash].issuedAt == 0, "Certificate already issued");

        certificates[certificateHash] = Certificate({
            issuer: msg.sender,
            recipientName: recipientName,
            course: course,
            issuedAt: block.timestamp
        });

        emit CertificateIssued(certificateHash, msg.sender, recipientName, course);
    }

    /// @notice Verifies a certificate exists for the given hash.
    /// @param certificateHash Keccak256 hash of the certificate payload.
    /// @return issuer Address that issued the certificate.
    /// @return recipientName Recipient name stored on-chain.
    /// @return course Course name stored on-chain.
    /// @return issuedAt Timestamp when it was issued.
    function verifyCertificate(bytes32 certificateHash)
        external
        view
        returns (address issuer, string memory recipientName, string memory course, uint256 issuedAt)
    {
        Certificate memory cert = certificates[certificateHash];
        require(cert.issuedAt != 0, "Certificate not found");

        return (cert.issuer, cert.recipientName, cert.course, cert.issuedAt);
    }

    /// @notice Checks whether a certificate exists.
    /// @param certificateHash Keccak256 hash of the certificate payload.
    /// @return exists True if the certificate is stored on-chain.
    function certificateExists(bytes32 certificateHash) external view returns (bool exists) {
        return certificates[certificateHash].issuedAt != 0;
    }
}
