// https://observablehq.com/@gabrieldasneves/visualizacoes-para-o-projeto-final-visualizacao-de-dados@328
import define1 from "./8d271c22db968ab0@158.js";

export default function define(runtime, observer) {
  const main = runtime.module();
  main.variable(observer()).define(["md"], function(md){return(
md`# Visualizações para o projeto final visualização de dados`
)});
  main.variable(observer()).define(["html"], function(html){return(
html`Esta célula contém os estilos da visualização.
<style>
.tick text {
  fill: #888;  
  font-size: small;
  writing-mode: tb;
  text-anchor: middle;  
}

.tick line {
  stroke: #ccc;
}
</style>`
)});
  main.variable(observer("buildvis")).define("buildvis", ["d3","width","height","drawStartLines","drawRadialBars"], function*(d3,width,height,drawStartLines,drawRadialBars)
{
  const svg = d3.create("svg")    
    .attr("font-size", "10pt")    
    .attr("cursor", "default")
    .attr("viewBox", [0, 0, width, height]);
  
  yield svg.node();
  
  var tspace = 0;
  svg.append("g").call(g => tspace = drawStartLines(g));
  svg.append("g").call(g => drawRadialBars(g, tspace));
  
  return svg.node();    
}
);
  main.variable(observer("drawStartLines")).define("drawStartLines", ["chartData","color","bar","innerRadius","numOfBars","minRadius","margin","start","title","highlight","restore","d3","triangle","seq","parts"], function(chartData,color,bar,innerRadius,numOfBars,minRadius,margin,start,title,highlight,restore,d3,triangle,seq,parts){return(
g => {  
  const starts = g.selectAll(".start")
    .data(chartData)
    .join("g")
    .attr("opacity", 1)
    .attr("fill", d => color(d.territory))
    .attr("transform", (d, i) => `translate(${bar.width},${innerRadius(numOfBars - 1 - i) - minRadius + margin.top})`)
    .call(g => g.append("circle").attr("cy", bar.width / 2).attr("r", bar.width / 2))
    .call(g => g.append("rect").attr("width", start.left).attr("height", bar.width))
    .call(title)
    .on("mouseover", highlight)
    .on("mouseout", restore);
  
  const texts = starts.append("text")
    .attr("class", "start")
    .attr("font-weight", "bold")
    .attr("alignment-baseline", "hanging")
    .attr("dx", start.left + start.padding) 
    .attr("dy", 4)
    .text(d => `${d.territory}`);  
  
  var widths = texts.nodes().map(d => d.getComputedTextLength());
  
  const ext = d3.extent(widths);
  const min = ext[0], max = ext[1];
  starts.append("rect")
    .attr("width", (d, i) => start.right + (0.1)*(max - widths[i]))
    .attr("height", bar.width)
    .attr("transform", (d, i) => `translate(${widths[i] + start.left + start.padding * 2},0)`)  
  
  const startLength = start.left + start.right + start.padding * 2 + max + bar.width + (triangle.num ? 1 : 0);
  starts.append("g")
    .selectAll("polygon")
    .data(seq(triangle.num))
    .join("polygon")
    .attr("points", `0,2 ${triangle.width},${triangle.width} 0,${triangle.height - 2}`)
    .attr("transform", (d, i) => `translate(${startLength - bar.width + i * (triangle.width + triangle.padding)},0)`);
  
  const y = d => innerRadius(d) - bar.padding / 2 - minRadius + margin.top,
        tspace = startLength + (triangle.width + triangle.padding) * triangle.num;  
  g.selectAll("line")
    .data(seq(numOfBars + 1))
    .join("line")
    .attr("stroke", "#ccc")
    .attr("x1", bar.width).attr("y1", y)
    .attr("x2", tspace).attr("y2", y);  
  
  parts.start = starts;
  
  return tspace;
}
)});
  main.variable(observer("drawRadialBars")).define("drawRadialBars", ["x","maxValue","maxRadius","margin","deg","minRadius","bar","chartData","color","arc","innerRadius","title","highlight","restore","seq","axisArc","parts"], function(x,maxValue,maxRadius,margin,deg,minRadius,bar,chartData,color,arc,innerRadius,title,highlight,restore,seq,axisArc,parts){return(
(g, tspace) => {  
  const ticks = x.ticks(15).slice(1, -1);
  ticks.push(maxValue * 1.05);  
  g.attr("transform", `translate(${tspace},${maxRadius + margin.top})`); 
  
  const marks = g.append("g")
    .selectAll(".tick")
    .data(ticks)
    .join("g")
    .attr("class", "tick-class")
    .attr("transform", d => `rotate(${deg(x(d)) - 90})`)
    .call(g => g.append("line").attr("x1", minRadius - bar.padding / 2).attr("x2", maxRadius + bar.padding / 2))
    .call(g => g.append("text")
        .attr("font-size", "1pt") 
        .attr("class", "tick")
        .attr("transform", d => `translate(${maxRadius + bar.padding * 1.5},0)`) 
        .text(x.tickFormat(1, ",.2r")));  
  
  const bars = g.selectAll(".bar")
    .data(chartData)    
    .join("g")    
    .attr("class", "bar")
    .attr("opacity", 1)
    .attr("fill", d => color(d.territory))
    .call(g => g.append("path").attr("d", arc))
    .call(g => g.append("circle")
        .attr("r", bar.width / 2)    
        .attr("cx", (d, i) => innerRadius(i) + bar.width / 2)
        .attr("transform", (d, i) => `rotate(${deg(x(d.values)) - 90})`))
    .call(title)
     .on("mouseover", highlight)
    .on("mouseout", restore);
  
  g.selectAll(".track")
    .data(seq(chartData.length + 1))
    .join("path")
    .attr("class", "track")
    .attr("stroke", "#ccc")    
    .attr("d", axisArc);    
  
  parts.bar = bars;
}
)});
  main.variable(observer("parts")).define("parts", function(){return(
{ start: null, bar: null }
)});
  main.variable(observer("highlight")).define("highlight", ["parts"], function(parts){return(
(e, d) => {
    parts.start.transition().duration(500).attr("opacity", a => a === d ? 1 : 0.5);
    parts.bar.transition().duration(500).attr("opacity", a => a === d ? 1 : 0.5);
}
)});
  main.variable(observer("restore")).define("restore", ["parts"], function(parts){return(
() => {
  parts.start.transition().duration(500).attr("opacity", 1);
  parts.bar.transition().duration(500).attr("opacity", 1);
}
)});
  main.variable(observer("title")).define("title", function(){return(
g => g.append("title").text(d => `${d.values} Mortes`)
)});
  main.variable(observer("x")).define("x", ["d3","maxValue"], function(d3,maxValue){return(
d3.scaleLinear()
  .domain([0, maxValue * 1.05])
  .range([0, 1.5 * Math.PI])
)});
  main.variable(observer("color")).define("color", ["d3","chartData","x"], function(d3,chartData,x){return(
d3.scaleOrdinal()
  .domain(chartData.map(d => d.territory))
.range(['#001e85', '#663796', '#a554a7', '#c3455b', '#93003a', x])
)});
  main.variable(observer("seq")).define("seq", function(){return(
(length) => Array.apply(null, {length: length}).map((d, i) => i)
)});
  main.variable(observer("innerRadius")).define("innerRadius", ["minRadius","bar"], function(minRadius,bar){return(
i => minRadius + (bar.width + bar.padding) * i
)});
  main.variable(observer("outerRadius")).define("outerRadius", ["innerRadius","bar"], function(innerRadius,bar){return(
i => innerRadius(i) + bar.width
)});
  main.variable(observer("deg")).define("deg", function(){return(
a => a * 180 / Math.PI
)});
  main.variable(observer("arc")).define("arc", ["d3","innerRadius","outerRadius","x"], function(d3,innerRadius,outerRadius,x){return(
(d, i) => d3.arc()
  .innerRadius(innerRadius(i))
  .outerRadius(outerRadius(i))
  .startAngle(0)
  .endAngle(x(d.values))()
)});
  main.variable(observer("axisArc")).define("axisArc", ["d3","innerRadius","bar"], function(d3,innerRadius,bar){return(
i => d3.arc()
  .innerRadius(innerRadius(i) - bar.padding / 2)
  .outerRadius(innerRadius(i) - bar.padding / 2)
  .startAngle(0)
  .endAngle(1.5 * Math.PI)()
)});
  main.variable(observer("data")).define("data", ["d3"], function(d3){return(
d3.csv("https://raw.githubusercontent.com/liasucf/proj_vizualizacao/main/dados_vizualizacao_proj_final.csv").then(function(data) {
    return data
  })
)});
  main.variable(observer("crossfilter")).define("crossfilter", ["require"], function(require){return(
require('crossfilter2')
)});
  main.variable(observer("facts")).define("facts", ["crossfilter","data"], function(crossfilter,data){return(
crossfilter(data)
)});
  main.variable(observer("classDimension")).define("classDimension", ["facts"], function(facts){return(
facts.dimension(d => d.classe)
)});
  main.variable(observer("taxaDimension")).define("taxaDimension", ["facts"], function(facts){return(
facts.dimension(d => d.valor)
)});
  main.variable(observer("classByTaxaGroup")).define("classByTaxaGroup", ["classDimension"], function(classDimension){return(
classDimension.group().reduceSum(function(d) { return d.valor; })
)});
  main.variable(observer()).define(["classByTaxaGroup"], function(classByTaxaGroup){return(
classByTaxaGroup.all()
)});
  main.variable(observer("chartData")).define("chartData", ["classByTaxaGroup"], function(classByTaxaGroup){return(
(classByTaxaGroup.all()).map(d => {  
  return {
    territory: d["key"],
    values:d["value"]
  }
})
)});
  main.variable(observer("maxValue")).define("maxValue", ["d3","chartData"], function(d3,chartData){return(
d3.max(chartData.map(d => d.values))
)});
  main.variable(observer("slices")).define("slices", ["data"], function(data){return(
data.columns.slice(1)
)});
  main.variable(observer("width")).define("width", function(){return(
1024
)});
  main.variable(observer("height")).define("height", function(){return(
768
)});
  main.variable(observer("margin")).define("margin", function(){return(
{top: 30, left: 0, bottom: 0, right: 0}
)});
  main.variable(observer("minRadius")).define("minRadius", function(){return(
100
)});
  main.variable(observer("maxRadius")).define("maxRadius", ["outerRadius","numOfBars"], function(outerRadius,numOfBars){return(
outerRadius(numOfBars - 1)
)});
  main.variable(observer("bar")).define("bar", function(){return(
{width: 20, padding: 10}
)});
  main.variable(observer("triangle")).define("triangle", ["bar"], function(bar){return(
{width: bar.width / 2, height: bar.width, padding: 2, num: 3}
)});
  main.variable(observer("start")).define("start", function(){return(
{left: 100, right: 350, padding: 5}
)});
  main.variable(observer("numOfBars")).define("numOfBars", ["chartData"], function(chartData){return(
chartData.length
)});
  const child1 = runtime.module(define1);
  main.import("form", child1);
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  return main;
}
