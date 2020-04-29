//variabili globali che controllano validità di ogni singolo controllo
var test_pass,test_name,test_surname,test_email,test_pass_bis = false;


//all'inizio il bottone è disabilitato
$(document).ready(function(){
  $("#submit").prop("disabled",true);
});

//Funzione che controlla che tutti i requisiti siano soddisfatti, se lo sono abilita il bottone di submit,
//altrimenti lo disabilita. 
function checkValidity(){
  if(test_pass && test_name && test_surname && test_email && test_pass_bis) $("#submit").attr("disabled",false);
  else $("#submit").attr("disabled",true)
}



function checkPasswordBis() {
  var pass1=  document.getElementById('password').value;
  var pass2 = document.getElementById('password2').value;

    if (pass1 ==
            pass2) {
              document.getElementById('message').style.color = 'green';
              document.getElementById('message').innerHTML = 'Matching';
             test_pass_bis = true;
             
    } 
    else {
        test_pass_bis=false;
    
        document.getElementById('message').style.color = 'red';
       document.getElementById('message').innerHTML = 'Not matching';
       
    }

    checkValidity();

} 


function checkPassword(){
 
  var regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\@\$\!\%\*\?\&]).{8,}$");
  
  var password = document.getElementById("password").value;
  
  if(regex.test(password)){
    document.getElementById('message_password').style.color = 'green';
    document.getElementById('message_password').innerHTML = 'Looks good!';
    test_pass=true;

  } 
  else {
     test_pass=false;
      document.getElementById('message_password').style.color = 'red';
      document.getElementById('message_password').innerHTML = 'Please insert a password and respect the format';
  } 

  checkValidity();

}



function checkName(){
    var regex = new RegExp("^[^0-9]+$");
    var name = document.getElementById("name").value;
    if(regex.test(name) ){
      document.getElementById('message_name').style.color = 'green';
      document.getElementById('message_name').innerHTML = 'Looks good!';
      test_name=true;

    }
     else {
        test_name=false;
        document.getElementById('message_name').style.color = 'red';
        document.getElementById('message_name').innerHTML = 'The name must not contain numbers';
    }
    checkValidity();
}



function checkSurname(){
  var regex = new RegExp("^[^0-9]+$");
  var surname = document.getElementById("surname").value;
  if(regex.test(surname) ){
    document.getElementById('message_surname').style.color = 'green';
    document.getElementById('message_surname').innerHTML = 'Looks good!';
    test_surname=true;

  }
   else {
      test_surname=false;
      document.getElementById('message_surname').style.color = 'red';
      document.getElementById('message_surname').innerHTML = 'The surname must not contain numbers';
  }
  checkValidity();
}



function checkEmail(){
  
  var regex = new RegExp("^[a-zA-Z0-9\.!#$%&'*+/=?^_`{|}~-]+.\@.[a-zA-Z0-9]+.\..[a-zA-Z]+$");
  var email = document.getElementById("email").value;
  if(regex.test(email) ){
    document.getElementById('message_email').style.color = 'green';
    document.getElementById('message_email').innerHTML = 'Looks good!';
    test_email=true;
  }
   else {
     test_email=false;
      
      document.getElementById('message_email').style.color = 'red';
      document.getElementById('message_email').innerHTML = 'Please insert a valid e-mail address';
  }
  checkValidity();
}

function checkForm(){     

  var request = new XMLHttpRequest();
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  if(username==""|| password==""||email==""){
    alert("Please fill al the information!");
    return;
  }
  
  var obj = {nickname :  username , email :  email , password : password , profile_pic_path : null};
  var data = JSON.stringify(obj); 

  
  
  request.open('POST', 'https://pacific-stream-14038.herokuapp.com/user' , true)
  request.onload = function() {
  // Begin accessing JSON data here
  if (request.status >= 200 && request.status < 400) {
      var risposta = JSON.parse(this.response);
      alert("You have successfully signed up!");
      //memorizzazione
      localStorage.setItem("username", risposta.nickname);
       //Reindirizzamento

        window.location.href = "Profile.html";
       
       } 
  else {
      
      alert("This combination of nickname and email seems to be already in use! Please try again");
      } 
}
request.setRequestHeader("Content-type", "application/json");
request.send(data);
 }

 function googleSignUp(){
  window.location.href='https://pacific-stream-14038.herokuapp.com/auth/begin';

}