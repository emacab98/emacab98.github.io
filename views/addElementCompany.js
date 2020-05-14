//onload function
function CheckStorage(){
    //proceed button is disabled if no item is added
    if(typeof(localStorage.cocktail) != "undefined" || typeof(localStorage.board_game) != "undefined" ||
       typeof(localStorage.movie) != "undefined" || typeof(localStorage.beer) != "undefined" ||
       typeof(localStorage.meal) != "undefined" || typeof(localStorage.artist) != "undefined"){
        $(".button").prop("disabled",false);
    }
    else $(".button").prop("disabled",true);

    //checking if a specific element is added in the night to change the card
    if(typeof(localStorage.cocktail) != "undefined"){
        var cocktail = JSON.parse(localStorage.cocktail);
        document.querySelector("#cocktail_card .flip-card-front").style.backgroundImage = `url("${cocktail.image}")`;
        document.querySelector("#cocktail_card .card-title").innerHTML = `${cocktail.name}`;
        document.querySelector("#cocktail_card .change-title").innerHTML = "Change your cocktail!";
    }

    if(typeof(localStorage.board_game) != "undefined"){
        var game = JSON.parse(localStorage.board_game);
        document.querySelector("#game_card .flip-card-front").style.backgroundImage = `url("${game.imageUrl}")`;
        document.querySelector("#game_card .card-title").innerHTML = `${game.name}`;
        document.querySelector("#game_card .change-title").innerHTML = "Change your boardgame!";
    }
    

    if(typeof(localStorage.movie) != "undefined"){

        var movie= JSON.parse(localStorage.movie);
        if(movie.playbill != null) document.querySelector("#movie_card .flip-card-front").style.backgroundImage = `url("${movie.playbill}")`;
        document.querySelector("#movie_card .card-title").innerHTML = `${movie.title}`;
        document.querySelector("#movie_card .change-title").innerHTML = "Change your movie or tv show!";
    } 

    if(typeof(localStorage.beer) != "undefined" ){
 
        var beer= JSON.parse(localStorage.beer);
        if(beer.image != "Sorry, no picture provided for this beer") document.querySelector("#beer_card .flip-card-front").style.backgroundImage = `url("${beer.image}")`;
        document.querySelector("#beer_card .card-title").innerHTML = `${beer.name}`;
        document.querySelector("#beer_card .change-title").innerHTML = "Change your beer!";
    }

    if(typeof(localStorage.meal) != "undefined"){

        var meal = JSON.parse(localStorage.meal);
        document.querySelector("#recipe_card .flip-card-front").style.backgroundImage = `url("${meal.image}")`;
        document.querySelector("#recipe_card .card-title").innerHTML = `${meal.name}`;
        document.querySelector("#recipe_card .change-title").innerHTML = "Change your meal!";
    }

    if(typeof(localStorage.artist) != "undefined"){
 
        var music = JSON.parse(localStorage.artist);
        document.querySelector("#music_card .flip-card-front").style.backgroundImage = `url("${music.album_image}")`;
        document.querySelector("#music_card .card-title").innerHTML = `${music.name}`;
        document.querySelector("#music_card .change-title").innerHTML = "Change your music!";
    }
}