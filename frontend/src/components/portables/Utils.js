export function filterArray(array, keys, query) {
  return array.filter((element) => {
    return keys
      .map((key) => {
        switch (typeof element[key]) {
          case "string":
            return element[key].search(new RegExp(query, "i")) > -1;
          case "object":
            return element[key]
              .map((child) => child.search(new RegExp(query, "i")) > -1)
              .includes(true);
          default:
            return false;
        }
      })
      .includes(true);
  });
}
