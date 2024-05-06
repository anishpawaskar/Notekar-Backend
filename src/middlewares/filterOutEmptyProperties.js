export const filterOutEmptyProperties = (req, res, next) => {
  const body = req.body;
  const keys = Object.keys(body);

  for (let i = 0; i < keys.length; i++) {
    if (body[keys[i]] === undefined || body[keys[i]] === "") {
      delete req.body[keys[i]];
    }
  }
  next();
};
