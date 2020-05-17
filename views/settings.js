//variabili globali
var username = localStorage.getItem("username");

$(document).ready(function () {
  document.getElementById("username_here").innerHTML =
    username + "'s profile settings";
  $("#change_pswd").hide();
  $("#delete_profile").hide();
  $("#center").hide();

  //sezione controllo form password
  $("#my_a_pswd").click(function () {
    $("#delete_profile").hide();
    $("#center").show();
    document.getElementById("my_a_pswd").style.color = "white";
    document.getElementById("my_a_delete").style.color = "rgb(153, 153, 153)";
    document.getElementById("new_pass").value = "";
    document.getElementById("old_pass").value = "";
    document.getElementById("new_pass_bis").value = "";
    document.getElementById("new_mess").innerHTML = "";
    document.getElementById("new_bis_mess").innerHTML = "";
    var test_pass_bis = false;
    var test_pass = false;
    //Funzione che controlla che le due password sono uguali, se lo sono abilita il bottone di submit, altrimenti lo disabilita.
    function checkValidity() {
      if (test_pass_bis && test_pass) $("#submit").attr("disabled", false);
      else $("#submit").attr("disabled", true);
    }

    $("#change_pswd").show();
    $("#submit").prop("disabled", true);
    $("#new_pass").keyup(function () {
      var regex = new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[@$!%*?&]).{8,}$"
      );

      var password = document.getElementById("new_pass").value;

      if (regex.test(password)) {
        document.getElementById("new_mess").style.color = "white";
        document.getElementById("new_mess").innerHTML = "Looks good!";
        test_pass = true;
      } else {
        test_pass = false;
        document.getElementById("new_mess").style.color = "black";
        document.getElementById("new_mess").innerHTML =
          "Please insert a password and respect the format";
      }

      checkValidity();
    });

    //controllo nuove password uguali
    $("#new_pass_bis").keyup(function () {
      var new_password = document.getElementById("new_pass").value;
      var new_password_bis = document.getElementById("new_pass_bis").value;

      if (new_password == new_password_bis) {
        document.getElementById("new_bis_mess").style.color = "white";
        document.getElementById("new_bis_mess").innerHTML = "Matching";
        test_pass_bis = true;
      } else {
        test_pass_bis = false;
        document.getElementById("new_bis_mess").style.color = "black";
        document.getElementById("new_bis_mess").innerHTML = "Not matching";
      }

      checkValidity();
    });
    //fine controllo

    //sezione submit
    $("#submit").click(function () {
      //Funzione per controllare validità password
      var old_password = document.getElementById("old_pass").value;
      var new_password = document.getElementById("new_pass").value;
      var new_password_bis = document.getElementById("new_pass_bis").value;
      //Funzione per controllare validità password
      if (new_password == old_password) {
        alert("Your new password shouldn't match your old password! Retry");
        return;
      }

      if (old_password == "" || new_password == "" || new_password_bis == "") {
        alert("Please fill al the information!");
        return;
      }
      var request = new XMLHttpRequest();
      var path =
        "https://pacific-stream-14038.herokuapp.com/user/" +
        username +
        "/" +
        old_password;
      request.open("GET", path, true);
      request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
          var request2 = new XMLHttpRequest();
          var obj = { nickname: username, password: new_password };
          var data = JSON.stringify(obj);

          request2.open(
            "PUT",
            "https://pacific-stream-14038.herokuapp.com/user/" +
              username +
              "/" +
              old_password,
            true
          );
          request2.onload = function () {
            if (request2.status >= 200 && request2.status < 400) {
              alert("Password updated succesfully!");
              window.location.href = "Settings.html";
            } else {
              alert(
                "Something went wrong!Message: " +
                  this.responseText +
                  "\nPlease retry."
              );
            }
          };
          request2.setRequestHeader("Content-type", "application/json");
          request2.send(data);
        } else {
          alert("Your password was not correct. Please try again!");
        }
      };
      request.send();
    });
    //fine sezione submit
  });
  //fine sezione controllo form password

  //inizio delete profile
  $("#my_a_delete").click(function () {
    document.getElementById("my_a_delete").style.color = "white";
    document.getElementById("my_a_pswd").style.color = "rgb(153, 153, 153)";
    document.getElementById("pass").value = "";

    $("#change_pswd").hide();
    $("#center").show();
    $("#delete_profile").show();

    $("#delete").click(function () {
      var password = document.getElementById("pass").value;

      if (password == "") {
        alert("Please insert your password");
        return;
      }
      //controllo password corretta
      var request = new XMLHttpRequest();
      var path =
        "https://pacific-stream-14038.herokuapp.com/user/" +
        username +
        "/" +
        password;
      request.open("GET", path, true);
      request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
          var result = confirm(
            "Are you sure you want to delete your profile?You'll lose all your data"
          );
          if (result) {
            var request2 = new XMLHttpRequest();

            request2.open(
              "DELETE",
              "https://pacific-stream-14038.herokuapp.com/user/" +
                username +
                "/" +
                password,
              true
            );

            request2.onload = function () {
              if (request2.status >= 200 && request2.status < 400) {
                alert("You successfully deleted your profile. Bye!");
                window.location.href = "Home.html";
              } else {
                alert(
                  "Something went wrong!Message: " +
                    this.responseText +
                    "\nPlease retry."
                );
              }
            };
            request2.setRequestHeader("Content-type", "application/json");
            request2.send();
          }
        } else {
          alert("Your password was not correct. Please try again!");
        }
      };
      request.send();
    });
  });
  //fine delete profile
});

function logout() {
  var result = confirm("Are you sure you want to logout?");
  if (result) {
    localStorage.clear;
    alert("You are logging out! Bye!");
    window.location.href = "Home.html";
  }
}
