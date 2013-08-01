// Generated by CoffeeScript 1.6.3
var colors, compile, exec, fs, input_dir, lessc_command, main, main_file, output_dir, path, project_dir, recursivePath;

colors = require("/usr/local/lib/node_modules/colors");

console.log("\nLess Compiler Start!".bold.underline + "\n");

fs = require('fs');

exec = require('child_process').exec;

path = require('path');

recursivePath = require("./path.recursive");

lessc_command = "lessc -x";

project_dir = path.resolve('./', '../');

output_dir = "dist";

input_dir = "ui/less";

main_file = "config.less";

compile = function(file, callback) {
  var command;
  command = "" + lessc_command + " " + file + " > " + project_dir + "/dist/app-dev.css";
  return exec(command, {
    encoding: ""
  }, callback);
};

main = function(file_name, file_path) {
  var base_name;
  if (!/\.less$/.test(file_name)) {
    return false;
  }
  console.log("Compiling...".yellow.bold.inverse);
  console.log("file name: ".green + file_name);
  console.log("file path: ".green + ("" + file_path + "/" + file_name + "\n"));
  base_name = path.basename(file_name, ".less");
  return compile("" + project_dir + "/" + input_dir + "/" + main_file, function(err, stdout, stderr) {
    if (err !== null) {
      console.log("ERROR".red);
      return console.log("" + err);
      /*
      if file_name isnt main_file
        # then try to compile the file changed
        compile "#{file_path}/#{file_name}", ( err, stdout, stderr ) ->
          if err isnt null
            console.log "ERR".magenta.inverse
            console.log "File: #{file_path}/#{file_name}".underline
            console.log "Fail to compile!".red.inverse
      */

    } else {
      return console.log("Success!".green.inverse);
    }
  });
};

main(main_file, "" + project_dir + "/" + input_dir);

recursivePath("" + project_dir + "/" + input_dir, function(type, path_cell) {
  if (type === "dir") {
    return fs.watch(path_cell.realpath, function(event, name) {
      if (event === "change") {
        return main(name, path_cell.realpath);
      }
    });
  }
}, 10);

fs.watch("" + project_dir + "/" + input_dir, function(event, name) {
  if (event === "change") {
    return main(name, "" + project_dir + "/" + input_dir);
  }
});
