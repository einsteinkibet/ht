// backend/config/blockchain.js
// Force mock contract for now (works in production on Render)

let healthRecordsContract;

if (process.env.NODE_ENV === 'production') {
  console.log('Production mode: Using mock blockchain');
  healthRecordsContract = createMockContract();
} else {
  try {
    // You can add your real blockchain setup here later
    console.log('Development mode: Using mock blockchain for now');
    healthRecordsContract = createMockContract();
  } catch (error) {
    console.error('Error creating real contract, falling back to mock:', error.message);
    healthRecordsContract = createMockContract();
  }
}

function createMockContract() {
  return {
    methods: {
      addRecord: function (patientId, recordHash) {
        return {
          send: async function ({ from, gas }) {
            console.log('MOCK: Adding record -', { patientId, recordHash, from });
            return {
              transactionHash: '0x' + Math.random().toString(16).substr(2, 64),
              status: true,
              from: from,
            };
          },
        };
      },
      getRecords: function (address) {
        return {
          call: async function () {
            console.log('MOCK: Getting records for -', address);
            return [
              {
                patientId: 'patient-001',
                recordHash: 'blood-test-normal-2024',
                timestamp: Date.now() - 86400000, // 1 day ago
              },
              {
                patientId: 'patient-001',
                recordHash: 'vaccine-covid-booster',
                timestamp: Date.now() - 172800000, // 2 days ago
              },
            ];
          },
        };
      },
    },
  };
}

// ✅ Make sure to export a default
export default healthRecordsContract;
