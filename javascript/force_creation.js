/* jshint browser: true */
/*jshint esversion: 6 */

let nodeLinks = [];
let nodeData = [];

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

          //Stuff below here is modified from the testfile, not sure about it yet
          
var force = d3.forceSimulation()
    .force("charge", d3.forceManyBody().strength(-700).distanceMin(100).distanceMax(1000))
    .force("link", d3.forceLink().id(function(d) { return d.index }))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("y", d3.forceY(0.001))
    .force("x", d3.forceX(0.001));

function dist(d)
{
  return d.distance+30;
}

var linkForce  = d3.forceLink(nodeLinks).distance(dist).strength(2);

var simulation = d3.forceSimulation(nodeData);

//.alphaDecay(0.01).force("linkForce",d3.forceLink(nodeLinks))