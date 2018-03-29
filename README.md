# WikiWalk

### Overview
Supposedly, if one selects a wikipedia article and keeps clicking the first non-italicized, non-parenthesized link, it will lead to the article for Philosophy roughly 90 percent of the time. WikiWalk is a project to investigate this claim, although it attempts to take the user to Reality instead of Philosophy.

### How it Works
* The user enters the title of a wikipedia page into the top search bar; WikiWalk then dispatches a request to the wikipedia API:

```
function getArticleIntro(searchTerm) {
  $.ajax({
    type: "GET",
    url: `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=${searchTerm}&callback=?`,
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
      displayArticle(data);
    },
  });
}
```

* The plaintext intro is added to the webpage, and the returned wikitext (their word, not mine) is parsed using regular expressions, pulling out the first link - this step is repeated until the first link is "reality.":

```
const deBracket = /'''.*(?![^{]*})/mg; //searches for everything outside* curly braces *except some things for some reason
const deParenthesize = /\([^)]*\)/mg; //looks for parentheses and removes them all
const linkSearch = /(\[\[(.*?)\]\])/; //searches for everything inside brackets

```

* The resulting array of links is then used to build nodes for a D3 force map.

[Imgur](https://i.imgur.com/sDjktGB.png)


### Architecture and Technologies

* D3.js - Creating the force graph for the links

* MediaWiki API - Querying Wikipedia pages for a variety of information

* Regex - Parsing the pages returned by the MediaWiki Ajax requests


### Future Features

* Parsing using a screen parser instead of regular expressions is coming, along with more elaborate parsing techniques for the wide variety of wikipedia formats.
