/*jshint esversion: 6 */

function makeSectionUrl(dSearch) {
  return `https://en.wikipedia.org/w/api.php?action=parse&format=json&redirects=1&prop=sections&page=${dSearch}`;
}

//startDate and endDate must be in the format yyyymmdd
function makePageViewUrl(dSearch, startDate, endDate){
  return `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia.org/all-access/user/${dSearch}/daily/${startDate}/${endDate}`;
}

//get wikitext
function getPageWikitext(dSearch) {
  return `https://en.wikipedia.org/w/api.php?action=parse&prop=wikitext&format=json&page=${dSearch}`;
}
//probably going to have to just parse the above using regular expressions -
//match anything thats NOT in curly braces, after the bolded wikitesxt ('''), in the square brackets for links
//matches anything not in brackets and after the bolded character: /'''.*(?![^{]*})/mg
//matches everything between two brackets: /\{\{([^]*)\}\}/g

//get the titles in category
function makeCategoryUrl(dSearch){
  return `https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:${dSearch}`;
}

function getArticleIntro(searchTerm) {
  $.ajax({
    type: "GET",
    url: `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=${searchTerm}&callback=?`,
    contentType: "application/json; charset=utf-8",
    // async: false,
    dataType: "json",
    success: function (data) {
      displayArticle(data);
    },
    error: function (errorMessage) {
    }
  });
}

function getArticleWikitext(searchTerm) {
  var searchlist = [];
  //I should use the promise to fill the search list
  //and call the search with the terms until I find the appropriate one
  $.ajax({
    type: "GET",
    url: `https://en.wikipedia.org/w/api.php?action=parse&prop=wikitext&format=json&page=${searchTerm}&callback=?`,
    contentType: "application/json; charset=utf-8",
    // async: false,
    dataType: "json",
    success: function (data) {
      displayWikitext(data);
    },
    error: function (errorMessage) {
    }
  });
}

function getArticleViews(dSearch, startDate, endDate) {
  $.ajax({
    type: "GET",
    url: `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia.org/all-access/user/${dSearch}/daily/${startDate}/${endDate}`,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (result) {
      handleViews(result.items);
    },
    error: function (errorMessage) {
      console.log(errorMessage);
    }
  });
}
