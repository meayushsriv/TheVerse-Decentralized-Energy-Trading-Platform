import React from 'react';

const TotalCost = ({usages}) => {
  // Initialize total cost to 0
  let totalCost = 0;

  if (usages.length > 0) {
    const firstTime = usages[0].time;
    const lastTime = usages[usages.length-1].time;
    const totalTime = lastTime - firstTime;

    // Iterate over data array and calculate cost for each data point
    usages.forEach(reading => {
      const powerInKW = reading.power;
      const cost = (powerInKW * totalTime) * 0.44;
      totalCost += cost;
    });
  } else {
    console.log("Error: usages array is empty");
  }

  return (
    <div>
      <p>Total cost: £{totalCost.toFixed(2)}</p>
    </div>
  );
};

export default TotalCost;
