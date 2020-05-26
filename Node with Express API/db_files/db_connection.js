const { DB_USER, DB_PASS, DB_HOST } = require("./constants");

module.exports = {
  url: `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}`,
  options: {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
};
