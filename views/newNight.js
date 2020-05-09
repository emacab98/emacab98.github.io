function inizializzaStoragePerfectNight_Solo(){
    //if(typeof(localStorage.perfect_night) !== "undefined"){
        localStorage.removeItem("perfect_night");
        localStorage.removeItem("book");
        localStorage.removeItem("artist");
        localStorage.removeItem("meal");
        localStorage.removeItem("board_game");
        localStorage.removeItem("beer");
        localStorage.removeItem("cocktail");
        localStorage.removeItem("movie");
    //}
    var perfect_night = {};
    perfect_night.bool_issolo = 1;
    localStorage.perfect_night = JSON.stringify(perfect_night);
    //alert(localStorage.perfect_night);
    window.location.href='addElementSolo.html'; 
}

function inizializzaStoragePerfectNight_Company(){
    //if(typeof(localStorage.perfect_night) !== "undefined"){
        localStorage.removeItem("perfect_night");
        localStorage.removeItem("book");
        localStorage.removeItem("artist");
        localStorage.removeItem("meal");
        localStorage.removeItem("board_game");
        localStorage.removeItem("beer");
        localStorage.removeItem("cocktail");
        localStorage.removeItem("movie");
    //}
    var perfect_night = {};
    perfect_night.bool_issolo = 0;
    localStorage.perfect_night = JSON.stringify(perfect_night);
    //alert(localStorage.perfect_night);
    window.location.href='addElementCompany.html'; 
}