//Page Name

function LAB_Constant(){
  var cst = { "PAGE_INDEX"              : "index",
              "PAGE_DEVICE_CONNECTION"  : "data/device-connect.html",

              "LS_DEVICE_PARAM_PREFIX" : "local_storage_LABAIR_device_parameters_",

              "AJAX_TIMEOUT"  : 5000,
   };

  return ( function(r){ return r; } )(cst);
}

function LAB_Url_Station(){
  var url = {     "Marseille Urbain" : "http://papillon-jnth.rhcloud.com/paca/iqa/marseille-urb",
                  "Marseille Trafic" : "http://papillon-jnth.rhcloud.com/paca/iqa/marseille-trf",
                  "Aix-en-Provence Urbain" : "http://papillon-jnth.rhcloud.com/paca/iqa/aix-urb",
                  "Aix-en-Provence Trafic" : "http://papillon-jnth.rhcloud.com/paca/iqa/aix-trf",
               };

  return ( function(r){ return r; } )(url);
}
