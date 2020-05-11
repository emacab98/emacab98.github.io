//funzione che reindirizza all'autenticazione con twitter
function post_tweet() {
  window.location.href = "https://pacific-stream-14038.herokuapp.com/twitter";
}

//funzione che manda i dati di autenticazione di twitter per poterci postare sopra. 
function sendData() {
  
  var params = new URL(document.location).searchParams;
  var oauth_token = params.get("oauth_token");
  var oauth_verifier = params.get("oauth_verifier");
  var night_id = JSON.parse(localStorage.id_created_night);
  var request = new XMLHttpRequest();
  var path =
    "https://pacific-stream-14038.herokuapp.com/twitter/callback?oauth_token=" +
    oauth_token +
    "&oauth_verifier=" +
    oauth_verifier + "&id=" + night_id;
  
  request.open("GET", path, true);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      
      alert("You have successfully tweeted your perfect night!");
    } else {
      alert("Something went wrong! Try again!\nMessage: " + this.responseText);
    }
  };

  request.send();
}

//funzione per tornare al feed
function backToFeed(){
localStorage.removeItem("cocktail");
localStorage.removeItem("book");
localStorage.removeItem("board_game");
localStorage.removeItem("movie");
localStorage.removeItem("beer");
localStorage.removeItem("recipe");
localStorage.removeItem("music");
localStorage.removeItem("game");
localStorage.removeItem("perfect_night");
window.location.href = "Feed.html"


}


$(document).ready(function () {
  var url = window.location.href ; 
  var find = /\?/;
  if(find.test(String(url).toLowerCase()) == true){ 
    sendData();
  }
});
