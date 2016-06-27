//Page Name

function LAB_Constant(){
  var cst = { "PAGE_INDEX"              : "index",
              "PAGE_DEVICE_CONNECTION"  : "device-connect",

              "LS_AQ_URL"   : "local_storage_select_aq_url",

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
