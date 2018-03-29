/* jshint browser: true */
/*jshint esversion: 6 */

let nodeLinks = [];
let nodeData = [];
let searchedWikiLinks = [];

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var svg = d3.select("section").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var loader = d3.select("section").append("div")
  .attr("id", "loader")


function dist(d)
{
  return d.distance+30;
}
