/*localStorage.removeItem("cocktail");
localStorage.removeItem("book");
localStorage.removeItem("movie");
localStorage.removeItem("beer");
localStorage.removeItem("recipe");
localStorage.removeItem("music");
localStorage.removeItem("game");
localStorage.removeItem("perfect_night");*/

function CheckStorage(){
    if(typeof(localStorage.cocktail) != "undefined" || typeof(localStorage.game) != "undefined" ||
       typeof(localStorage.movie) != "undefined" || typeof(localStorage.beer) != "undefined" ||
       typeof(localStorage.recipe) != "undefined" || typeof(localStorage.music) != "undefined"){
        $(".button").prop("disabled",false);
    }
    else $(".button").prop("disabled",true);
}