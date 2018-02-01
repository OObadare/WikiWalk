//sets up the initial search
document.addEventListener("DOMContentLoaded", function(){
  document.getElementById('search').addEventListener("submit", (e) => {
    e.preventDefault();
    const dSearch = e.currentTarget[0].value;
    //this ajax request gets the intro paragraph for the searched article
    getArticleIntro(dSearch);
  });

});

//sets the svg in js, assigns it width and height
var svg = d3.select("svg"),
  margin = {top: 20, right: 20, bottom: 30, left: 50},
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom,
  g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

//assigns axes
var x = d3.scaleTime()
  .rangeRound([0, width]);

var y = d3.scaleLinear()
  .rangeRound([height, 0]);

//gets the dates I'm going to use to get the page views
var formatDate = d3.timeFormat("%Y%m%d");
const currDate = formatDate(new Date());
const pastDate = formatDate((new Date(new Date().setFullYear(new Date().getFullYear() - 1))));



//everything below this used to be the force map
