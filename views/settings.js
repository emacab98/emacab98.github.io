//variabili globali
var username = localStorage.getItem("username");

$(document).ready(function(){

    document.getElementById("username_here").innerHTML = username+ "'s profile settings";
    $("#change_pswd").hide();
     
    //sezione controllo form password
    $("#my_a_pswd").click(function(){
        var test_pass_bis = false;
        var test_pass=false;
        //Funzione che controlla che le due password sono uguali, se lo sono abilita il bottone di submit, altrimenti lo disabilita. 
        function checkValidity(){
            if(test_pass_bis && test_pass) $("#submit").attr("disabled",false);
            else $("#submit").attr("disabled",true)
        }
  
        $("#change_pswd").show(); 
        $("#div_button").hide();
        $("#submit").prop("disabled",true);
        $("#new_pass").keyup(function(){
            var regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\@\$\!\%\*\?\&]).{8,}$");
            
            var password = document.getElementById("new_pass").value;
            
            if(regex.test(password)){
                document.getElementById("new_mess").style.color = 'green';
                document.getElementById('new_mess').innerHTML = 'Looks good!';
                test_pass=true;

            } 
            else {
                test_pass=false;
                document.getElementById('new_mess').style.color = 'red';
                document.getElementById('new_mess').innerHTML = 'Please insert a password and respect the format';
            } 

            checkValidity();


        });
         //controllo nuove password uguali
        $("#new_pass_bis").keyup(function(){
           
            var new_password = document.getElementById("new_pass").value;
            var new_password_bis = document.getElementById("new_pass_bis").value;
            
            if (new_password == new_password_bis) {
                document.getElementById('new_bis_mess').style.color = 'green';
                document.getElementById('new_bis_mess').innerHTML = 'Matching';
                test_pass_bis = true;
            } 
            else {
                test_pass_bis=false;
                document.getElementById('new_bis_mess').style.color = 'red';
                document.getElementById('new_bis_mess').innerHTML = 'Not matching';
            }

            checkValidity();
        });
        //fine controllo
        

        //sezione submit
        $("#submit").click(function(){
          //Funzione per controllare validità password
            var old_password = document.getElementById("old_pass").value;
            var new_password = document.getElementById("new_pass").value;
            var new_password_bis = document.getElementById("new_pass_bis").value;
            
            if(old_password==""|| new_password==""||new_password_bis==""){
                alert("Please fill al the information!");
                return; }
            var request = new XMLHttpRequest();
            var path =  'https://pacific-stream-14038.herokuapp.com/user/'+username +'/' + old_password
            request.open('GET', path, true)
            request.onload = function() {
            if (request.status >= 200 && request.status < 400) {
                alert("Dati corretti!");
                var request2 = new XMLHttpRequest();
                var obj = {nickname :  username ,  password : new_password };
                var data = JSON.stringify(obj); 
                
            request2.open('PUT', 'https://pacific-stream-14038.herokuapp.com/user/'+username+"/"+old_password , true)
            request2.onload = function() {
                        
                if (request2.status >= 200 && request2.status < 400) {
                    alert("Cambio della password avvenuto con successo!");
                    window.location.href = "./Settings.html"
                } 
                else {
                    alert("Something went wrong!Messaggio: " + this.responseText);
                    } 
                }
                request2.setRequestHeader("Content-type", "application/json");
                request2.send(data);

            }
            else {
                alert("Dati non corretti!");
                } 
            }
            request.send();   

        });
        //fine sezione submit

    }); 
    //fine sezione controllo form password


});

    

  

function logout(){
    var result = confirm("Are you sure you want to logout?");
      if (result) {
        alert("You are logging out! Bye!");
        window.location.href = "./home.html";  
  }
  }


function changeImage(){
    alert("Change Image");
}


