function showPopup( message, type, modal ){
  if( typeof type === undefined ) { type = 'info'; }
  if( typeof modal === undefined ) { modal = false; }

  switch( type ) {
    case "error":
      $("#popup-general").css( "background-color", "#AA0A0A" );
      $("#popup-general").css( "color", "#FFF" );
      break;

    case 'warning':
      $("#popup-general").css( "background-color", "#D75B08" );
      $("#popup-general").css( "color", "#FFF" );
      break;

    default:
    case 'info':
      $("#popup-general").css( "background-color", "#FFF" );
      $("#popup-general").css( "color", "#000" );
      break;
  }

  if( modal ) { $("#popup-general").attr( "data-dismissible", "true" ); }
  else{ $("#popup-general").attr( "data-dismissible", "false" ); }

  $("#popup-general p").text( message );

  $("#popup-general").popup( "open" );
}

function showSimpleLoading( msg ) {
  $("#overlay-div").show();
  $.mobile.loading( "show", {
    text: msg,
    textVisible: true,
    theme: "b"
  });
}

function hideLoading() {
  $("#overlay-div").hide();
  $.mobile.loading( "hide" );
}

function stringColorToArray( str ){
  return [ parseInt( str[0] + str[1], 16 ), parseInt( str[2] + str[3], 16 ), parseInt( str[4] + str[5], 16 ) ];
}

function truncNumber( num ){
  var value = Number( num ).toFixed(0);
  if( value > Number(num) ){ value--; }
  return value;
}
