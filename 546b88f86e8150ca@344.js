import define1 from "./d422dd0a1d5ee8b8@231.js";

function _1(md){return(
md`<div style="color: grey; font: 13px/25.5px var(--sans-serif); text-transform: uppercase;"><h1 style="display: none;">World airports Voronoi</h1><a href="https://d3js.org/">D3</a> › <a href="/@d3/gallery">Gallery</a></div>

# World airports Voronoi

Ref. [@fil/geo-delaunay](/@fil/geo-delaunay)
<br>Ref. [jasondavies.com/maps/voronoi/airports](https://www.jasondavies.com/maps/voronoi/airports/)`
)}

function _chart(DOM,width,height,d3,$0,graticule,mesh,sphere,points,drag)
{
  const context = DOM.context2d(width, height);
  const path = d3.geoPath($0.value, context).pointRadius(1.5);

  function render() {
    context.clearRect(0, 0, width, height);

    context.beginPath();
    path(graticule);
    context.lineWidth = 0.5;
    context.strokeStyle = "#aaa";
    context.stroke();

    context.beginPath();
    path(mesh);
    context.lineWidth = 0.5;
    context.strokeStyle = "#000";
    context.stroke();

    context.beginPath();
    path(sphere);
    context.lineWidth = 1.5;
    context.strokeStyle = "#000";
    context.stroke();

    context.beginPath();
    path({type: "MultiPoint", coordinates: points});
    context.fillStyle = "#f00";
    context.fill();
  }
  
  function dragged() {
    $0.value = $0.value;
    render();
  }

  return d3.select(context.canvas)
    .call(drag($0.value).on("drag.render", dragged))
    .call(render)
    .node();
}


function _projection(d3,width,height,sphere){return(
d3.geoOrthographic()
    .fitExtent([[1, 1], [width - 1, height - 1]], sphere)
    .rotate([0, -30])
)}

function _height(width){return(
width
)}

function _sphere(){return(
{type: "Sphere"}
)}

function _graticule(d3){return(
d3.geoGraticule10()
)}

async function _points(FileAttachment){return(
(await FileAttachment("airports.csv").csv({typed: true})).map(({longitude, latitude}) => [longitude, latitude])
)}

function _mesh(d3,points){return(
d3.geoVoronoi(points).cellMesh()
)}

function _d3(require){return(
require("d3@7", "d3-geo-voronoi@2")
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["airports.csv", {url: new URL("./files/3ba6ffc2faf6f7ee4be0ed0566243932de17192846f8645847a5f7b580b339f9ba604a70b017eeaa8c4a5e1a4032d5a87e828a8e73512d5445226b3b83ac7a29.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("chart")).define("chart", ["DOM","width","height","d3","mutable projection","graticule","mesh","sphere","points","drag"], _chart);
  main.define("initial projection", ["d3","width","height","sphere"], _projection);
  main.variable(observer("mutable projection")).define("mutable projection", ["Mutable", "initial projection"], (M, _) => new M(_));
  main.variable(observer("projection")).define("projection", ["mutable projection"], _ => _.generator);
  main.variable(observer("height")).define("height", ["width"], _height);
  main.variable(observer("sphere")).define("sphere", _sphere);
  main.variable(observer("graticule")).define("graticule", ["d3"], _graticule);
  main.variable(observer("points")).define("points", ["FileAttachment"], _points);
  main.variable(observer("mesh")).define("mesh", ["d3","points"], _mesh);
  main.variable(observer("d3")).define("d3", ["require"], _d3);
  const child1 = runtime.module(define1).derive(["d3"], main);
  main.import("drag", child1);
  return main;
}
