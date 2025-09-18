// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract HealthRecords {
    struct HealthRecord {
        string patientId;
        string recordHash;
    }

    mapping(address => HealthRecord[]) public records;

    event RecordAdded(address indexed fromAddress, string patientId, string recordHash);

    function addRecord(string memory patientId, string memory recordHash) public {
        // Simple validation
        require(bytes(patientId).length > 0, "Patient ID required");
        require(bytes(recordHash).length > 0, "Record hash required");
        
        records[msg.sender].push(HealthRecord(patientId, recordHash));
        emit RecordAdded(msg.sender, patientId, recordHash);
    }

    function getRecords(address patientAddress) public view returns (HealthRecord[] memory) {
        return records[patientAddress];
    }
}