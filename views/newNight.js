//on click button Solo Night
function inizializzaStoragePerfectNight_Solo(){
    //initialize storage 
    //removeItem() method removes the specified Storage Object item
    localStorage.removeItem("perfect_night");
    localStorage.removeItem("book");
    localStorage.removeItem("artist");
    localStorage.removeItem("meal");
    localStorage.removeItem("board_game");
    localStorage.removeItem("beer");
    localStorage.removeItem("cocktail");
    localStorage.removeItem("movie");

    //creating an empty perfect_night object
    var perfect_night = {};
    //addin property to perfec_night object
    //bool_issolo will be used to know if the user has choosen to create a solo night
    perfect_night.bool_issolo = 1;

    //creating a perfect_night object in the storage 
    localStorage.perfect_night = JSON.stringify(perfect_night);

    //window.location object is used to redirect the browser to the page specified in href attribute
    window.location.href='addElementSolo.html'; 
}

//on click button In Company
function inizializzaStoragePerfectNight_Company(){
    localStorage.removeItem("perfect_night");
    localStorage.removeItem("book");
    localStorage.removeItem("artist");
    localStorage.removeItem("meal");
    localStorage.removeItem("board_game");
    localStorage.removeItem("beer");
    localStorage.removeItem("cocktail");
    localStorage.removeItem("movie");

    var perfect_night = {};
    perfect_night.bool_issolo = 0;
    localStorage.perfect_night = JSON.stringify(perfect_night);
    window.location.href='addElementCompany.html'; 
}

//logout function for navbar
function logout(){
    var result = confirm("Are you sure you want to logout?");
      if (result) {
        localStorage.clear;
        alert("You are logging out! Bye!");
        window.location.href = "Home.html";  
      }
}
  