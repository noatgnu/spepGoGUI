import {Component, OnInit, AfterViewInit, ElementRef, Input, ViewEncapsulation} from '@angular/core';
import {D3Service, D3, ScaleQuantile, ScaleLinear, Selection, Transition, Axis} from 'd3-ng2-service';
import {Lagan} from "../helper/lagan";
import {line} from "d3-shape";

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  //encapsulation: ViewEncapsulation.None,
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit, AfterViewInit {
  @Input('Alignment') Alignment: Lagan;
  private d3: D3;
  private parentNativeElement: any;
  private d3Svg: Selection<SVGSVGElement, any, null, undefined>;
  legend: any;
  alignSize = 3;
  seqLabels: any;
  quant = [0, 0, 0];
  alignID = ['Query', 'Alignment', 'Target'];
  Score: Array<number>;
  currentGraph = "bar";
  constructor(element: ElementRef, d3Service: D3Service) {
    this.d3 = d3Service.getD3();
    this.parentNativeElement = element.nativeElement;
  }

  ngOnInit() {
    this.Alignment = Object.assign(new Lagan('', '', ''), this.Alignment);
    this.Score = this.Alignment.CalculateScore(7);
  }

  ngAfterViewInit(){
    let currentGraph = this.currentGraph;
    const d3 = this.d3;
    let svg: any;
    const gridSize = 15;
    const padding = gridSize * 2;
    const width = gridSize * this.Score.length;
    const height = gridSize *5 + padding;
    const colors = ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58'];
    const Score = this.Score;

    const scaleDomain = d3.extent(this.Score, function (d) {
      return d
    });
    scaleDomain[0] = 0;

    const colorScale = d3.scaleQuantile<string>()
      .domain(scaleDomain)
      .range(colors);
    const y = d3.scaleLinear().range([height, 0]).domain([0,1]);
    const x = d3.scaleBand().range([0, this.Score.length*gridSize])
      .domain(this.Score.map(function (d, i) {return (i+1).toString();}));
    const xAxis = d3.axisBottom(x).scale(x).tickPadding(30);
    svg = d3.select(this.parentNativeElement)
      .append('svg')
      .attr('width', padding * 2 + width)
      .attr('height', padding * 2 + height);

    const colourRange = d3.range(0,1,1.0/(colors.length-1));
    colourRange.push(1);
    const colorSc = d3.scaleLinear<string>().domain(colourRange).range(colors).interpolate(d3.interpolateHcl);
    const colorInterpolate = d3.scaleLinear().domain(scaleDomain).range([0,1]);
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
      return i/(colors.length-1);
    }).attr("stop-color", function(d) {return d;});
    /*linearGrad.append("stop").attr("offset", "0").attr("stop-color", "#ffffd9");
    linearGrad.append("stop").attr("offset", "1").attr("stop-color", "#081d58");
*/
    const legendBlock = svg.append("g").attr("transform", "translate(" + (width/2 - gridSize*2) + "," + (height + gridSize*3)+ ")");
    const legend = legendBlock.append("rect")
      .attr("x", -width*0.6/2)
      .attr("y", 10)
      .attr("width", width*0.6)
      .attr("height", 10)
      .style("fill", "url(#linear-gradient)");
    const axis =  svg.append('g')
      .attr('class', 'bottom-axis')
      .attr('transform', 'translate(0,'+(height+padding)+')')
      .call(xAxis);
    const axisLabels =  axis.selectAll("text")
      .attr("y", 2)
      .attr("x", 15)
      .attr("dy", ".35em")
      .attr("transform", "rotate(90)").style("text-anchor", 'middle');
    const bars = svg.selectAll('.bars')
      .data(this.Score);
    const barBlock = bars.enter()
      .append('g')
      .attr('class', 'barBlock');
    const barChart = barBlock.append('rect')
      //.style('fill', '#E85285')
      .style('fill', function (d, i) {
        return colorSc(colorInterpolate(Score[i]));
      })
      .attr('x', function (d, i) {return x((i+1).toString());})
      .attr('y', function (d) {
        return y(d)-2+padding;
      })
      .attr('width', gridSize)
      .attr('height', y(0));
    const barTrans = barChart.transition().duration(1000).ease(this.d3.easeLinear).attr('height', function (d) {
        return height - y(d);
      });

    this.SetEvents(barBlock, colorSc, colorInterpolate, Score, height, gridSize, d3, axis, x, y, currentGraph);
    const a = this.MoverBarEvent;
    const b = this.MouseOutEvent;

    svg.on("click", function() {
      switch (currentGraph) {
        case "bar":
          currentGraph = "heatmap";
          const transHeatmap = barChart.style("fill-opacity", 1).transition().duration(1000).ease(d3.easeLinear).attr('y', y(1)-2+padding)
            .attr("height", height - y(1))

            .on("start", function(){
            barBlock.on('mouseover', null).on('mouseout', null);
          });
          transHeatmap.on("end", function(){
            barBlock.on('mouseover', a(colorSc, colorInterpolate, Score,'#6A1B9A', '#6A1B9A', '10pt', 'inline', 'over', height, gridSize, d3, axis, x, y, "heatmap"))
              .on('mouseout', b(colorSc, colorInterpolate, Score,'#E85285', '#aaa', '5pt', 'none', 'out', height, gridSize, d3, axis, x, y, "heatmap"));
          });

          break;
        case "heatmap":
          currentGraph = "bar";
          const trans = barChart.style("fill-opacity", 1).transition().duration(1000).ease(d3.easeLinear).attr('y', function (d) {
            return y(d)-2+padding;
          }).attr("height", function (d) {
            return height - y(d);
          }).on("start", function(){
            barBlock.on('mouseover', null).on('mouseout', null);
          });
          barBlock.selectAll('text').remove();
          trans.on("end", function(){
            barBlock.on('mouseover', a(colorSc, colorInterpolate, Score,'#6A1B9A', '#6A1B9A', '10pt', 'inline', 'over', height, gridSize, d3, axis, x, y, "bar"))
              .on('mouseout', b(colorSc, colorInterpolate, Score,'#E85285', '#aaa', '5pt', 'none', 'out', height, gridSize, d3, axis, x, y, "bar"))
          });
          break;
      }

    });
    svg.exit();
  }

  MoverBarEvent(colorScale, colorInt, Score, barcolor: string, textcolor: string, axisFontSize: string, barTextDisplay: string, eventType: string, height: number, gridSize: number, d3: D3, axis, xAxix, yAxis, currentGraph): (d,i) => void {
    return (d, i) => {
      let y = yAxis(1);
      if (currentGraph === "bar") {
        y = yAxis(d);
      }
      console.log(y);
      const barIn = d3.select(d3.event.currentTarget).select('rect');
      const transOptic = () => {
        barIn.transition().duration(500).style("fill-opacity", 0.3).on('end', ()=>{
          barIn.transition().duration(500).style("fill-opacity", 1).on('end', transOptic)
        })
      };
      transOptic();
      const parent = d3.select(d3.event.currentTarget);
      parent.selectAll('text').remove();
      const bartext = parent.append('text')
        .attr("transform", "translate("+(xAxix(i+1))+","+ y + ") rotate(90)")
        //.attr('x', ).attr('y', yAxis(d) + gridSize*3)
        .attr('class', 'bartextLabel')
        .attr('text-anchor', 'start').text(Math.round(d*100)/100);

      const a = axis.selectAll('text').filter(function (x) {
        return (i+1).toString()===x;
      });
      d3.event.currentTarget.appendChild(bartext.node());
      a.style('fill', textcolor).style('font-size', axisFontSize);
    };
  }

  MouseOutEvent(colorScale, colorInt, Score, barcolor: string, textcolor: string, axisFontSize: string, barTextDisplay: string, eventType: string, height: number, gridSize: number, d3: D3, axis, xAxix, yAxis, currentGraph): (d,i) => void {
    return (d, i) => {
      const barIn = d3.select(d3.event.currentTarget).select('rect')
        .transition()
        .duration(1000)
        .style("fill-opacity", 1);
      const bartext = d3.select(d3.event.currentTarget).selectAll('text').remove();
      const a = axis.selectAll('text').filter(function (x) {
        return (i+1).toString()===x;
      });
      a.style('fill', textcolor).style('font-size', axisFontSize);
    };
  }
  SelectBarEvent(colorScale, colorInt, Score, barcolor: string, textcolor: string, axisFontSize: string, barTextDisplay: string, eventType: string, height: number, gridSize: number, d3: D3, axis, xAxix, yAxis): (d,i) => void {
    switch (eventType) {
      case 'over':
        return (d, i) => {
          const barIn = d3.select(d3.event.currentTarget).select('rect').style('fill', barcolor);
          const parent = d3.select(d3.event.currentTarget);
          const bartext = parent.append('text')
            .attr("transform", "translate("+(xAxix(i+1))+","+ (yAxis(d) + gridSize) + ")")
            //.attr('x', ).attr('y', yAxis(d) + gridSize*3)

            .attr('class', 'bartextLabel')
            .attr('text-anchor', 'start').text(Math.round(d*100)/100);

          const a = axis.selectAll('text').filter(function (x) {
            return (i+1).toString()===x;
          });
          d3.event.currentTarget.parentNode.appendChild(bartext.node());
          a.style('fill', textcolor).style('font-size', axisFontSize);
        };
      case 'out':
        return (d, i) => {
          const barIn = d3.select(d3.event.currentTarget).style('fill', colorScale(colorInt(Score[i])));
          const bartext = d3.select(d3.event.currentTarget.parentNode).select('text').remove();
          const a = axis.selectAll('text').filter(function (x) {
            return (i+1).toString()===x;
          });
          a.style('fill', textcolor).style('font-size', axisFontSize);
        };
    }
  }
  SetEvents(barChart, colorSc, colorInterpolate, Score, height, gridSize, d3, axis, x, y, currentGraph) {
    barChart.on('mouseover', this.MoverBarEvent(colorSc, colorInterpolate, Score,'#6A1B9A', '#6A1B9A', '10pt', 'inline', 'over', height, gridSize, d3, axis, x, y, currentGraph))
      .on('mouseout', this.MouseOutEvent(colorSc, colorInterpolate, Score,'#E85285', '#aaa', '5pt', 'none', 'out', height, gridSize, d3, axis, x, y, currentGraph));
  }

}
