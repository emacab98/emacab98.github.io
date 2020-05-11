//funzione per mandare i dati al server
function sendData() {
  var params = new URL(document.location).searchParams;
  var code = params.get("code");
  var request = new XMLHttpRequest();
  var path =
    "https://pacific-stream-14038.herokuapp.com/auth/callback?code=" + code;
  request.open("GET", path, true);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var risposta = JSON.parse(this.response);
      localStorage.setItem("username", risposta.nickname);

      alert(
        "You have successfully signed in with Google!\nPlease take notes of these credentials as you might need to use them:\nYour nickname: " +
          risposta.nickname +
          "\nYour password: " +
          risposta.password
      );
    } else {
      alert("Something went wrong! Try again!\nMessage: " + this.responseText);
      window.location.href = "Home.html";
    }
  };

  request.send();
}
//fine

function logout() {
  var result = confirm("Are you sure you want to logout?");
  if (result) {
    localStorage.clear;
    alert("You are logging out! Bye!");
    window.location.href = "Home.html";
  }
}

$(document).ready(function () {
  var url = window.location.href;
  var find = /\?/;
  if (find.test(String(url).toLowerCase()) == true) {
    sendData();
  }
});


