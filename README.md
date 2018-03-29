# WikiWalk

### Overview
Supposedly, if one selects a wikipedia article and keeps clicking the first non-italicized, non-parenthesized link, it will lead to the article for Philosophy roughly 90 percent of the time. WikiWalk is a project to investigate this claim, although it attempts to take the user to Reality instead of Philosophy.

### Ho
* User should be able to query Wikipedia for a starting point.

* Bubbles of varying size corresponding to how many people have visited their respective pages on Wikipedia.

* New bubbles leading to different pages should open on click of a previous bubble. The screen should zoom and focus to accommodate said bubbling.

### Wireframes

The app will consist of a main page which everything is rendered on - the url will not change. It will contain an about column or modal which has information aboout my project's structure and architecture, and a personal information column or modal with my Linkedin and Github.

The main component will be bubbles, which contain an image of the page header. Clicking on said bubble will expand it, showing the links to other bubbles.

![Imgur](https://i.imgur.com/bYKqngd.jpg)

### Architecture and Technologies

* D3.js - Creating the force graph for the links

* MediaWiki API - Querying Wikipedia pages for a variety of information

* Regex - Parsing the pages returned by the MediaWiki Ajax requests


### Future Features

* Parsing 
