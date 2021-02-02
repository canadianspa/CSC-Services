export function filterArray(array, keys, query) {
  return array.filter((element) => {
    return keys
      .map((key) => {
        return element[key].search(new RegExp(query, "i")) > -1;
      })
      .includes(true);
  });
}

export function sortByDate(array, key) {
  return array.sort((a, b) => {
    return new Date(b[key]) - new Date(a[key]);
  });
}

export function getBackgroundColor(product) {
  switch (product) {
    case "Grand Rapids 2014 - 2016":
      return "rgb(255, 207, 164)";
    case "Rio Grande 2014 - 2016":
      return "rgb(255, 216, 207)";
    case "Swift Current 2014 - 2016":
      return "rgb(253, 218, 243)";
    case "Muskoka 2012 - 2016":
      return "rgb(224, 210, 255)";
    case "Grand Rapids V2 2017":
      return "rgb(195, 240, 235)";
    case "Rio Grande V2 2017":
      return "rgb(215, 239, 252)";
    case "Swift Current V2 2017":
      return "rgb(218, 245, 201)";
    case "Muskoka V2 2017":
      return "rgb(237, 232, 195)";
    default:
      return "";
  }
}
