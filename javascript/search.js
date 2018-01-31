function displayArticle(result) {
  debugger
  let pageKey = Object.keys(result.query.pages)[0];
  document.getElementById('searchedTitle').innerHTML = result.query.pages[pageKey].title;
  document.getElementById('searchedIntro').innerHTML = result.query.pages[pageKey].extract || "";
  document.getElementById('searchedLink').href = "";
  let wikiLeak = `https://en.wikipedia.org/wiki/${result.query.pages[pageKey].title}`;
  document.getElementById('searchedLink').href = wikiLeak;
}
