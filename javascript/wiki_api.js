/*jshint esversion: 6 */

function makeSectionUrl(dSearch) {
  return `https://en.wikipedia.org/w/api.php?action=parse&format=json&redirects=1&prop=sections&page=${dSearch}`;
}

//startDate and endDate must be in the format yyyymmdd
function makePageViewUrl(dSearch, startDate, endDate){
  return `https://wikimedia.org/api/rest_v1/metrics/pageviews/per-article/en.wikipedia.org/all-access/user/${dSearch}/daily/${startDate}/${endDate}`;
}

function getPageWikitext(dSearch) {
  return `https://en.wikipedia.org/w/api.php?action=parse&prop=wikitext&format=json&page=${dSearch}`;
}
//match anything thats NOT in curly braces, after the bolded wikitesxt ('''), in the square brackets for links
//matches anything not in brackets and after the bolded character: /'''.*(?![^{]*})/mg
//matches everything between two brackets: /\{\{([^]*)\}\}/g

//get the titles in category
function makeCategoryUrl(dSearch){
  return `https://en.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:${dSearch}`;
}

async function getArticleIntro(searchTerm) {
  // $.ajax({
  //   type: "GET",
  //   url: `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=${searchTerm}&callback=?`,
  //   contentType: "application/json; charset=utf-8",
  //   dataType: "json",
  //   success: function (data) {
  //     displayArticle(data);
  //   },
  // });
  // var introduction = "";
  var doc = await wtf.fetch(searchTerm);
  // debugger
  // /* Intro sentences: doc.data.sections[0].sentences(.text) */
  // doc.data.sections[0].data.sentences.forEach((sentenceObject) => {
  //
  //   introduction = introduction.concat(sentenceObject.text);
  // });
  var introduction = doc.sections()[0].plaintext();
  debugger
  var resultObject = {title: doc.options.title, intro: introduction};
  displayArticle(resultObject);
}

/* jshint ignore:start */
async function fillList() {
  const firstLink = searchedWikiLinks[searchedWikiLinks.length-1];
  var searchList = [firstLink];
  const listBuildingCall = async (searchTerm) => {
    let search = searchTerm;
    while (searchList[searchList.length-1] !== "semiotics") {
      let search = searchList[searchList.length-1];
      const data = await $.ajax({
        type: "GET",
        url: `https://en.wikipedia.org/w/api.php?action=parse&prop=wikitext&format=json&page=${search}&callback=?`,
        contentType: "application/json; charset=utf-8",
        async: true,
        dataType: "json"
      });
      var resultData = parseWikitext(data);
      if (resultData === "err") {
        document.getElementById("loader").style.display = "none";
        if (searchList.length > 5) {
          return searchList;
        } else {
          return error;
        }
      }
      searchList.push(parseWikitext(data));
    }
    return searchList;
  };
  await listBuildingCall(searchList[searchList.length-1]);
  return searchList;
}
/* jshint ignore:end */
//I know this is dirty and confusing, but the jshint errors are way more dirty and confusing(not to mention annoying)

async function getArticleWikitext(searchTerm) {
  // await $.ajax({
  //   type: "GET",
  //   url: `https://en.wikipedia.org/w/api.php?action=parse&prop=wikitext&format=json&page=${searchTerm}&callback=?`,
  //   contentType: "application/json; charset=utf-8",
  //   dataType: "json",
  //   success: function (data) {
  //     searchedWikiLinks.push (parseWikitext(data));
  //   },
  //   error: function (errorMessage) {
  //   }
  // });

  var doc = await wtf.fetch(searchTerm);
  var firstLink;
  debugger
  /* look through sentence [i] until sentence actually has a link somewhere */
  doc.data.sections[0].data.sentences.some((sentence) => {
    if (typeof(sentence.links) !== "undefined") {
      firstLink = sentence.links[0].text;
      return firstLink;
    }
  });
  firstLink = doc.links()[0].page;
  searchedWikiLinks.push(firstLink);
  // var firstLink = doc.data.sections[0].data.sentences[0].links[0].text;
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
