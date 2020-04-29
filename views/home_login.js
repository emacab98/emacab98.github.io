function sendData(){
    //alert("Sending data");
    var params = (new URL(document.location)).searchParams;
    let code = params.get('code'); 
   
    //alert("Code: " + code);
    
  var request = new XMLHttpRequest();
  var path = 'https://pacific-stream-14038.herokuapp.com/auth/callback?code=' + code 
  //alert("Path: " + path);
  request.open('GET', path, true)
  request.onload = function() {
 
  if (request.status >= 200 && request.status < 400) {
     
      alert("Accesso avvenuto con successo");
       } 
  else {
      alert("Something went wrong!");
      } 
}

request.send();
}
//fine

$(document).ready(function(){
    sendData();
});