/* jshint browser: true */
/*jshint esversion: 6 */

function displayArticle(result) {
  let pageKey = Object.keys(result.query.pages)[0];
  document.getElementById('searchedTitle').innerHTML = result.query.pages[pageKey].title;
  document.getElementById('searchedIntro').innerHTML = result.query.pages[pageKey].extract || "";
  document.getElementById('searchedLink').href = "";
  let wikiLeak = `https://en.wikipedia.org/wiki/${result.query.pages[pageKey].title}`;
  document.getElementById('searchedLink').href = wikiLeak;
}

function displayWikitext(result) {
  const returned = result.parse.wikitext;
  const keys = Object.keys(returned);
  var text = returned[keys[0]];
  //deBracket searches for everything inside curly braces, which removes the weird content boxes
  const deBracket = /'''.*(?![^{]*})/mg;
  //linkSearch gets what's in the square brackets, which are
  const linkSearch = /(\[\[(.*?)\]\])/;
  if (text[0] === "{") {
    //exec returns the result of the regex match, this removes the "category" box of some wikipedia articles
    text = deBracket.exec(text);
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
  debugger
  document.getElementById('searchedWikitext').innerHTML = plainText;
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
