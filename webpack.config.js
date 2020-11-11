const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/backend.js",
    "./js//main-pin.js",
    "./js/debounce.js",
    "./js/map.js",
    "./js/pin.js",
    "./js/cards.js",
    "./js/filter.js",
    "./js/form.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
