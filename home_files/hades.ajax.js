require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"hades":[function(require,module,exports){
/*globals $, Music */
(function(){
  var ajax = function(params) {
    var baseUri = params.config.baseUri,
    bustCache = function(uri){
      return (uri.indexOf('?') == -1) ? uri + '?ajax=1' : uri + '&ajax=1';
    },
    get = function(request){
      if (request.uri == "/") {request.uri= baseUri;}
      $.ajax({'url': bustCache(request.uri),
              success: function(data) {
                if (data.length===0){ $.publish("Modules:error:ajaxError"); }
                var current = (params.base.core.dispatcher.getUri() == "/") ? baseUri : params.base.core.dispatcher.getUri();
                if (request.uri == current){
                  $.publish('base:default',{'data' : data,
                                            'request' : request,
                                            uri : bustCache(params.base.core.dispatcher.getUri())});
                }
              },
              error: function(XMLHttpRequest, textStatus, errorThrown){
                $.publish("Modules:error:ajaxError",XMLHttpRequest.status);
              }
             });
    },
    init = function(){
      $.subscribe("requestRefresh",function(event,request){ get(request); }); 
    };  
    init();
    return {};
  };
  hades.register({'core' : true, component : {'core.ajax' : ajax}});
}());
},{}]},{},["hades"]);
