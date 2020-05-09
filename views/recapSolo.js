/*localStorage.removeItem("cocktail");
localStorage.removeItem("book");
localStorage.removeItem("movie");
localStorage.removeItem("beer");
localStorage.removeItem("recipe");
localStorage.removeItem("music");
localStorage.removeItem("game");
localStorage.removeItem("perfect_night");*/
var perfect_night;
function CheckStorage(){
    if(typeof(localStorage.cocktail) == "undefined"){
        document.getElementById('cocktail_card').style.backgroundImage = 'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url("cocktail.jpg")';
        document.getElementById('cocktail_card').style.opacity='.5';
    } 
    else{
        var cocktail = JSON.parse(localStorage.cocktail);
        document.getElementById('cocktail_card').style.backgroundImage = `url("${cocktail.image}")`;
        document.getElementById('cocktail').innerHTML = `${cocktail.name}`;
    }

    
    if(typeof(localStorage.book) == "undefined"){
        document.getElementById('book_card').style.backgroundImage = 'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url("book.jpg")';
        document.getElementById('book_card').style.opacity='.5';
    }
    else{
        var book = JSON.parse(localStorage.book);
        if(book.image != "Sorry, no picture for this book!") document.getElementById('book_card').style.backgroundImage = `url("${book.image}")`;
        document.getElementById('book').innerHTML = `${book.title}`;
    }
    if(typeof(localStorage.movie) == "undefined"){
        document.getElementById('movie_card').style.backgroundImage = 'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url("ciak.jpg")';
        document.getElementById('movie_card').style.opacity='.5';
    }
    else{
        var movie= JSON.parse(localStorage.movie);
        //alert(movie.playbill);
        if(movie.playbill != null) document.getElementById('movie_card').style.backgroundImage = `url("${movie.playbill}")`;
        document.getElementById('movie').innerHTML = `${movie.title}`;
    } 

    if(typeof(localStorage.beer) == "undefined" ){
        document.getElementById('beer_card').style.backgroundImage = 'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url("beer.jpg")';
        document.getElementById('beer_card').style.opacity='.5';
    }
    else{
        var beer= JSON.parse(localStorage.beer);
        if(beer.image != "Sorry, no picture provided for this beer") document.getElementById('beer_card').style.backgroundImage = `url("${beer.image}")`;
        document.getElementById('beer').innerHTML = `${beer.name}`;
    }

    if(typeof(localStorage.meal) == "undefined"){
        document.getElementById('recipe_card').style.backgroundImage = 'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url("recipe.jpg")';
        document.getElementById('recipe_card').style.opacity='.5';
    } 
    else{
        var meal = JSON.parse(localStorage.meal);
        document.getElementById('recipe_card').style.backgroundImage = `url("${meal.image}")`;
        document.getElementById('meal').innerHTML = `${meal.name}`;
    }

    if(typeof(localStorage.artist) == "undefined"){
        document.getElementById('music_card').style.backgroundImage = 'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url("music.jpg")';
        document.getElementById('music_card').style.opacity='.5';
    }
    else{
        var music = JSON.parse(localStorage.artist);
        document.getElementById('music_card').style.backgroundImage = `url("${music.album_image}")`;
        document.getElementById('music').innerHTML = `${music.name}`;
    }

    perfect_night = JSON.parse(localStorage.perfect_night);
    document.querySelector('.paragraph_category').innerHTML = `${perfect_night.tag_type}`;
    document.querySelector('.paragraph_description').innerHTML = `${perfect_night.description}`;

}

function CreateNight(){
    $(".button2").prop("disabled",true);
    delete perfect_night.bool_issolo;
    var data;
    var request = new XMLHttpRequest();
    request.open('POST', `https://pacific-stream-14038.herokuapp.com/perfectnight/${localStorage.username}`, true);
    request.onload = function() {
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
            // Begin accessing JSON data here
            localStorage.removeItem("perfect_night");
            localStorage.removeItem("book");
            localStorage.removeItem("artist");
            localStorage.removeItem("meal");
            localStorage.removeItem("board_game");
            localStorage.removeItem("beer");
            localStorage.removeItem("cocktail");
            localStorage.removeItem("movie");
            alert("Perfect night created successfully");
            window.location.href='Feed.html';
        }  
        else{
            alert("Error creating night");
            $(".button2").prop("disabled",false);
        }
    }

    data = JSON.stringify(perfect_night); 
    request.setRequestHeader("Content-type", "application/json");
    request.send(data);
}