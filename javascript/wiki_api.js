function makeSectionUrl(dSearch) {
  return `https://en.wikipedia.org/w/api.php?action=parse&format=json&redirects=1&prop=sections&page=${dSearch}`;
}

//startDate and endDate must be in the format yyyymmdd
function makePageViewUrl(dSearch, startDate, endDate){
  return `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia.org/all-access/user/${dSearch}/daily/${startDate}/${endDate}`;
}

//get the titles in category
function makeCategoryUrl(dSearch){
  `https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:${dSearch}`
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
