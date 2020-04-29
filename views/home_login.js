function sendData(){
    //alert("Sending data");
    var params = (new URL(document.location)).searchParams;
    var code = params.get('code'); 
   
    //alert("Code: " + code);
    
  var request = new XMLHttpRequest();
  var path = 'https://pacific-stream-14038.herokuapp.com/auth/callback?code=' + code ;
  //alert("Path: " + path);
  request.open('GET', path, true)
  request.onload = function() {
 
  if (request.status >= 200 && request.status < 400) {
        
        var risposta = JSON.parse(this.response);
        localStorage.setItem("username", risposta.nickname);
        alert("You have successfully signed in with Google!");
  } 

  else {
      alert("Something went wrong! Try again!\nMessage: " + this.responseText);
      window.location.href = "Home.html";
  } 
}

request.send();
}
//fine

$(document).ready(function(){
    sendData();
   
});