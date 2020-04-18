$(document).ready(function(){
    // Retrieve
    document.getElementById("username_here").innerHTML = localStorage.getItem("username") + "'s profile";
   
  });
  
function logout(){
    alert("You are logging out!");
    window.location.href = "./home.html";

}