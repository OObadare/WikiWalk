/* jshint browser: true */
//sets up the initial search

document.addEventListener("DOMContentLoaded", function(){
  document.getElementById('search').addEventListener("submit", (e) => {
    e.preventDefault();
    const dSearch = e.currentTarget[0].value;
    //this ajax request gets the intro paragraph for the searched article
    getArticleIntro(dSearch);
    const views = getArticleViews(dSearch, pastDate, currDate);
  });

});

//sets the svg in js, assigns it width and height

var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
// var valueline = d3.line()
//     .x(function(d) { return x(d.date); })
//     .y(function(d) { return y(d.viewCount); });

debugger

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");
//gets the dates I'm going to use to get the page views
var formatDateforUrl = d3.timeFormat("%Y%m%d");
var formatTimeStampforChart = d3.timeParse("%Y%m%d");
const currDate = formatDateforUrl(new Date());
const pastDate = formatDateforUrl((new Date(new Date().setFullYear(new Date().getFullYear() - 1))));
