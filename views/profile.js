var username = localStorage.getItem("username");


$(document).ready(function(){

    document.getElementById("username_here").innerHTML = username + "'s profile";
    //$("#message").hide();
    
    //Funzione che carica le notti dinamicamente
    function findNights(){
     
      var request = new XMLHttpRequest();
      var path =  'https://pacific-stream-14038.herokuapp.com/created/'+username ;
      request.open('GET', path, true)
      request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
          var risposta = JSON.parse(this.response);
          if(risposta.length == 0){
            $("#message").show();

          }
          else{
            //alert("Ci sono delle notti!")

          }
          }

      else {
          alert("Something went wrong");
          } 
      }
      request.send();   


    }

    findNights();
   
  });
  
function logout(){
  var result = confirm("Are you sure you want to logout?");
    if (result) {
      alert("You are logging out! Bye!");
      window.location.href = "./home.html";  
}
}

