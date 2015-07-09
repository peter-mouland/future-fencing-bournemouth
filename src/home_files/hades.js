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


