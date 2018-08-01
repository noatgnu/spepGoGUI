import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BarGraphService {


  constructor() { }

  CreateBarChartLegend(labels, labelMap, colorMap, graphBlock, width, height, gridSize, margin) {
    const legendBlock = graphBlock.append("g").attr("transform", "translate(" + width / 2 + "," + (height + margin.bottom / 2) + ")");
    const legendContainer = legendBlock.selectAll('.barChartLegend').attr('class', 'barChartLegend').data(labels).enter().append('g');
    const legend = legendContainer.append("rect")
      .attr("x",function(d,i) {
        return -width / 4 *i
      })
      .attr("y", -gridSize)
      .attr("width", gridSize/2)
      .attr("height", gridSize/2).style('fill', function(d) {
        return colorMap.get(labelMap.get(d));
      });
    const legendText = legendContainer.append('text').attr('class', 'bar-chart-legend-text').text(function (d) {
      return d;
    }).attr('x', function(d,i) {
      return -width / 4 *i + gridSize/2 + 2
    }).attr("y", -gridSize+gridSize/2);
    return {legendContainer, legend}
  }

  CreateColorGradient(svg: any, colors): void {
    const defs = svg.append('defs');
    const linearGrad = defs.append("linearGradient")
      .attr("id", "linear-gradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "100%")
      .attr("y2", "0%")
      .selectAll("stop")
      .data(colors)
      .enter().append("stop")
      .attr("offset", function (d, i) {
        return i / (colors.length - 1);
      }).attr("stop-color", function (d) {
        return d;
      });
  }

  CreateLegend(graphBlock, width, height, margin, d3, blockWidth, blockHeight) {
    const legendBlock = graphBlock.append("g").attr("transform", "translate(" + width / 2 + "," + (height + margin.bottom / 2) + ")");
    const legend = legendBlock.append("rect")
      .attr("x", -blockWidth / 2)
      .attr("y", 0)
      .attr("width", blockWidth)
      .attr("height", blockHeight)
      .style("fill", "url(#linear-gradient)");
    const legendScale = d3.scaleLinear().range([-blockWidth / 2, blockWidth / 2]).domain([0, 1]);
    const legendAxis = d3.axisBottom(legendScale).ticks(5).tickSize(3).scale(legendScale);
    legendBlock.append('g').attr('class', 'axis').attr('transform', 'translate(0,' + blockHeight + ')').call(legendAxis);
    return {legendBlock, legendAxis};
  }
}
