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