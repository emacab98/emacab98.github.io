function logout(){
    var result = confirm("Are you sure you want to logout?");
      if (result) {
        alert("You are logging out! Bye!");
        window.location.href = "./home.html";  
  }
  }