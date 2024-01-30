const path = require("path");

module.exports = {
  mode: "development",
  entry: "./index.js",  
  output: {
    path: path.resolve(__dirname, "view"),
    filename: "bundle.js",
  },
  watch: true,
};
