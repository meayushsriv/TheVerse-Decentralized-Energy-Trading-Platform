import React from 'react'
// function to display the usage item
function UsageItem({ usages }) {
  // if the usages are undefined or null, display the loading message
  if (usages === undefined || usages === null) {
    return <p>Loading...</p>
  } else if (usages.length === 0) {
    // if the usages array is empty, display the no data message
    return <p>You do not have any data yet.</p>
  } else {
    // if the usages array is not empty, display the usages
    const date = new Date(usages.time * 1000);
    // return the usage item
    return (
      <tr>
        <td>{date.toLocaleString()}</td>
        <td>{usages.Ah}</td>
        <td>{usages.power}</td>
        <td>{usages.current_A}</td>
        <td>{usages.shuntvoltage}</td>
        <td>{usages.busvoltage}</td>
        <td>{usages.batvoltage}</td>
      </tr>
    );
  }
}
// export the usage item

export default UsageItem

