// Generated by CoffeeScript 1.6.3
var CONFIG, colors, fs, path, project_dir;

require("js-yaml");

fs = require("fs");

path = require("path");

colors = require("colors");

console.log("\n\n Zonda Tool".bold + ":  Generate app...");

project_dir = path.resolve('./', '../');

CONFIG = require("" + project_dir + "/etc/zonda.yml");

fs.readdir("" + project_dir + "/dist", function(err) {
  if (err !== null) {
    return fs.mkdirSync("" + project_dir + "/dist");
  }
});
