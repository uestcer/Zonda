define("/assets/vendor/Zonda/vendor/util/0.0.1/util",["./base64/base64","underscore","./dialog/dialog","bootstrap","mustache","./dialog/tpl/dialog.tpl","./exception/exception","./http/http","jquery","test/fake/server","./stateMachine/stateMachine","backbone","./queue/queue","./form/form","./form/cell","./genre/genre","./model/model","./collection/collection"],function(a,b,c){return c.exports={Base64:a("./base64/base64"),Dialog:a("./dialog/dialog"),Exception:a("./exception/exception"),Http:a("./http/http"),StateMachine:a("./stateMachine/stateMachine"),Queue:a("./queue/queue"),Form:a("./form/form"),Genre:a("./genre/genre"),Model:a("./model/model"),Collection:a("./collection/collection")}}),define("/assets/vendor/Zonda/vendor/util/0.0.1/base64/base64",["underscore"],function(a,b,c){var d,e,f,g,h,i,j,k;return e=a("underscore"),g="=",f="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",d=function(a){var b;return b=JSON.stringify(a),b.replace(/[\u007f-\uffff]/g,function(a){return"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})},k=function(a,b){var c;if(c=f.indexOf(a.charAt(b)),-1===c)throw"Cannot decode base64";return c},h=function(a){var b,c,d,e,f,h;if(e=0,d=a.length,f=[],a=String(a),0===d)return a;if(0!==d%4)throw"Cannot decode base64";for(a.charAt(d-1)===g&&(e=1,a.charAt(d-2)===g&&(e=2),d-=4),c=h=0;d>h;c=h+=4)b=k(a,c)<<18|k(a,c+1)<<12|k(a,c+2)<<6|k(a,c+3),f.push(String.fromCharCode(b>>16,255&b>>8,255&b));switch(e){case 1:b=k(a,c)<<18|k(a,c+1)<<12|k(a,c+2)<<6,f.push(String.fromCharCode(b>>16,255&b>>8));break;case 2:b=k(a,c)<<18|k(a,c+1)<<12,f.push(String.fromCharCode(b>>16))}return f.join("")},j=function(a,b){var c;if(c=a.charCodeAt(b),c>255)throw"INVALID_CHARACTER_ERR: DOM Exception 5";return c},i=function(a){var b,c,d,e,h;if(1!==arguments.length)throw"SyntaxError: exactly one argument required";if(a=String(a),e=[],d=a.length-a.length%3,0===a.length)return a;for(c=h=0;d>h;c=h+=3)b=j(a,c)<<16|j(a,c+1)<<8|j(a,c+2),e.push(f.charAt(b>>18)),e.push(f.charAt(63&b>>12)),e.push(f.charAt(63&b>>6)),e.push(f.charAt(63&b));switch(a.length-d){case 1:b=j(a,c)<<16,e.push(f.charAt(b>>18)+f.charAt(63&b>>12)+g+g);break;case 2:b=j(a,c)<<16|j(a,c+1)<<8,e.push(f.charAt(b>>18)+f.charAt(63&b>>12)+f.charAt(63&b>>6)+g)}return e.join("")},c.exports={decode:function(a){return a=h(a),JSON.parse(a)},encode:function(a){return a=d(a),i(a)}}}),define("/assets/vendor/Zonda/vendor/util/0.0.1/dialog/dialog",["bootstrap","underscore","mustache"],function(a,b,c){var d,e,f,g,h,i,j;return d=a("bootstrap"),j=a("underscore"),f=a("mustache"),i=a("/assets/vendor/Zonda/vendor/util/0.0.1/dialog/tpl/dialog.tpl"),h="zonda-util",g=function(a){var b,c;return c=a.match(/\[~.*\]/),b=null===c?"btn-primary":c[0].replace(/\[~/,"").replace(/\]/,""),{class_name:b,button_name:a.replace(/\[~.*\]/,"")}},e=function(a){var b;return e.config=a,d("#"+h+"-dialog:visible")[0]?!1:(b=f.render(i,{title:a.title,content:a.content}),d(document.body).append(b),a.css&&d("#"+h+"-dialog").css(a.css),a["class"]&&d("#"+h+"-dialog").addClass(a["class"]),j.each(a.button,function(a,b){var c,e;return e=j.uniqueId(""+h+"-dialog-button-"),c=g(b),d("#"+h+"-dialog .modal-footer").append('<button id="'+e+'" class="btn '+c.class_name+'">\n  '+c.button_name+"\n</button>"),d("#"+e).on("click",function(){return d(this).hasClass("disabled")?!1:(d(this).addClass("disabled"),a())})}),e.$dom=d("#"+h+"-dialog"),d("#"+h+"-dialog").on("hidden.bs.modal",function(){return delete d("#"+h+"-dialog").modal,d("#"+h+"-dialog").remove(),d(".modal-backdrop").remove(),d("body").removeClass("modal-open")}),e)},e.open=function(){return d("#"+h+"-dialog .modal-body").css({"max-height":window.innerHeight-141}),d("#"+h+"-dialog").modal({show:!0,backdrop:e.config.backdrop}),e},e.close=function(a){return a?setTimeout(function(){return d("#"+h+"-dialog").modal("hide")},a):d("#"+h+"-dialog").modal("hide"),e},c.exports=e}),define("/assets/vendor/Zonda/vendor/util/0.0.1/dialog/tpl/dialog.tpl",[],'<div id="zonda-util-dialog" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="zonda-util-dialog-title" aria-hidden="true">\n  <div class="modal-dialog">\n    <div class="modal-content">\n\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>\n        <h4 class="modal-title" id="zonda-util-dialog-title">{{{title}}}</h4>\n      </div>\n      <div class="modal-body">{{{content}}}</div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-default" data-dismiss="modal" aria-hidden="true">取消</button>\n      </div>\n\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div>\n'),define("/assets/vendor/Zonda/vendor/util/0.0.1/exception/exception",[],function(a,b,c){var d;return d=function(a,b){switch(a){case"network":throw" HTTP ERROR!\ncaller: "+b.caller.NAME+"\nurl: "+b.url+"\nstatus: "+b.status+"\nresponseText: \n"+b.responseText;case"genre":throw" Genre ERROR!\nposition: "+b.position+"\nexpect: "+b.expect+"\nnot: "+b.not}},c.exports=d}),define("/assets/vendor/Zonda/vendor/util/0.0.1/http/http",["jquery","test/fake/server","/assets/vendor/Zonda/vendor/util/0.0.1/exception/exception"],function(a,b,c){var d,e,f,g;return d=a("jquery"),f=a("test/fake/server"),e=a("/assets/vendor/Zonda/vendor/util/0.0.1/exception/exception"),g=function(a){return d.ajaxSetup({dataType:"JSON",type:"POST",error:function(b){return a.caller.trigger(""+a.namespace+":HTTP:error",b,a.data),e("network",{caller:a.caller,url:a.url,status:b.status,statusText:b.statusText,responseText:b.responseText})},success:function(b){return b.status&&1!==b.status||b.err&&null!==b.err?(console.log("ERROR"),a.caller.trigger(""+a.namespace+":HTTP:error",b.info,a.data)):a.caller.trigger(""+a.namespace+":HTTP:success",b.data,a.data)}}),d.ajax(a),f(a.url)},c.exports=g}),define("/assets/vendor/Zonda/vendor/util/0.0.1/stateMachine/stateMachine",["underscore","backbone"],function(a,b,c){var d,e,f;return f=a("underscore"),d=a("backbone"),e=function(){},f.extend(e.prototype,d.Events),e.prototype.add=function(a){var b=this;return this.on("view:change",function(b){return b===a?a.activate():a.deactivate()},this),a.active=function(){return b.trigger("view:change",a)}},c.exports=e}),define("/assets/vendor/Zonda/vendor/util/0.0.1/queue/queue",["underscore","backbone"],function(a){var b,c,d;return d=a("underscore"),b=a("backbone"),c=function(){function a(a,c){this.name=a,this.size=c,d.extend(this,b.Events),this.data=[]}return a.prototype.checkAll=function(){var a,b,c,d,e;for(b=this.size?this.size:this.data.length,e=this.data,c=0,d=e.length;d>c;c++){if(a=e[c],"error"===a.status){this.trigger(""+this.name+":queue:error",a);break}"success"===a.status&&(b-=1)}return 0===b?this.trigger(""+this.name+":queue:success"):void 0},a.prototype.setter=function(a,b,c){var d,e,f,g,h;for(f=!0,h=this.data,e=0,g=h.length;g>e;e++)d=h[e],d.name===a&&(f=!1,d.status=b,d.info=c);return f?this.data.push({name:a,status:b,info:c}):this.checkAll()},a}()}),define("/assets/vendor/Zonda/vendor/util/0.0.1/form/form",["jquery","underscore","backbone","/assets/vendor/Zonda/vendor/util/0.0.1/form/cell","/assets/vendor/Zonda/vendor/util/0.0.1/queue/queue"],function(a,b,c){var d,e,f,g,h,i;return d=a("jquery"),i=a("underscore"),e=a("backbone"),f=a("/assets/vendor/Zonda/vendor/util/0.0.1/form/cell"),h=a("/assets/vendor/Zonda/vendor/util/0.0.1/queue/queue"),g=function(){function a(a){if(this.sel=a,i.extend(this,e.Events),this.cells=f(a),this.dom=d(a),this.name=this.dom.attr("name"),void 0===this.name)throw"From:"+this.sel+" must have a name!"}return a.prototype.listen=function(a){var b=this;return i.each(this.cells,function(c){return 0===i.keys(c.tasks).length?null:c.dom.on(a,function(){return b.taskRunner(c)})})},a.prototype.taskRunner=function(a){var b,c,d,e,f;if(a.dom.is(":hidden"))return null;if("running"===a.status)return null;a.status="running",c=""+this.name+":"+a.name+":taskRunner",d=i.keys(a.tasks).length,e=new h(c,d),e.once(""+c+":queue:error",function(b){return a.status="error",a.dom.parents(".form-group").removeClass("has-success").addClass("has-warning").find(".help-block").html('<i class="icon-warning-sign"></i> '+b.info)}),e.once(""+c+":queue:success",function(){return a.status="success",a.dom.parents(".form-group").removeClass("has-warning").addClass("has-success").find(".help-block").html('<i class="icon-ok-sign"></i>')}),f=[];for(b in a.tasks){if(!(b in this.tasks))throw"No such task named "+b+"!";e.setter(b,"running"),f.push(this.tasks[b](a,e))}return f},a.prototype.dump=function(a,b){var c,d,f,g=this;return f=function(c){return i.each(g.cells,function(a){return a.dom.disabled=!1}),a&&!b&&a(c),a&&b?a.call(b,c):void 0},d=[],i.each(this.cells,function(a){return a.dom.disabled=!0,0===i.keys(a.tasks).length?null:d.push(a)}),c=new h(""+this.name+":dump",d.length),c.once(""+this.name+":dump:queue:success",f),c.once(""+this.name+":dump:queue:error",f),i.each(d,function(a){var b;return b=""+g.name+":"+a.name+":taskRunner:queue",c.setter(a.name,"running"),e.Events.once(""+b+":success",function(){return e.Events.off(""+b+":error"),c.setter(a.name,"success")}),e.Events.once(""+b+":error",function(d){return e.Events.off(""+b+":success"),c.setter(a.name,"error",d)}),g.taskRunner(a)})},a.prototype.registerTask=function(a,b){if(a in this.tasks)throw"Task:"+a+" existed!";return this.tasks[a]=b},a.prototype.tasks={regexp:function(a,b){var c;return c=a.tasks.regexp.replace(/^\//,""),c=c.replace(/\/$/,""),c=new RegExp(c),c.test(a.dom.val())?b.setter("regexp","success"):b.setter("regexp","error","Type Error")}},a}(),c.exports=g}),define("/assets/vendor/Zonda/vendor/util/0.0.1/form/cell",[],function(a,b,c){var d,e,f,g;return g=function(a){var b,c,d,e;e={};for(c in a)b=a[c],/^task-/.test(b.name)&&(d=b.name.replace(/^task-/,""),e[d]=b.value);return e},d={"INPUT:text":"text","INPUT:password":"password","INPUT:radio":"radio","INPUT:checkbox":"checkbox",TEXTAREA:"textarea",SELECT:"select"},f=function(a){var b,c,f;b=[];for(c in d)f=d[c],$(a).find(c).each(function(){return b.push(new e(f,this))});return b},e=function(){function a(a,b){var c,d;this.type=a,b=$(b),this.dom=b,this.group_dom=this.dom.parents(".form-group"),this.name=b.attr("name"),this["default"]=b.attr("default"),d=b.attr("value"),void 0!==this["default"]&&void 0===d&&b.val(this["default"]),c=b.prop("attributes"),this.tasks=g(c)}return a}(),c.exports=f}),define("/assets/vendor/Zonda/vendor/util/0.0.1/genre/genre",["underscore","/assets/vendor/Zonda/vendor/util/0.0.1/exception/exception"],function(a,b,c){var d,e,f,g;return g=a("underscore"),d=a("/assets/vendor/Zonda/vendor/util/0.0.1/exception/exception"),f=function(a){return Object.prototype.toString.call(a)},e=function(){function a(a,b){var c=this;this.NAME=a,this.API=b,this.GENRE={},this.recursive(this.API.genre,function(a,b,d){var e,f;return d=d.replace(/\s*/g,"").split("/"),e=g.clone(d),g.each(d,function(a,b){return d[b]=a.split("~")[0],e[b]=function(){var b;return b=a.split(":")[0].split("~"),b.length<2?b[0]:b[1]}()}),d=d.join("/"),e=e.join("/"),a=a.replace(/\s*/g,""),f=a.split(":"),c.GENRE[d]={local_name:f[0].split("~")[0],remote_name:f[0].split("~")[1],genre:f[1].replace(/^@/g,""),essential_act:void 0},c.GENRE[e]=c.GENRE[d]})}return a.prototype.recursive=function(a,b,c){var d,e,h=this;return e=this.NAME?this.NAME:"TOP",c||(c=e),"[object Object]"===f(a)?(d={},g.each(a,function(a,e){var g,i;return g=""+c+"/"+e,i=b(e,a,g),i&&(e=i),d[e]=a,"[object Object]"===f(a)||"[object Array]"===f(a)?d[e]=h.recursive(a,b,g):void 0}),d):"[object Array]"===f(a)?(d=[],g.each(a,function(a){return d.push(h.recursive(a,b,""+c+"/[]"))}),d):a},a.prototype.genre_map={Function:"[object Function]",Object:"[object Object]",Array:"[object Array]",Number:"[object Number]",String:"[object String]"},a.prototype.inspect=function(a){var b,c=this;return b=g.clone(this.GENRE),this.recursive(a,function(a,e,g){return c.GENRE[g]?c.genre_map[c.GENRE[g].genre]!==f(e)?d("genre",{position:g,expect:c.genre_map[c.GENRE[g].genre],not:f(e)}):b[g].is_inspected=!0:null}),!0},a.prototype.modifyKey=function(a,b){var c=this;return this.recursive(a,function(a,d,e){return c.GENRE[e]?c.GENRE[e][b]:void 0})},a.prototype.toLocal=function(a){return this.modifyKey(a,"local_name")},a.prototype.toRemote=function(a){return this.modifyKey(a,"remote_name")},a}(),c.exports=e}),define("/assets/vendor/Zonda/vendor/util/0.0.1/model/model",["underscore","backbone","/assets/vendor/Zonda/vendor/util/0.0.1/genre/genre","/assets/vendor/Zonda/vendor/util/0.0.1/exception/exception","/assets/vendor/Zonda/vendor/util/0.0.1/http/http","jquery","test/fake/server"],function(a,b,c){var d,e,f,g,h;return h=a("underscore"),d=a("backbone"),e=a("/assets/vendor/Zonda/vendor/util/0.0.1/genre/genre"),f=a("/assets/vendor/Zonda/vendor/util/0.0.1/http/http"),g=function(){function a(a,b){var c=this;this.NAME=a,this.API=b,h.extend(this,d.Events),this.connection_stack=[],this.namespace=this.id?""+this.NAME+":"+this.id:""+this.NAME,this.genre=new e("@"+this.NAME,this.API),h.each(this.API,function(a,b){return"genre"!==b?c[b]=function(a){return c.sync(b,a)}:void 0})}return a.prototype.sync=function(a,b){var c=this;if(void 0!==b&&"object"!=typeof b)throw"["+this.NAME+"] Model.sync ERROR: request is not a object!";return this.genre.inspect(b),this.genre.toRemote(b),this.once(""+this.namespace+":"+a+":HTTP:success",function(b){return b=c.genre.toLocal(b),c.trigger(""+c.namespace+":"+a+":success",b)}),this.connection_stack.push(f({url:this.API[a].url,data:b,caller:this,namespace:""+this.namespace+":"+a,fake:this.API[a].fake}))},a.prototype.abort=function(){return h.each(this.connection_stack,function(a){return a.abort()})},a}(),c.exports=g});var __hasProp={}.hasOwnProperty,__extends=function(a,b){function c(){this.constructor=a}for(var d in b)__hasProp.call(b,d)&&(a[d]=b[d]);return c.prototype=b.prototype,a.prototype=new c,a.__super__=b.prototype,a};define("/assets/vendor/Zonda/vendor/util/0.0.1/collection/collection",["underscore","backbone","/assets/vendor/Zonda/vendor/util/0.0.1/exception/exception","/assets/vendor/Zonda/vendor/util/0.0.1/genre/genre","/assets/vendor/Zonda/vendor/util/0.0.1/model/model","/assets/vendor/Zonda/vendor/util/0.0.1/http/http","jquery","test/fake/server"],function(a,b,c){var d,e,f,g,h,i;return i=a("underscore"),d=a("backbone"),f=a("/assets/vendor/Zonda/vendor/util/0.0.1/exception/exception"),g=a("/assets/vendor/Zonda/vendor/util/0.0.1/genre/genre"),h=a("/assets/vendor/Zonda/vendor/util/0.0.1/model/model"),e=function(a){function b(a){i.extend(this,d.Events),this.NAME=a.NAME,this.namespace=this.NAME,this.API=a.API,this.Model=a.Model,this.View=a.View,this.model_list={},this.view_list={},this.genre=new g("@"+this.NAME,this.API),this.connection_stack=[]}return __extends(b,a),b.prototype.fetch=function(){return this.once(""+this.NAME+":READ_LIST:HTTP:success",this.update,this),this.sync("READ_LIST")},b.prototype.update=function(a){var b=this;return"[object Array]"!==Object.prototype.toString.call(a)&&f("genre",{position:"Collection:"+this.NAME+":READ_LIST",expect:"array",not:typeof a}),i.each(a,function(a){return a=Math.abs(a),b.model_list[a]?b.model_list[a].READ({id:a}):b.factory(a)}),i.each(this.model_list,function(b,c){return c=Math.abs(c),-1===i.indexOf(a,c)?(delete this.model_list[c],this.view_list[c].remove(),delete this.view_list[c]):void 0})},b.prototype.factory=function(a){var b,c;return b=new this.Model(""+this.NAME,this.API),b.id=a,c=new this.View(b),this.model_list[a]=b,this.view_list[a]=c,b.READ({id:b.id})},b}(h),c.exports=e});
