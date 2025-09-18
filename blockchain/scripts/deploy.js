const { ethers } = require("hardhat");

async function main() {
  console.log("🚀 Deploying HealthRecords contract...");
  
  const HealthRecords = await ethers.getContractFactory("HealthRecords");
  const healthRecords = await HealthRecords.deploy();
  
  await healthRecords.deployed();
  
  console.log("✅ HealthRecords deployed to:", healthRecords.address);
  console.log("📋 Save this address in your .env file as CONTRACT_ADDRESS");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Deployment error:", error);
    process.exit(1);
  });