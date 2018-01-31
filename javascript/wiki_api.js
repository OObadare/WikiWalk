function makeRequest(dSearch) {
  return `https://en.wikipedia.org/w/api.php?action=parse&format=json&redirects=1&prop=sections&page=${dSearch}`;
}
