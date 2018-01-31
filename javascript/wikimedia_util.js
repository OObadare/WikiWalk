var wiki_api = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&titles=Stack%20Overflow";
d3.json(wiki_api, function(error, wiki) {
  console.log(wiki);
});


// gets stack overflows intro Page
// https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=Stack%20Overflow


//similarly, this gets links from the page for albert einstein. To get fewer links, set a smaller pllimit.
// https://en.wikipedia.org/w/api.php?action=query&titles=Albert%20Einstein&prop=links&pllimit=max
