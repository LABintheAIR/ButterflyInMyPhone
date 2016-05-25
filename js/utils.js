function showPopup( message, type, modal ){
  if( typeof type === undefined ) { type = 'info'; }
  if( typeof modal === undefined ) { modal = false; }

  switch( type ) {
    case "error":
      $("#popup-general").css( "background-color", "#FF2828" );
      break;

    case 'warning':
      $("#popup-general").css( "background-color", "#F77B28" );
      break;
    
    default:
    case 'info':
      $("#popup-general").css( "background-color", "#FFF" );
      break;
  }

  if( modal ) { $("#popup-general").attr( "data-dismissible", "true" ); }
  else{ $("#popup-general").attr( "data-dismissible", "false" ); }
  
  $("#popup-general p").text( message );

  $("#popup-general").popup( "open" );
}

function stringColorToArray( str ){
  return [ parseInt( str[0] + str[1], 16 ), parseInt( str[2] + str[3], 16 ), parseInt( str[4] + str[5], 16 ) ];
}

