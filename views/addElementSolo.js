/*localStorage.removeItem("cocktail");
localStorage.removeItem("book");
localStorage.removeItem("movie");
localStorage.removeItem("beer");
localStorage.removeItem("recipe");
localStorage.removeItem("music");
localStorage.removeItem("perfect_night");*/

function CheckStorage(){
    if(typeof(localStorage.cocktail) != "undefined" || typeof(localStorage.book) != "undefined" ||
       typeof(localStorage.movie) != "undefined" || typeof(localStorage.beer) != "undefined" ||
       typeof(localStorage.meal) != "undefined" || typeof(localStorage.artist) != "undefined"){
        $(".button").prop("disabled",false);
    }
    else $(".button").prop("disabled",true);
}

$(document).ready(function () {

    if(typeof(localStorage.cocktail) != "undefined"){
        var cocktail = JSON.parse(localStorage.cocktail);
        document.getElementById('cocktail_card').style.backgroundImage = `url("${cocktail.image}")`;
        document.getElementById('cocktail').innerHTML = `${cocktail.name}`;
        document.getElementById('change_cocktail').innerHTML = "Change your cocktail!";
    }

    if(typeof(localStorage.book) != "undefined"){

        var book = JSON.parse(localStorage.book);
        if(book.image != "Sorry, no picture for this book!") document.getElementById('book_card').style.backgroundImage = `url("${book.image}")`;
        document.getElementById('book').innerHTML = `${book.title}`;
        document.getElementById('change_book').innerHTML = "Change your book!";
    }
    

    if(typeof(localStorage.movie) != "undefined"){

        var movie= JSON.parse(localStorage.movie);
        if(movie.playbill != null) document.getElementById('movie_card').style.backgroundImage = `url("${movie.playbill}")`;
        document.getElementById('movie').innerHTML = `${movie.title}`;
        document.getElementById('change_media').innerHTML = "Change your movie or tv show!";
    } 

    if(typeof(localStorage.beer) != "undefined" ){
 
        var beer= JSON.parse(localStorage.beer);
        if(beer.image != "Sorry, no picture provided for this beer") document.getElementById('beer_card').style.backgroundImage = `url("${beer.image}")`;
        document.getElementById('beer').innerHTML = `${beer.name}`;
        document.getElementById('change_beer').innerHTML = "Change your beer!";
    }

    if(typeof(localStorage.meal) != "undefined"){

        var meal = JSON.parse(localStorage.meal);
        document.getElementById('recipe_card').style.backgroundImage = `url("${meal.image}")`;
        document.getElementById('meal').innerHTML = `${meal.name}`;
        document.getElementById('change_meal').innerHTML = "Change your meal!";
    }

    if(typeof(localStorage.artist) != "undefined"){
 
        var music = JSON.parse(localStorage.artist);
        document.getElementById('music_card').style.backgroundImage = `url("${music.album_image}")`;
        document.getElementById('music').innerHTML = `${music.name}`;
        document.getElementById('change_music').innerHTML = "Change your music!";
    }
   
  });
  