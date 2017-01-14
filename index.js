"use strict";
const parse = require("./config").parse;

module.exports = function run(options) {
  console.log(parse(options));
}