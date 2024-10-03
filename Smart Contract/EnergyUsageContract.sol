pragma solidity ^0.8.0;

contract EnergyContract {
    struct EnergyData {
        uint epochTime;
        uint energyUsage;
    }

    EnergyData[] public energyData;
    address payable public owner;
    address public buyer;

    constructor(address _buyer) {
        owner = payable(msg.sender);
        buyer = _buyer;
    }

    function addEnergyData(uint[][] memory energyUsageData) external payable {
    require(msg.sender == buyer || msg.sender == owner, "Only buyer can call this function");
    require(msg.value > 0, "Payment value must be greater than 0");
    
    for (uint i = 0; i < energyUsageData.length; i++) {
        uint epochTime = energyUsageData[i][0];
        uint energyUsage = energyUsageData[i][1];
        energyData.push(EnergyData(epochTime, energyUsage));
    }
    owner.transfer(msg.value);
}
    function getEnergyData() public view returns(EnergyData[] memory) {
        require(msg.sender == buyer || msg.sender == owner, "Only buyer can call this function");
        return energyData;
    }
}
