export const contractAddress = "0xf4274085969ebfA00774Bb319ea571bE6a1D9aB5";
export  const abi = [
    {
      "inputs": [
        {
          "internalType": "uint256[][]",
          "name": "energyUsageData",
          "type": "uint256[][]"
        }
      ],
      "name": "addEnergyData",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_buyer",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [],
      "name": "buyer",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "energyData",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "epochTime",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "energyUsage",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getEnergyData",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "epochTime",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "energyUsage",
              "type": "uint256"
            }
          ],
          "internalType": "struct EnergyContract.EnergyData[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address payable",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
