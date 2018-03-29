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

* Bubbles of varying size corresponding to how many people have visited their respective pages on Wikipedia.

* New bubbles leading to different pages should open on click of a previous bubble. The screen should zoom and focus to accommodate said bubbling.


### Architecture and Technologies

* D3.js - Creating the force graph for the links

* MediaWiki API - Querying Wikipedia pages for a variety of information

* Regex - Parsing the pages returned by the MediaWiki Ajax requests


### Future Features

* Parsing
