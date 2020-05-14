var perfect_night;

//onload function
//check if the user has choosen an element (and so if it is in the storage) to change cards
function CheckStorage(){
    //if the element is not in the storage 
    if(typeof(localStorage.cocktail) == "undefined"){
        //adding css opacity to the card (to the background image and to all elements of card)
        document.getElementById('cocktail_card').style.backgroundImage = 'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url("cocktail.jpg")';
        document.getElementById('cocktail_card').style.opacity='.5';
    } 
    else{
        //if the element is in the storage 
        //JSON.parse() method parses the string object in the storage and returns a JSON object
        var cocktail = JSON.parse(localStorage.cocktail);
        //changing background image of the card with the image of the choosen element (if it has an image)
        document.getElementById('cocktail_card').style.backgroundImage = `url("${cocktail.image}")`;
        //changing title of the card with the name of the choosen element
        document.getElementById('cocktail').innerHTML = `${cocktail.name}`;
    }

    //check element
    if(typeof(localStorage.board_game) == "undefined"){
        document.getElementById('game_card').style.backgroundImage = 'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url("game.jpg")';
        document.getElementById('game_card').style.opacity='.5';
    }
    else{
        var game = JSON.parse(localStorage.board_game);
        document.getElementById('game_card').style.backgroundImage = `url("${game.imageUrl}")`;
        document.getElementById('boardgame').innerHTML = `${game.name}`;
    }
    
    //check element
    if(typeof(localStorage.movie) == "undefined"){
        document.getElementById('movie_card').style.backgroundImage = 'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url("ciak.jpg")';
        document.getElementById('movie_card').style.opacity='.5';
    }
    else{
        var movie= JSON.parse(localStorage.movie);
        if(movie.playbill != null) document.getElementById('movie_card').style.backgroundImage = `url("${movie.playbill}")`;
        document.getElementById('movie').innerHTML = `${movie.title}`;
    } 

    //check element
    if(typeof(localStorage.beer) == "undefined" ){
        document.getElementById('beer_card').style.backgroundImage = 'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url("beer.jpg")';
        document.getElementById('beer_card').style.opacity='.5';
    }
    else{
        var beer= JSON.parse(localStorage.beer);
        if(beer.image != "Sorry, no picture provided for this beer") document.getElementById('beer_card').style.backgroundImage = `url("${beer.image}")`;
        document.getElementById('beer').innerHTML = `${beer.name}`;
    }

    //check element
    if(typeof(localStorage.meal) == "undefined"){
        document.getElementById('recipe_card').style.backgroundImage = 'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url("recipe.jpg")';
        document.getElementById('recipe_card').style.opacity='.5';
    } 
    else{
        var meal = JSON.parse(localStorage.meal);
        document.getElementById('recipe_card').style.backgroundImage = `url("${meal.image}")`;
        document.getElementById('meal').innerHTML = `${meal.name}`;
    }

    //check element
    if(typeof(localStorage.artist) == "undefined"){
        document.getElementById('music_card').style.backgroundImage = 'linear-gradient(rgba(255,255,255,.5), rgba(255,255,255,.5)), url("music.jpg")';
        document.getElementById('music_card').style.opacity='.5';
    }
    else{
        var music = JSON.parse(localStorage.artist);
        document.getElementById('music_card').style.backgroundImage = `url("${music.album_image}")`;
        document.getElementById('music').innerHTML = `${music.name}`;
    }

    //initialize global variable perfect_night with the perfect_night object in the storage
    perfect_night = JSON.parse(localStorage.perfect_night);
    //changing text in Category paragraph with the category choosen by user
    //querySelector method returns the first element that matches the specified CSS selector in the document
    document.querySelector('.paragraph_category').innerHTML = `${perfect_night.tag_type}`;
    //changing text in Description paragraph with the description written by user
    document.querySelector('.paragraph_description').innerHTML = `${perfect_night.description}`;

}

//onclick create night button
function CreateNight(){
    //prop JQuery methos is used to set disable property values of the button
    //this disable the button temporarily, in case the user clicks more times the button while this 
    //function is already running (only to be careful)
    $(".button2").prop("disabled",true);

    //deleting property from perfect night object 
    //bool_issolo will not be stored in database
    delete perfect_night.bool_issolo;
    var data;
    // AJAX XMLHttpRequest object
    var request = new XMLHttpRequest();
    //open method: Specifies the request
    //method: the request type GET or POST
    //url: the file location
    //async: true (asynchronous) or false (synchronous)
    request.open('POST', `https://pacific-stream-14038.herokuapp.com/perfectnight/${localStorage.username}`, true);
    //onload event handler property: load event occurs when an XMLHttpRequest transaction completes
    request.onload = function() {
        //readyState property: holds the status of the XMLHttpRequest == 4 request finished and response is ready
        //status property: holds the status of the XMLHttpRequest object
        //for us: 200->OK , 400->Error
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
            // Begin accessing JSON data here
            //parsing response
            var risposta = JSON.parse(this.response);
            //creating new item in storage
            localStorage.setItem("id_created_night", risposta.id); 
            //message for the user 
            alert("Perfect night created successfully");
            //redirect the page 
            window.location.href='FinalStep.html';
        }  
        else{
            //in case of bad transaction
            alert("Error creating night");
            $(".button2").prop("disabled",false);
        }
    }

    //serialize json object and send it to web server
    data = JSON.stringify(perfect_night); 
    // setRequestHeader(header, value) method adds HTTP headers to the request
    // header: specifies the header name
    // value: specifies the header value
    request.setRequestHeader("Content-type", "application/json");
    //send(string) method sends the request to the server (used for POST requests)
    request.send(data);
}

function logout(){
    var result = confirm("Are you sure you want to logout?");
      if (result) {
         localStorage.clear;
        alert("You are logging out! Bye!");
        window.location.href = "Home.html";  
      }
  }
  