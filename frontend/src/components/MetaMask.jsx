import React, { useState } from "react";
import { useMetaMask } from "metamask-react";
import { ethers } from "ethers";
function MetaMask({ usages }) {
  const contractAddress = "0xf4274085969ebfA00774Bb319ea571bE6a1D9aB5";
  const abi = [
    {
      inputs: [
        {
          internalType: "uint256[][]",
          name: "energyUsageData",
          type: "uint256[][]",
        },
      ],
      name: "addEnergyData",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_buyer",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      inputs: [],
      name: "buyer",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "energyData",
      outputs: [
        {
          internalType: "uint256",
          name: "epochTime",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "energyUsage",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "getEnergyData",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "epochTime",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "energyUsage",
              type: "uint256",
            },
          ],
          internalType: "struct EnergyContract.EnergyData[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address payable",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  // use the useMetaMask hook to access the MetaMask state
  const { status, connect, account, chainId, ethereum } = useMetaMask();
  // set the state for the sendTransaction and amount
  const [sendTransaction, setSendTransaction] = useState(false);
  const [amount, setAmount] = useState("");
  // set the state for the formatted data
  const [formattedData, setFormattedData] = useState(null);
  // if the status is initializing, return the initializing message
  if (status === "initializing")
    return <div>Synchronization with MetaMask ongoing...</div>;
  // if the status is unavailable, return the unavailable message
  if (status === "unavailable") return <div>MetaMask not available :(</div>;
  // if the status is notConnected, return the connect button
  if (status === "notConnected")
    return <button onClick={connect}>Connect to MetaMask</button>;
  // if the status is connecting, return the connecting message
  if (status === "connecting") return <div>Connecting...</div>;
  // if the status is connected, return the connected message
  if (status === "connected") {
    const handleAmount = (e) => {
      setAmount(e.target.value);
    };
    var usageData = [];
    // handle the transaction
    const handleTransaction = async () => {
      usageData = [];
      console.log("Sending transaction...");
      // Load the provider
      const provider = new ethers.providers.Web3Provider(ethereum);
      // Load the signer
      const signer = provider.getSigner();
      // Load the contract
      const contract = new ethers.Contract(contractAddress, abi, signer);
      // Call the contract
      try {
        // set the total cost to 0
        let totalCost = 0;
        let powerInKW = 0;
        // if the usages array is not empty, calculate the total cost
        if (usages.length > 0) {
          // loop through the usages array
          usages.forEach((reading, index) => {
            // if the index is greater than 0, calculate the cost
            if (index > 0) {
              // get the last reading
              const lastReading = usages[index - 1];
              // calculate the time difference
              const timeDiff = reading.time - lastReading.time;
              // calculate the power in kW
              powerInKW += reading.power;
              console.log("TotalPwerKw" + powerInKW);
              // calculate the cost
              const cost = (powerInKW / 3600) * timeDiff * 44;
              // add the usage data to the usageData array
              usageData.push([reading.time, reading.power]);
              // if the total cost is greater than or equal to amount, set the amount to amount
              if (totalCost >= amount) {
                setAmount(totalCost);
              } else {
                // continue to add the cost to the total cost
                totalCost += cost.toFixed(2);
              }
            }
          });
          let avePower = parseInt(powerInKW / usageData.length);
          avePower = avePower.toFixed(2) * 1000;
          let firstTime = parseInt(usageData[0][0]); // The first element's first value is the timestamp
          let lastTime = parseInt(usageData[usageData.length - 1][0]);
          console.log("firstTime" + firstTime);
          console.log("lastTime" + lastTime);
          console.log("AvePower" + avePower);
          var contractData = [
            [lastTime, avePower],
            [lastTime, avePower],
            [lastTime, avePower],
            [lastTime, avePower],
            [lastTime, avePower],
            [lastTime, avePower],
            [lastTime, avePower],
            [lastTime, avePower],
            [lastTime, avePower],
            [lastTime, avePower],
            [lastTime, avePower],
            [lastTime, avePower],
          ];
          console.log(contractData);
        }
        // add the energy usage data to the blockchain
        const transaction = await contract.addEnergyData(contractData, {
          value: ethers.utils.parseEther(amount),
        });
        await transaction.wait();
        setSendTransaction(true); // Set the state variable
      } catch (error) {
        console.log(error);
      }
    };

    const handleView = async () => {
      console.log("Viewing energy usage data...");

      // Load the provider
      const provider = new ethers.providers.Web3Provider(ethereum);
      // Load the signer
      const signer = provider.getSigner();
      // Load the contract
      const contract = new ethers.Contract(contractAddress, abi, signer);
      // Call the contract
      try {
        const usageData = await contract.getEnergyData();
        const formattedData = usageData.map(([epochTime, energyUsage]) => ({
          epochTime: epochTime.toNumber(),
          energyUsage: energyUsage.toNumber(),
        }));
        console.log(formattedData);
        setFormattedData(formattedData); // Set the state variable
      } catch (error) {
        console.log(error);
      }
    };
    return (
      <div>
        <div>
          {account && <div>Account: {account}</div>}
          {chainId && <div>Chain ID: {chainId}</div>}
          <button onClick={handleTransaction}>Send Transaction</button>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={handleAmount}
          />
        </div>
        <div>
          <button onClick={handleView}>View Energy Usage Data</button>
        </div>
        {sendTransaction && <div>Transaction sent successfully!</div>}
        {formattedData && (
          <table>
            <thead>
              <tr>
                <th>Epoch Time</th>
                <th>Energy Usage</th>
              </tr>
            </thead>
            <tbody>
              {formattedData.map((data) => (
                <tr key={data.epochTime}>
                  <td>{data.epochTime}</td>
                  <td>{data.energyUsage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }
}
export default MetaMask;
