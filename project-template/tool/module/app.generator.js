// Generated by CoffeeScript 1.6.3
var CONFIG, colors, err, fs, path, project_dir;

require("js-yaml");

fs = require("fs");

path = require("path");

colors = require("colors");

console.log("\n\n Zonda Tool".bold + ":  Generate app...");

project_dir = path.resolve('./', '../');

CONFIG = require("" + project_dir + "/etc/zonda.yml");

try {
  fs.readdirSync("" + project_dir + "/dist");
} catch (_error) {
  err = _error;
  if (err !== null) {
    fs.mkdirSync("" + project_dir + "/dist");
  }
}

console.log(("\n   Generate simple app-" + CONFIG.version + ".js...:  ").bold);

fs.writeFileSync("" + project_dir + "/dist/app-" + CONFIG.version + ".js", "seajs.use(\"" + CONFIG.web_root + "/src/app\");");

console.log("   >>".bold + " Success!".green);
