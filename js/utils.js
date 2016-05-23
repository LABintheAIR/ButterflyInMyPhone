showPopup( message, modal ){
  if( typeof modal === "undefined" ) { modal = false; }
  
  if( modal ) { $("#popup-general").attr( "data-dismissible", "true" ); }
  else{ $("#popup-general").attr( "data-dismissible", "false" ); }
  
  $("#popup-general p").text( message );

  $("#popup-general").popup( "open" );
}
