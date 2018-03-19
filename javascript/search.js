/* jshint browser: true */
/*jshint esversion: 6 */


document.addEventListener("DOMContentLoaded", function(){
  document.getElementById('search').addEventListener("submit", (e) => {
    e.preventDefault();
    const dSearch = e.currentTarget[0].value;
    //this ajax request gets the intro paragraph for the searched article
    getArticleIntro(dSearch);
    getArticleWikitext(dSearch);
    // const views = getArticleViews(dSearch, pastDate, currDate);
  });

/* jshint ignore:start */
  document.getElementById('Wikiwalker').addEventListener("click", async function(){
    var list = [];
    list = await fillList();
    //list of links
    list.forEach((entry) => {
      nodeData.push({"id": entry});
    });
    //an array of node objects
    for (i = 0; i < nodeData.length -1; i++) {
      nodeLinks.push({"source": i, "target": i + 1, "distance": i * 10});
    };
    // D3 Stuff

    var simulation = d3.forceSimulation(nodeData);

    var link_force =  d3.forceLink(nodeLinks)

    simulation
        .force("charge_force", d3.forceManyBody())
        .force("center_force", d3.forceCenter(width / 2, height / 2))
        .force("links",link_force);

    var node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("circle")
      .data(nodeData)
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("fill", "red");

    //draw lines for the links
    var link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(nodeLinks)
      .enter().append("line")
      .attr("stroke-width", 2);

    function tickActions() {
    //update circle positions to reflect node updates on each tick of the simulation
      node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
      }

    simulation.on("tick", tickActions );
  });
  /* jshint ignore:end*/

  // if ((parsedList.length === 0) && (document.getElementById('searchedWikitext').innerHTML !== ""))  {
  //   // getArticleWikitext(document.getElementById('searchedWikitext').innerHTML);
  // }
});

function displayArticle(result) {
  let pageKey = Object.keys(result.query.pages)[0];
  document.getElementById('searchedTitle').innerHTML = result.query.pages[pageKey].title;
  document.getElementById('searchedIntro').innerHTML = result.query.pages[pageKey].extract || "";
  document.getElementById('searchedLink').href = "";
  let wikiLeak = `https://en.wikipedia.org/wiki/${result.query.pages[pageKey].title}`;
  document.getElementById('searchedLink').href = wikiLeak;
}

function parseWikitext(result) {
  const returned = result.parse.wikitext;
  const keys = Object.keys(returned);
  var text = returned[keys[0]];
  const deBracket = /'''.*(?![^{]*})/mg; //searches for everything outside* curly braces *except some things for some reason
  const deParenthesize = /\([^)]*\)/mg; //looks for parentheses and (ideally) removes them all
  const linkSearch = /(\[\[(.*?)\]\])/; //searches for everything inside brackets

  if (text[0] === "{") {
    //exec returns the result of the regex match, this removes the "category" box of some wikipedia articles
    text = deBracket.exec(text);
  }
  //removes the first link if it's in parentheses
  const parens = deParenthesize.exec(text);
  if (parens !== null) {
    text[0] = text[0].replace(parens[0], "");
  }
  //another regex search that returns the contents of the first link in the second index
  const links = linkSearch.exec(text);
  let plainText = links[2];
  if (plainText.indexOf("|") !== -1) {
    plainText = plainText.slice(0, plainText.indexOf("|"));
  }
  if (plainText.indexOf("#") !== -1) {
    plainText = plainText.slice(0, plainText.indexOf("#"));
  }
  // document.getElementById('searchedWikitext').innerHTML = plainText;
  return plainText;
}

function handleViews(result) {
  const data = result;
  // if (error) {throw error;}

  data.forEach(function(point){
    point.date = formatTimeStampforChart(point.timestamp);
    point.viewCount = +point.views;
  });


  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.views; })]);

  var valueline = d3.line()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.views); });

  svg.append("path")
      .data([data])
      .attr("class", "line")
      .attr("d", valueline);

  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));
}
