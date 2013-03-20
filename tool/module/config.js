// Generated by CoffeeScript 1.6.1
var alias, env, fs, listVendor, path, project_dir, vendor_list, zonda_vendor_dir;

fs = require("fs");

path = require("path");

listVendor = require("./listVendor");

project_dir = path.resolve('./', '../');

zonda_vendor_dir = "vendor";

vendor_list = listVendor("" + project_dir + "/" + zonda_vendor_dir, zonda_vendor_dir);

vendor_list.alias.util = "util/0.1.2/src/util";

alias = JSON.stringify(vendor_list.alias);

env = "seajs.config({\n  base: \"/\",\n  charset: \"utf-8\",\n  alias: " + alias + "\n});\n\nseajs.use(\"/test/case-list\");";

"{()}";

fs.writeFileSync("" + project_dir + "/etc/env.js", env);
