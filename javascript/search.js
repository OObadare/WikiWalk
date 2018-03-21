/* jshint browser: true */
/*jshint esversion: 6 */


document.addEventListener("DOMContentLoaded", async function(){
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
    svg.selectAll("*")
    debugger
    var list = [document.getElementById("searchedTitle").innerHTML];
    var nodeCounter = 0;
    list = list.concat(await fillList());
    //list of links
    for (let entry of list) {
      if (nodeData.find((obj) => obj.id.toLowerCase() === entry.toLowerCase())){
        debugger
        oldLink = nodeLinks[nodeLinks.length-1];
        nodeLinks[nodeLinks.length-1] = ({"source":oldLink.source, "target":nodeData.findIndex((obj) => obj.id === entry), "distance": 90 });
        break;
      } else {
        debugger
        nodeData.push({"id": entry});
        nodeCounter += 1;
        if (nodeCounter < list.length){
          nodeLinks.push({"source": nodeData.length-1, "target":nodeData.length , "distance":90});
        }
      }
    }

    //an array of node objects
    // for (i = 0; i < nodeData.length -1; i++) {
    //   nodeLinks.push({"source": i, "target": i + 1, "distance": i * 30});
    // };
    // D3 Stuff

    var simulation = d3.forceSimulation(nodeData);

    var link_force =  d3.forceLink(nodeLinks)

    simulation
        .force("charge_force", d3.forceManyBody())
        .force("center_force", d3.forceCenter(width / 2, height / 2))
        .force("links",link_force);

    var node = svg.selectAll("circle")
      .data(nodeData)
      .enter()
      .append("circle")
      .attr("r", 5)


    var label = svg.selectAll("linkTitle")
      .data(nodeData)
      .enter()
      .append("text")
      .text(function (d) {return d.id; })
      .style("fill", "#555")
      .style("font-family", "Arial")
      .style("font-size", 12);


    node.append("text")
      .attr("dx", -18)
      .attr("dy", 8)
      // .style("font-family", "overwatch")
      .style("font-size", "18px")
      .text(function (d) {
          return d.id
      });

    //draw lines for the links
    var link = svg.append("g")
      .attr("class", "links")
      .selectAll("line")
      .data(nodeLinks)
      .enter().append("line")
      .attr("stroke-width", 2);


  //open article wikitext
  node.on("click", function() {
    getArticleIntro(d3.select(this).text());
  });

    //Drag Actions

    var drag_handler = d3.drag()
    .on("start", drag_start)
    .on("drag", drag_drag)
    .on("end", drag_end);

    function drag_start(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function drag_drag(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function drag_end(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  drag_handler(node);

    function tickActions() {
    //update circle positions to reflect node updates on each tick of the simulation
      node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });

        //simply tells one end of the line to follow one node around
      //and the other end of the line to follow the other node around
      link
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      label.attr("x", function(d){ return d.x; })
             .attr("y", function (d) {return d.y - 10; });
      }

    simulation.on("tick", tickActions );
    debugger
  });
  /* jshint ignore:end*/

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

// function handleViews(result) {
//   const data = result;
//   // if (error) {throw error;}
//
//   data.forEach(function(point){
//     point.date = formatTimeStampforChart(point.timestamp);
//     point.viewCount = +point.views;
//   });
//
//
//   x.domain(d3.extent(data, function(d) { return d.date; }));
//   y.domain([0, d3.max(data, function(d) { return d.views; })]);
//
//   var valueline = d3.line()
//       .x(function(d) { return x(d.date); })
//       .y(function(d) { return y(d.views); });
//
//   svg.append("path")
//       .data([data])
//       .attr("class", "line")
//       .attr("d", valueline);
//
//   // Add the X Axis
//   svg.append("g")
//       .attr("transform", "translate(0," + height + ")")
//       .call(d3.axisBottom(x));
//
//   // Add the Y Axis
//   svg.append("g")
//       .call(d3.axisLeft(y));
// }
