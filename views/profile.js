var username = localStorage.getItem("username");


$(document).ready(function(){

    document.getElementById("username_here").innerHTML = username + "'s profile";
    //$("#message").hide();
    document.getElementById('my_night').style.color = '#CC2A41';
    document.getElementById('message').innerHTML = 'Your nights will appear here!Start creating now';

    //Funzione che carica le notti dinamicamente
    function findNights(){
     
      var request = new XMLHttpRequest();
      var path =  'https://pacific-stream-14038.herokuapp.com/created/'+username ;
      request.open('GET', path, true)
      request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
          var risposta = JSON.parse(this.response);
          if(risposta.length == 0){
            document.getElementById('message').innerHTML = 'Your nights will appear here! Start creating now!';
            $("#message").show();

          }
          else{
            document.getElementById('message').innerHTML = 'Your nights will appear here! Start creating now!';
            alert("Ci sono delle notti!Codice da implementare")

          }
          }

      else {
          alert("Something went wrong");
          } 
      }
      request.send();   
    }
    

    //funzione che carica le notti salvate dinamicamente
    function findSavedNights(){
     
      var request = new XMLHttpRequest();
      var path =  'https://pacific-stream-14038.herokuapp.com/saved/'+username ;
      request.open('GET', path, true)
      request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
          var risposta = JSON.parse(this.response);
          if(risposta.length == 0){
            document.getElementById('message').innerHTML = 'Your saved nights will appear here! Browse some night on the feed page!';
            $("#message").show();
          }
          else{
            alert("Ci sono delle notti!Codice da implementare")

          }
      }

      else {
          alert("Something went wrong");
          } 
      }
      request.send();   
    }
    

    //funzione che carica le notti preferite dinamicamente
    function findFavouriteNights(){
     
      var request = new XMLHttpRequest();
      var path =  'https://pacific-stream-14038.herokuapp.com/upvoted/'+username ;
      request.open('GET', path, true)
      request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
          var risposta = JSON.parse(this.response);
          if(risposta.length == 0){
            document.getElementById('message').innerHTML = 'Your favourites nights will appear here! Browse some night on the feed page!';
            $("#message").show();
          }
          else{
            alert("Ci sono delle notti! Codice da implementare")

          }
      }

      else {
          alert("Something went wrong");
          } 
      }
      request.send();   
    }

    findNights();

    $("#my_night").click(function(){

      document.getElementById('my_night').style.color = '#CC2A41';
      document.getElementById('my_saved').style.color = '#424254';
      document.getElementById('my_favourite').style.color ='#424254';
      findNights();
    });

    //my_saved
    $("#my_saved").click(function(){

      document.getElementById('my_saved').style.color = '#CC2A41';
      document.getElementById('my_night').style.color = '#424254';
      document.getElementById('my_favourite').style.color ='#424254';
      findSavedNights();
    });
   
    //my_favourites
    $("#my_favourite").click( function(){

      document.getElementById('my_favourite').style.color = '#CC2A41';
      document.getElementById('my_night').style.color = '#424254';
      document.getElementById('my_saved').style.color = '#424254';
      findFavouriteNights();
    })

});
  
function logout(){
  var result = confirm("Are you sure you want to logout?");
    if (result) {
      alert("You are logging out! Bye!");
      window.location.href = "./home.html";  
    }
}

