require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"hades":[function(require,module,exports){
/*globals $, Music, _debug */
// http://weblog.bocoup.com/publishsubscribe-with-jquery-custom-events
(function(){
  window.hades = {};
  var _config,
  registeredBaseComponents = [],
  registeredComponents = [],
  obj   = { ownerDocument:document },
  initialiseComponent = function(component,params){
    var name, splitName, i,
        current = hades;
    for (name in component) {
      splitName = name.split('.');
      for (i in splitName ) {
        if (!current[splitName[i]]) {   
          current[splitName[i]] = (i != splitName.length -1) ? {} : (params) ? component[name](params) : component[name]();
        }
        current = current[splitName[i]];
      }
    }
  },
  initialiseComponents = function(){
    var i;
    for (i in registeredBaseComponents ) {
      initialiseComponent(registeredBaseComponents[i],{'config' : _config, 'base' : hades});
    }
    for (i in registeredComponents ) {
      initialiseComponent(registeredComponents[i]);
    }
  },
  application = function(config){
    _config = config;
    initialiseComponents();
  },
  register = function(component){
    var fn = (component.core) ? registeredBaseComponents.push(component.component) : registeredComponents.push(component);
    initialiseComponent(component);
  };
  
  $.publish = function(type,arg){
    if (!arg)   { $(obj).trigger(type);     }
    else        { $(obj).trigger(type,arg); }
  };
  $.subscribe = function(type,funct){
    $(obj).bind(type,funct);
  };
  
  hades.application = application;
  hades.register = register;
    
}()); 



},{}]},{},["hades"]);
