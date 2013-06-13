// Generated by CoffeeScript 1.6.2
/* Copyright(c)

Zonda Util.base64 (c) 2013 Degas / smallsmallwolf@gmail.com
This version for Zonda, fix the Chinese bug.

jQuery port (c) 2010 Carlo Zottmann
http://github.com/carlo/jquery-base64

Original code (c) 2010 Nick Galbreath
http://code.google.com/p/stringencoders/source/browse/#svn/trunk/javascript

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
*/
define("/assets/vendor/Zonda/util/base64/base64-debug", [ "underscore-debug" ], function(require, exports, module) {
    var JSON_stringify, _, _ALPHA, _PADCHAR, _decode, _encode, _getbyte, _getbyte64;
    _ = require("underscore-debug");
    _PADCHAR = "=";
    _ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    JSON_stringify = function(string) {
        var json;
        json = JSON.stringify(string);
        return json.replace(/[\u007f-\uffff]/g, function(c) {
            return "\\u" + ("0000" + c.charCodeAt(0).toString(16)).slice(-4);
        });
    };
    _getbyte64 = function(s, i) {
        var idx;
        idx = _ALPHA.indexOf(s.charAt(i));
        if (idx === -1) {
            throw "Cannot decode base64";
        }
        return idx;
    };
    _decode = function(s) {
        var b10, i, imax, pads, x, _i;
        pads = 0;
        imax = s.length;
        x = [];
        s = String(s);
        if (imax === 0) {
            return s;
        }
        if (imax % 4 !== 0) {
            throw "Cannot decode base64";
        }
        if (s.charAt(imax - 1) === _PADCHAR) {
            pads = 1;
            if (s.charAt(imax - 2) === _PADCHAR) {
                pads = 2;
            }
            imax -= 4;
        }
        for (i = _i = 0; _i < imax; i = _i += 4) {
            b10 = _getbyte64(s, i) << 18 | _getbyte64(s, i + 1) << 12 | _getbyte64(s, i + 2) << 6 | _getbyte64(s, i + 3);
            x.push(String.fromCharCode(b10 >> 16, b10 >> 8 & 255, b10 & 255));
        }
        switch (pads) {
          case 1:
            b10 = _getbyte64(s, i) << 18 | _getbyte64(s, i + 1) << 12 | _getbyte64(s, i + 2) << 6;
            x.push(String.fromCharCode(b10 >> 16, b10 >> 8 & 255));
            break;

          case 2:
            b10 = _getbyte64(s, i) << 18 | _getbyte64(s, i + 1) << 12;
            x.push(String.fromCharCode(b10 >> 16));
        }
        return x.join("");
    };
    _getbyte = function(s, i) {
        var x;
        x = s.charCodeAt(i);
        if (x > 255) {
            throw "INVALID_CHARACTER_ERR: DOM Exception 5";
        }
        return x;
    };
    _encode = function(s) {
        var b10, i, imax, x, _i;
        if (arguments.length !== 1) {
            throw "SyntaxError: exactly one argument required";
        }
        s = String(s);
        x = [];
        imax = s.length - s.length % 3;
        if (s.length === 0) {
            return s;
        }
        for (i = _i = 0; _i < imax; i = _i += 3) {
            b10 = _getbyte(s, i) << 16 | _getbyte(s, i + 1) << 8 | _getbyte(s, i + 2);
            x.push(_ALPHA.charAt(b10 >> 18));
            x.push(_ALPHA.charAt(b10 >> 12 & 63));
            x.push(_ALPHA.charAt(b10 >> 6 & 63));
            x.push(_ALPHA.charAt(b10 & 63));
        }
        switch (s.length - imax) {
          case 1:
            b10 = _getbyte(s, i) << 16;
            x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt(b10 >> 12 & 63) + _PADCHAR + _PADCHAR);
            break;

          case 2:
            b10 = _getbyte(s, i) << 16 | _getbyte(s, i + 1) << 8;
            x.push(_ALPHA.charAt(b10 >> 18) + _ALPHA.charAt(b10 >> 12 & 63) + _ALPHA.charAt(b10 >> 6 & 63) + _PADCHAR);
        }
        return x.join("");
    };
    return module.exports = {
        decode: function(s) {
            s = _decode(s);
            return JSON.parse(s);
        },
        encode: function(s) {
            s = JSON_stringify(s);
            return _encode(s);
        }
    };
});

// Generated by CoffeeScript 1.6.2
/* Usage:
```coffeescript

  # Define a new dialog
  Util.dialog
    title: "I am the title"

    content: "some text/HTML, or Mustache.render output"

    css:
      "height": 1200

    class: "you can add class for this dialog"

    button:
      "Yes": ->
        # Generate the a button named "Yes", and do callback when you click the button

      "Other Button": ->
        # callback

  # Open it!
  do Util.dialog.open

  # Close it!
  do Util.dialog.close

  # Close dialog delay a moment
  Util.dialog.close 1200

  # Chain style
  Util.dialog.open().close(1300)

  # Return the dialog jQuery object
  console.log Util.dialog.$dom

  # Return the dialog config
  console.log Util.dialog.config

  # If you want to update the position and height of this dialog, just call:
  do Util.dialog.open

```
*/
define("/assets/vendor/Zonda/util/dialog/dialog-debug", [ "bootstrap-debug", "underscore-debug", "mustache-debug" ], function(require, exports, module) {
    var $, Mustache, dialog, prefix, tpl, _;
    $ = require("bootstrap-debug");
    _ = require("underscore-debug");
    Mustache = require("mustache-debug");
    tpl = '<div id="zonda-util-dialog" class="modal fade hide" tabindex="-1" role="dialog" aria-hidden="true">\n<div class="modal-header">\n<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\n<h3>{{title}}</h3>\n</div>\n<div class="modal-body">\n{{{content}}}\n</div>\n<div class="modal-footer">\n<button class="btn" data-dismiss="modal" aria-hidden="true">取消</button>\n</div>\n</div>';
    prefix = "zonda-util";
    dialog = function(config) {
        var dialog_html;
        dialog.config = config;
        if ($("#" + prefix + "-dialog:visible")[0]) {
            return false;
        }
        dialog_html = Mustache.render(tpl, {
            title: config.title,
            content: config.content
        });
        $(document.body).append(dialog_html);
        if (config.css) {
            $("#" + prefix + "-dialog").css(config.css);
        }
        if (config["class"]) {
            $("#" + prefix + "-dialog").addClass(config["class"]);
        }
        _.each(config.button, function(button_callback, button_name) {
            var uid;
            uid = _.uniqueId("" + prefix + "-dialog-button-");
            $("#" + prefix + "-dialog .modal-footer").append('<button id="' + uid + '" class="btn btn-success">\n  ' + button_name + "\n</button>");
            return $("#" + uid).on("click", function() {
                if ($(this).hasClass("disabled")) {
                    return false;
                } else {
                    $(this).addClass("disabled");
                }
                return button_callback();
            });
        });
        dialog.$dom = $("#" + prefix + "-dialog");
        $("#" + prefix + "-dialog").on("hide", function() {
            delete $("#" + prefix + "-dialog").modal;
            $("#" + prefix + "-dialog").remove();
            return $(".modal-backdrop").remove();
        });
        return dialog;
    };
    dialog.open = function() {
        var outerHeight;
        $("#" + prefix + "-dialog .modal-body").css({
            "max-height": window.innerHeight - 141
        });
        outerHeight = $("#" + prefix + "-dialog").outerHeight();
        $("#" + prefix + "-dialog").css({
            "margin-top": -outerHeight / 2
        });
        $("#" + prefix + "-dialog").modal({
            show: true,
            backdrop: dialog.config.backdrop
        });
        return dialog;
    };
    dialog.close = function(delay) {
        if (delay) {
            setTimeout(function() {
                return $("#" + prefix + "-dialog").modal("hide");
            }, delay);
        } else {
            $("#" + prefix + "-dialog").modal("hide");
        }
        return dialog;
    };
    return module.exports = dialog;
});

// Generated by CoffeeScript 1.6.2
define("/assets/vendor/Zonda/util/exception/exception-debug", [], function(require, exports, module) {
    var Exception;
    Exception = function(type, error) {
        switch (type) {
          case "network":
            throw " HTTP ERROR!\ncaller: " + error.caller.NAME + "\nurl: " + error.url + "\nstatus: " + error.status + "\nresponseText: \n" + error.responseText;
            break;

          case "genre":
            throw " Genre ERROR!\nposition: " + error.position + "\nexpect: " + error.expect + "\nnot: " + error.not;
        }
    };
    return module.exports = Exception;
});

// Generated by CoffeeScript 1.6.2
define("/assets/vendor/Zonda/util/http/http-debug", [ "../exception/exception-debug", "jquery-debug", "test/fake/server-debug" ], function(require, exports, module) {
    var $, Exception, FakeServer, Http;
    $ = require("jquery-debug");
    FakeServer = require("test/fake/server-debug");
    Exception = require("../exception/exception-debug");
    Http = function(config) {
        $.ajaxSetup({
            dataType: "JSON",
            type: "POST",
            error: function(error) {
                config.caller.trigger("" + config.namespace + ":HTTP:error", error, config.data);
                return Exception("network", {
                    caller: config.caller,
                    url: config.url,
                    status: error.status,
                    statusText: error.statusText,
                    responseText: error.responseText
                });
            },
            success: function(respond) {
                if (respond.status && respond.status !== 1 || respond.err && respond.err !== null) {
                    console.log("ERROR");
                    return config.caller.trigger("" + config.namespace + ":HTTP:error", respond.info, config.data);
                } else {
                    return config.caller.trigger("" + config.namespace + ":HTTP:success", respond.data, config.data);
                }
            }
        });
        if (config.fake) {
            $.ajax(config);
            return FakeServer(config.url);
        } else {
            return $.ajax(config);
        }
    };
    return module.exports = Http;
});

// Generated by CoffeeScript 1.6.2
/* Usage:
 too much to say...
 write this later maybe...
*/
define("/assets/vendor/Zonda/util/stateMachine/stateMachine-debug", [ "underscore-debug", "backbone-debug" ], function(require, exports, module) {
    var Backbone, StateMachine, _;
    _ = require("underscore-debug");
    Backbone = require("backbone-debug");
    StateMachine = function() {};
    _.extend(StateMachine.prototype, Backbone.Events);
    StateMachine.prototype.add = function(view) {
        var _this = this;
        this.on("view:change", function(curr) {
            if (curr === view) {
                return view.activate();
            } else {
                return view.deactivate();
            }
        }, this);
        return view.active = function() {
            return _this.trigger("view:change", view);
        };
    };
    return module.exports = StateMachine;
});

// Generated by CoffeeScript 1.6.2
define("/assets/vendor/Zonda/util/genre/genre-debug", [ "../exception/exception-debug", "underscore-debug" ], function(require, exports, module) {
    var Exception, Genre, getType, _;
    _ = require("underscore-debug");
    Exception = require("../exception/exception-debug");
    getType = function(target) {
        return Object.prototype.toString.call(target);
    };
    Genre = function() {
        function Genre(NAME, API) {
            var _this = this;
            this.NAME = NAME;
            this.API = API;
            this.GENRE = {};
            this.recursive(this.API.genre, function(key, value, position) {
                var alias_position, info;
                position = position.replace(/\s*/g, "").split("/");
                alias_position = _.clone(position);
                _.each(position, function(cell, index) {
                    position[index] = cell.split("~")[0];
                    return alias_position[index] = function() {
                        var name_list;
                        name_list = cell.split(":")[0].split("~");
                        if (name_list.length < 2) {
                            return name_list[0];
                        } else {
                            return name_list[1];
                        }
                    }();
                });
                position = position.join("/");
                alias_position = alias_position.join("/");
                key = key.replace(/\s*/g, "");
                info = key.split(":");
                _this.GENRE[position] = {
                    local_name: info[0].split("~")[0],
                    remote_name: info[0].split("~")[1],
                    genre: info[1].replace(/^@/g, ""),
                    essential_act: function() {}()
                };
                return _this.GENRE[alias_position] = _this.GENRE[position];
            });
        }
        Genre.prototype.recursive = function(source, action, position) {
            var result, top, _this = this;
            top = this.NAME ? this.NAME : "TOP";
            if (!position) {
                position = top;
            }
            if ("[object Object]" === getType(source)) {
                result = {};
                _.each(source, function(value, key) {
                    var here, mod_key;
                    here = "" + position + "/" + key;
                    mod_key = action(key, value, here);
                    if (mod_key) {
                        key = mod_key;
                    }
                    result[key] = value;
                    if ("[object Object]" === getType(value) || "[object Array]" === getType(value)) {
                        return result[key] = _this.recursive(value, action, here);
                    }
                });
                return result;
            }
            if ("[object Array]" === getType(source)) {
                result = [];
                _.each(source, function(el, key) {
                    return result.push(_this.recursive(el, action, "" + position + "/[]"));
                });
                return result;
            }
            return source;
        };
        Genre.prototype.genre_map = {
            Function: "[object Function]",
            Object: "[object Object]",
            Array: "[object Array]",
            Number: "[object Number]",
            String: "[object String]"
        };
        Genre.prototype.inspect = function(source, act) {
            var genre, _this = this;
            genre = _.clone(this.GENRE);
            this.recursive(source, function(key, value, position) {
                if (!_this.GENRE[position]) {
                    return null;
                }
                if (_this.genre_map[_this.GENRE[position].genre] !== getType(value)) {
                    return Exception("genre", {
                        position: position,
                        expect: _this.genre_map[_this.GENRE[position].genre],
                        not: getType(value)
                    });
                } else {
                    return genre[position].is_inspected = true;
                }
            });
            return true;
        };
        Genre.prototype.modifyKey = function(source, direction) {
            var _this = this;
            return this.recursive(source, function(key, value, position) {
                if (_this.GENRE[position]) {
                    return _this.GENRE[position][direction];
                }
            });
        };
        Genre.prototype.toLocal = function(source) {
            return this.modifyKey(source, "local_name");
        };
        Genre.prototype.toRemote = function(source) {
            return this.modifyKey(source, "remote_name");
        };
        return Genre;
    }();
    return module.exports = Genre;
});

// Generated by CoffeeScript 1.6.2
define("/assets/vendor/Zonda/util/model/model-debug", [ "../genre/genre-debug", "../exception/exception-debug", "../http/http-debug", "underscore-debug", "backbone-debug", "jquery-debug", "test/fake/server-debug" ], function(require, exports, module) {
    var Backbone, Genre, Http, Model, _;
    _ = require("underscore-debug");
    Backbone = require("backbone-debug");
    Genre = require("../genre/genre-debug");
    Http = require("../http/http-debug");
    Model = function() {
        function Model(NAME, API) {
            var _this = this;
            this.NAME = NAME;
            this.API = API;
            _.extend(this, Backbone.Events);
            this.connection_stack = [];
            if (this.id) {
                this.namespace = "" + this.NAME + ":" + this.id;
            } else {
                this.namespace = "" + this.NAME;
            }
            this.genre = new Genre("@" + this.NAME, this.API);
            _.each(this.API, function(detail, act) {
                if (act === "genre") {
                    return;
                }
                return _this[act] = function(request) {
                    return _this.sync(act, request);
                };
            });
        }
        Model.prototype.sync = function(act, request) {
            var _this = this;
            if (request !== void 0 && typeof request !== "object") {
                throw "[" + this.NAME + "] Model.sync ERROR: request is not a object!";
            }
            this.genre.inspect(request);
            this.genre.toRemote(request);
            this.once("" + this.namespace + ":" + act + ":HTTP:success", function(respond) {
                respond = _this.genre.toLocal(respond);
                return _this.trigger("" + _this.namespace + ":" + act + ":success", respond);
            });
            return this.connection_stack.push(Http({
                url: this.API[act].url,
                data: request,
                caller: this,
                namespace: "" + this.namespace + ":" + act,
                fake: this.API[act].fake
            }));
        };
        Model.prototype.abort = function() {
            return _.each(this.connection_stack, function(con) {
                return con.abort();
            });
        };
        return Model;
    }();
    return module.exports = Model;
});

// Generated by CoffeeScript 1.6.2
var __hasProp = {}.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) {
        if (__hasProp.call(parent, key)) child[key] = parent[key];
    }
    function ctor() {
        this.constructor = child;
    }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor();
    child.__super__ = parent.prototype;
    return child;
};

define("/assets/vendor/Zonda/util/collection/collection-debug", [ "../exception/exception-debug", "../genre/genre-debug", "../model/model-debug", "../http/http-debug", "underscore-debug", "backbone-debug", "jquery-debug", "test/fake/server-debug" ], function(require, exports, module) {
    var Backbone, Collection, Exception, Genre, Model, _;
    _ = require("underscore-debug");
    Backbone = require("backbone-debug");
    Exception = require("../exception/exception-debug");
    Genre = require("../genre/genre-debug");
    Model = require("../model/model-debug");
    Collection = function(_super) {
        __extends(Collection, _super);
        function Collection(config) {
            _.extend(this, Backbone.Events);
            this.NAME = config.NAME;
            this.namespace = this.NAME;
            this.API = config.API;
            this.Model = config.Model;
            this.View = config.View;
            this.model_list = {};
            this.view_list = {};
            this.genre = new Genre("@" + this.NAME, this.API);
            this.connection_stack = [];
        }
        Collection.prototype.fetch = function() {
            this.once("" + this.NAME + ":READ_LIST:HTTP:success", this.update, this);
            return this.sync("READ_LIST");
        };
        Collection.prototype.update = function(respond) {
            var _this = this;
            if ("[object Array]" !== Object.prototype.toString.call(respond)) {
                Exception("genre", {
                    position: "Collection:" + this.NAME + ":READ_LIST",
                    expect: "array",
                    not: typeof respond
                });
            }
            _.each(respond, function(id) {
                id = Math.abs(id);
                if (_this.model_list[id]) {
                    return _this.model_list[id].READ({
                        id: id
                    });
                } else {
                    return _this.factory(id);
                }
            });
            return _.each(this.model_list, function(model, id) {
                id = Math.abs(id);
                if (-1 === _.indexOf(respond, id)) {
                    delete this.model_list[id];
                    this.view_list[id].remove();
                    return delete this.view_list[id];
                }
            });
        };
        Collection.prototype.factory = function(id) {
            var model, view;
            model = new this.Model("" + this.NAME, this.API);
            model.id = id;
            view = new this.View(model);
            this.model_list[id] = model;
            this.view_list[id] = view;
            return model.READ({
                id: model.id
            });
        };
        return Collection;
    }(Model);
    return module.exports = Collection;
});

// Generated by CoffeeScript 1.6.2
define("/assets/vendor/Zonda/util/util-debug", [ "./base64/base64-debug", "./dialog/dialog-debug", "./exception/exception-debug", "./http/http-debug", "./stateMachine/stateMachine-debug", "./genre/genre-debug", "./model/model-debug", "./collection/collection-debug", "underscore-debug", "bootstrap-debug", "mustache-debug", "jquery-debug", "test/fake/server-debug", "backbone-debug" ], function(require, exports, module) {
    return module.exports = {
        Base64: require("./base64/base64-debug"),
        Dialog: require("./dialog/dialog-debug"),
        Exception: require("./exception/exception-debug"),
        Http: require("./http/http-debug"),
        StateMachine: require("./stateMachine/stateMachine-debug"),
        Genre: require("./genre/genre-debug"),
        Model: require("./model/model-debug"),
        Collection: require("./collection/collection-debug")
    };
});