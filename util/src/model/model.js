// Generated by CoffeeScript 1.6.2
define(function(require, exports, module) {
  var API, Backbone, Http, Model, _;

  _ = require("underscore");
  Backbone = require("backbone");
  API = Zonda.API;
  Http = require("../http/http");
  Model = (function() {
    function Model(name) {
      var _this = this;

      this.name = name;
      _.extend(this, Backbone.Events);
      _.each(API[this.name], function(detail, act) {
        if (act === "genre") {
          return;
        }
        return _this[act] = function(request) {
          return _this.sync(act, request);
        };
      });
    }

    Model.prototype.sync = function(act, request) {
      var namespace;

      if (request !== void 0 && typeof request !== "object") {
        throw "Model.sync ERROR: request is not a object!";
      }
      if (this.id) {
        namespace = "" + this.name + ":" + this.id + ":" + act;
      } else {
        namespace = "" + this.name + ":" + act;
      }
      return Http({
        url: API[this.name][act].url,
        data: data,
        caller: this,
        map: API[this.name].map,
        namespace: namespace
      });
    };

    return Model;

  })();
  return module.exports = Model;
});
