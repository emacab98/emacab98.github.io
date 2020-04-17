function checkForm(){     

  var request = new XMLHttpRequest();
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;
  
  //alert("Sending: " + data);
  request.open('GET', 'https://pacific-stream-14038.herokuapp.com/user/'+ username+"/"+password , true)
  request.onload = function() {
  // Begin accessing JSON data here
  if (request.status >= 200 && request.status < 400) {
      alert("OK");
       //Reindirizzamento
        window.location.href = "./feed.html";
       } 
  else {
      
      alert("Wrong combination of username and password!");
      } 
}

request.send();
 }

