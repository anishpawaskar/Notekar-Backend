export const parseQueryParams = (queryString) => {
  let query = "";

  for (let i = 0; i < queryString.length; i++) {
    if (queryString[i] === "%20") {
      query += " ";
    } else {
      query += queryString[i];
    }
  }

  return query;
};
