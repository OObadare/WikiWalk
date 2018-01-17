# WikiWalk

### Overview
A data visualization project that lets you “crawl” through Wikipedia by clicking on links that appear in bubbles. 

### MVPs
* User should be able to query Wikipedia for a starting point.

* Bubbles of varying size corresponding to how many people have visited their respective pages on Wikipedia. 

* New bubbles leading to different pages should open on click of a previous bubble. The screen should zoom and focus to accommodate said bubbling. 

### Wireframes

The app will consist of a main page which everything is rendered on - the url will not change. It will contain an about column or modal which has information aboout my project's structure and architecture, and a personal information column or modal with my Linkedin and Github.

The main component will be bubbles, which contain an image of the page header. Clicking on said bubble will expand it, showing the links to other bubbles.

![Imgur](https://i.imgur.com/bYKqngd.jpg)

### Architecture and Technologies

* D3

* MediaWiki’s API; for some reason Wikipedia doesn’t have its own

* In addition to the landing page, I will also need a script for creating bubbles - they will be circular bubbles with the title of the page and maybe the primary picture, if there is one. 

* There will also need to be a search bar so users can enter a page to start from if they choose to.

* At least one script will be devoted to determining which links to render- some Wikipedia pages have hundreds of them. 

### Implementation Timeline 

* Wednesday: Learn about D3, create entry file, setup webpack and more detailed schema/architecture. Figure out the wikipedia API. Complete landing page and search bar.
* Thursday: Devote the day to learning D3. Work on bubbles.
* Friday: Finish Bubbles, bubble links. Figure out the script that I need to determine which bubbles to show. 
* Weekend: Style, About columns/modals. 

### Bonus

Clicking on the first link in the main text of a Wikipedia article, and then repeating the process for subsequent articles, would usually lead to the Philosophy article. As of February 2016, 97% of all articles in Wikipedia eventually led to the article Philosophy.
I would like to include a button that automatically walks the user through the process.
