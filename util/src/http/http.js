// Generated by CoffeeScript 1.6.2
define(function(require, exports, module) {
  var $, Http;

  $ = require("jquery");
  Http = function(config) {
    $.ajaxSetup({
      dataType: "JSON",
      type: "POST",
      error: function(error) {
        return config.caller.trigger("" + config.namespace + ":HTTP:error", error, config.data);
      },
      success: function(respond) {
        if ((respond.status && respond.status !== 1) || (respond.err && respond.err !== null)) {
          console.log("ERROR");
          return config.caller.trigger("" + config.namespace + ":HTTP:error", respond.info, config.data);
        } else {
          return config.caller.trigger("" + config.namespace + ":HTTP:success", data, config.data);
        }
      }
    });
    return $.ajax(config);
  };
  return module.exports = Http;
});
