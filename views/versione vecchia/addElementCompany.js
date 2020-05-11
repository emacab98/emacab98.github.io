/*localStorage.removeItem("cocktail");
localStorage.removeItem("book");
localStorage.removeItem("movie");
localStorage.removeItem("beer");
localStorage.removeItem("recipe");
localStorage.removeItem("music");
localStorage.removeItem("game");
localStorage.removeItem("perfect_night");*/

function CheckStorage(){
    if(typeof(localStorage.cocktail) != "undefined" || typeof(localStorage.board_game) != "undefined" ||
       typeof(localStorage.movie) != "undefined" || typeof(localStorage.beer) != "undefined" ||
       typeof(localStorage.meal) != "undefined" || typeof(localStorage.artist) != "undefined"){
        $(".button").prop("disabled",false);
    }
    else $(".button").prop("disabled",true);
}