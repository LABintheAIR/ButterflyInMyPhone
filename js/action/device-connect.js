function DC_objects(){
  return {  "number_led"        : jQuery( "#DC-nb-led"),
            "list_indicator"    : jQuery( "#DC-indicator-list" ),
            "list_butterfly"    : jQuery( "#DC-butterfly-list" ),
         };
}

function DC_set_number_led( number ){
  DC_objects().number_led.val( number );
  DC_onchange_number_led();
}

function DC_onchange_number_led(){
  DC_check_number_field_value();
  DC_set_indicator_list();
  DC_set_butterfly_list();
}

function DC_check_number_field_value(){
  var input = DC_objects().number_led;
  var inputValue = Number( input.val() );
  var minValue = Number( input.attr('min') );
  var maxValue = Number( input.attr('max') );

  if( inputValue % 1 !== 0 ){ inputValue = truncNumber( inputValue ); }
  if( inputValue < minValue ){ inputValue = minValue; }
  if( inputValue > maxValue ){ inputValue = maxValue; }

  input.val( inputValue );
}

function DC_set_indicator_list(){
  var obj = DC_objects().list_indicator;
  var target = DC_objects().number_led.val();
  var current = obj.children().length;
  var form =  '<table style="width: 100%">' +
              '<tr>' +
              '<td><input onchange="DC_save_localStrorage();" class="jscolor_send jscolor {mode: \'HVS\', width:243, height:150, position:\'bottom\', borderColor:\'#FFF\', insetColor:\'#FFF\', backgroundColor:\'#666\'}"></td>' +
              '<td><input type="button" value="Send color" onclick="DC_sendColor();"></td>' +
            '</tr>' +
            '<tr>' +
              '<td><select class="select_aq_url" onchange="DC_save_localStrorage();"></select></td>' +
              '<td><input type="button" value="Get Air Quality" onclick="DC_sendAirQuality()"></td>' +
            '</tr>' +
          '</table>';

  if( target > current ){
    for(; target > current; current++ ){
      obj.append( '<div id="indicator-' + current + '" data-role="collapsible" data-collapsed-icon="carat-d" data-expanded-icon="carat-u"><h4>Indicator ' + (current+1) + '</h4>' + form + '</div>' );
      jQuery("#indicator-" + current).children().trigger("create");
    }
  }
  else {
    for(; target < current; target++ ){
      obj.children().last().remove();
    }
  }

  DC_objects().list_indicator.children().find(".jscolor_send").each( function( key, value ){ DC_set_colorfiled_value( key, jQuery( value ) ); } );
  DC_objects().list_indicator.children().find("select").each( function( key, value ){ DC_fill_select_list( key, jQuery( value ) ); } );
  obj.collapsibleset( "refresh" );
}

function DC_fill_select_list( indicatorNumber, selectField ){
  var select = window.localStorage.getItem( LAB_Constant().LS_DEVICE_PARAM_PREFIX + BLE_peripheral_data.id );
  if( select !== null ){
    select = JSON.parse(select).indicators[indicatorNumber];
  }

  selectField.empty();
  jQuery.each( LAB_Url_Station(), function( key, value ) {
    var selected = "";
    if( value == select ) { selected = "selected='selected'"; }
    selectField.append( "<option value='" + value + "' " + selected + ">" + key + "</option>" );
  });
  selectField.selectmenu("refresh");
}

function DC_set_colorfiled_value( indicatorNumber, colorField ){
  var value = window.localStorage.getItem( LAB_Constant().LS_DEVICE_PARAM_PREFIX + BLE_peripheral_data.id );
  if( value !== null ){
    value = JSON.parse(value).colors[indicatorNumber];
  }
  else {
    value = "FFFFFF";
  }

  colorField.val( value );
  new jscolor( colorField[0] );
}

function DC_set_butterfly_list(){
  var obj = DC_objects().list_butterfly;
  var target = DC_objects().number_led.val();
  var current = obj.children().length;

  var svg = '<?xml version="1.0" encoding="iso-8859-1"?> <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 267 267" style="enable-background:new 0 0 267 267;" xml:space="preserve"> <g> <path id="butterfly-shape" style="fill:#030104;" d="M269.8,50.743L269.8,50.743c-1.78-5.744-11.059-9.395-20.997-10.383 c-12.215-1.223-27.84,1.321-41.432,6.959c-10.324,4.283-19.889,9.614-29.721,17.347c-15.463,12.154-23.654,21.936-27.796,27.4 c-3.347,4.413-4.059,9.449-7.13,11.768c-0.155-1.163,0.258-4.226-1.739-5.387c-0.588-0.341-1.249-0.736-1.913-1.123 c0.748-3.086,4.615-17.909,10.821-26.413c7.539-10.349,15.965-16.273,17.062-16.954c1.333-0.841,2.749-0.906,3.678-1.487 c0.705-0.437,1.175-2.367,0.789-2.579c-1.432-0.783-3.023,0.91-4.014,1.987c-1.045,1.142-11.975,8.63-18.662,18.378 c-6.25,9.104-10.191,23.66-10.9,26.399c-1.17-0.627-2.244-1.112-2.847-1.112c-0.544,0-1.467,0.395-2.486,0.917 c-0.816-3.171-4.734-17.417-10.845-26.339c-6.688-9.745-17.621-17.101-18.667-18.243c-0.979-1.077-2.575-2.77-4.003-1.987 c-0.402,0.211,0.073,2.142,0.778,2.579c0.936,0.581,2.34,0.646,3.683,1.487c1.091,0.68,9.514,6.475,17.057,16.816 c6.077,8.331,9.904,22.818,10.782,26.341c-0.794,0.453-1.6,0.929-2.301,1.332c-1.979,1.161-1.572,4.225-1.734,5.387 c-2.77-1.487-5.003-7.965-9.059-13.975c-4.31-6.413-10.397-13.039-25.848-25.193c-9.851-7.732-19.408-13.064-29.727-17.347 c-13.592-5.639-29.222-8.183-41.437-6.959c-9.951,0.989-19.24,4.64-20.998,10.383c-1.365,4.454,4.734,18.271,10.387,26.297 c4.203,5.967,5.081,12.863,6.631,19.667c2.211,9.724,6.223,24.234,17.248,27.843c10.095,3.318,29.826-2.649,29.826-2.649 s0.433,3.533-6.193,6.185c-6.896,2.763-10.617,7.07-14.585,14.584c-3.563,6.74-6.402,15.777-6.402,19.768 c0,6.187,1.545,8.397,1.316,11.268c-0.268,3.554,0.996,7.071,3.436,9.721c2.737,3,1.65,5.635,2.872,8.951 c1.102,2.996,5.411,5.416,5.411,5.416s-0.487,6.78,4.422,11.271c3.966,3.642,8.461,6.021,11.382,8.611 c2.971,2.658,5.192,4.76,11.594,5.973c3.69,0.701,5.972,6.706,13.7,6.266c8.388-0.48,8.366-0.14,13.71-2.327 c8.607-3.531,12.457-20.199,16.123-36.296c2.881-12.602,5.086-20.421,8.896-23.067c-1.081,7.376,0.533,19.634,0.533,19.634 s-1.169,6.293-0.09,7.375c-0.499,3.233,0.504,7.656,1.051,7.547c0.224,2.642,1.602,7.447,3.539,7.447 c1.935,0,3.318-4.806,3.529-7.447c0.561,0.109,1.551-4.313,1.057-7.547c1.076-1.082-0.088-7.375-0.088-7.375 s1.489-11.51,0.498-19.797c3.402,1.734,6.049,10.629,8.921,23.23c3.676,16.097,7.521,32.765,16.138,36.296 c5.332,2.188,5.317-0.034,13.699,0.444c7.734,0.441,10.012-6.875,13.699-7.568c6.413-1.217,8.623-3.315,11.6-5.969 c2.934-2.596,7.404-4.973,11.389-8.617c4.891-4.492,4.41-11.274,4.41-11.274s4.332-2.429,5.428-5.415 c1.197-3.313,0.117-5.951,2.86-8.949c2.433-2.648,3.704-6.167,3.424-9.72c-0.218-2.874,1.337-5.085,1.337-11.268 c0-3.99-2.848-9.841-6.424-16.581c-3.972-7.514-7.678-11.821-14.577-14.584c-6.626-2.652-6.185-6.185-6.185-6.185 s19.711,5.967,29.838,2.649c11.009-3.609,15.027-18.119,17.232-27.843c1.549-6.804,2.433-13.701,6.629-19.667 C265.055,69.013,271.17,55.197,269.8,50.743z"/> </g> </svg>';


  if( target > current ){
    for(; target > current; current++ ){
      if( current % 2 === 0 ) {
        obj.append( '<div class="ui-block-a">' + svg + '</div>' );
      }
      else{
        obj.append( '<div class="ui-block-b">' + svg + '</div>' );
      }
    }
  }
  else {
    for(; target < current; target++ ){
      obj.children().last().remove();
    }
  }
}

function DC_sendColor(){
  var list = DC_objects().list_indicator;
  list.children().find('.jscolor_send').each( function( key, value ){
    var values = stringColorToArray( jQuery(value).val() );
    sendBufferData( generateDataBuffer( values[0], values[1], values[2] ) );
  });
}

function DC_sendAirQaulity_counter(){
  var counter = 0;

  return {  "add" : function() {
              return ++counter;
            },
            "del" : function() {
              return --counter;
            }
          };
}

function DC_ajax_sendAirQuality( counterObject, selectObject, nbTotalRequest ){
  $.ajax( jQuery( selectObject ).val(), { "timeout" : LAB_Constant().AJAX_TIMEOUT } )
    .done( function( data ){
      sendBufferData( generateDataBuffer( data.color[0][0], data.color[0][1], data.color[0][2] ) );
    })
    .fail( function( jqXHR, textStatus, errorThrown ){
      showPopup( "Fail to get AirQuality data.<br>URL : " + jQuery( selectObject ).val() + "<br>Status code : " + jqXHR.status + "<br>Error text status : " + textStatus + "<br>Error thrown : " + errorThrown, 'error' );
      sendBufferData( generateDataBuffer( 0, 0, 0 ) );
    })
    .always( function(){
      var counter = counterObject.del();
      if(  counter <= 0 ){
        hideLoading();
      }
      else {
        showSimpleLoading( "Getting AirQuality... " + (100 - truncNumber( (counter * 100) / nbTotalRequest ) ) + "%" );
      }
    });
}

function DC_sendAirQuality()
{
  var counterObject = DC_sendAirQaulity_counter();
  var nbTotalRequest = DC_objects().list_indicator.children().find("select").length;
  DC_objects().list_indicator.children().find("select").each( function( key, value ){
    showSimpleLoading( "Getting AirQuality... 0%");
    counterObject.add();
    DC_ajax_sendAirQuality( counterObject, value, nbTotalRequest );
  } );
}

function DC_save_localStrorage(){
  var obj = { "length" : DC_objects().number_led.val(),
              "indicators" : {},
              "colors" : {}
            };

  DC_objects().list_indicator.children().find(".jscolor_send").each( function( key, value ){ obj.colors[key] = jQuery(value).val(); } );
  DC_objects().list_indicator.children().find("select").each( function( key, value ){ obj.indicators[key] = jQuery(value).val(); } );

  window.localStorage.setItem( LAB_Constant().LS_DEVICE_PARAM_PREFIX + BLE_peripheral_data.id, JSON.stringify(obj) );
}
