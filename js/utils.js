function showPopup( message, modal ){
  if( typeof modal === "undefined" ) { modal = false; }
  
  if( modal ) { $("#popup-general").attr( "data-dismissible", "true" ); }
  else{ $("#popup-general").attr( "data-dismissible", "false" ); }
  
  $("#popup-general p").text( message );

  $("#popup-general").popup( "open" );
}

function stringColorToArray( str ){
  return [ parseInt( str[0] + str[1], 16 ), parseInt( str[2] + str[3], 16 ), parseInt( str[4] + str[5], 16 ) ];
}

