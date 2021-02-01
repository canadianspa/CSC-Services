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
