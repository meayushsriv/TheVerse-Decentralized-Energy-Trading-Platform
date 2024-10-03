import * as d3 from 'd3';
import React, { useRef, useEffect } from "react";
import { select } from "d3";
// power usage graph component
const PowerUsageGraph = ({ usages }) => {
  // svg set refence to null
  const svgRef = useRef(null);
  // useEffect hook to display the power usage graph
  useEffect(() => {
    const svg = select(svgRef.current);
   
    // Extract time and power data from usages
    const timeData = usages.map(usage => usage.time);
    const powerData = usages.map(usage => usage.power);
   
    // Define scales for x and y axes
    const xScale = d3.scaleTime()
    .domain(d3.extent(timeData.map(time => time * 1000)))
    .range([60, 500 - 60]);
   
    // Define scales for x and y axes
    const yScale = d3.scaleLinear()
      .domain([d3.min(powerData), d3.max(powerData)])
      .range([500 - 60, 60]);

    // Define x and y axes
    const xAxis = d3.axisBottom(xScale)
  .ticks(d3.timeMinute.every(1))
  .tickFormat(d3.timeFormat("%m-%d-%Y %H:%M"));
    const yAxis = d3.axisLeft(yScale)
      .ticks(5)
      .tickFormat(d => d + "kWh");

    // Draw x axis
    svg.select(".x-axis")
      .style("transform", "translateY(440px)")
      .call(xAxis);

    // Draw y axis
    svg.select(".y-axis")
      .style("transform", "translateX(60px)")
      .call(yAxis);

    // Draw line for power usage data
    svg.select(".line")
    .attr("d", d3.line()
      .x(d => xScale(d.time * 1000))
      .y(d => yScale(d.power))(usages));
  });
  // return the svg 
  return (
    <svg width="500" height="500" ref={svgRef}>
      <g className="x-axis"></g>
      <g className="y-axis"></g>
      <path className="line" fill="#22222" stroke="#222222" strokeWidth="2" />
    </svg>
  );
};
// export the power usage graph component
export default PowerUsageGraph;
