var myObj;
var selected_movie;
var ismovie;

$(document).ready(function(){
    $("#select-btn").prop("disabled",true);
    $("#add-btn").prop("disabled",true);
    $('#right-column').hide();
    //JQuery methods to make the toggle of the advanced search containers 
    //on click of the horizontal line 
    $('#movie_line').click(function(){
        $('#movie_container').toggle();
    });
    $('#tvshow_line').click(function(){
        $('#tvshow_container').toggle();
    });
});

/** SEARCH BY NAME FUNCTIONS */
//onclick search by name movie button
function SearchByNameMovie(){
    document.getElementById("search_movie_name_msg").innerHTML = "";
    var search_movie_name =  document.getElementById('search_movie_name').value;
    if(search_movie_name == ""){
        document.getElementById("search_movie_name_msg").innerHTML = "Please write a movie name!";
        return;
    }
    // AJAX XMLHttpRequest
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/media/multiple/movie/${search_movie_name}/10`, true);
    request.onload = function() {
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
             // Begin accessing JSON data here*/
            
            myObj = JSON.parse(request.response);
            if(myObj.length == 0){
                document.getElementById("search_movie_name_msg").innerHTML = "Movie not found! Please try again";
                return;
            }
            document.getElementById("menu_movie").innerHTML="";
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].title;
                if(s!= ""){
                    document.getElementById("menu_movie").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            ismovie = 1;
            $("#select-btn").prop("disabled",false);
        }  
        else{
            document.getElementById("search_movie_name_msg").innerHTML = "Movie not found! Please try again";
        }
    }
    request.send();
}

//onclick search by name tv show button
function SearchByNameTVShow(){
    document.getElementById("search_tvshow_name_msg").innerHTML = "";
    var search_movie_name =  document.getElementById('search_tvshow_name').value;
    if(search_movie_name == ""){
        document.getElementById("search_tvshow_name_msg").innerHTML = "Please write a TV Show name!";
        return;
    }
    // AJAX XMLHttpRequest
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/media/multiple/tv/${search_movie_name}/10`, true);
    request.onload = function() {
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
            // Begin accessing JSON data here*/
            myObj = JSON.parse(request.response);
            if(myObj.length == 0){
                document.getElementById("search_tvshow_name_msg").innerHTML = "TV Show not found! Please try again";
                return;
            }
            document.getElementById("menu_movie").innerHTML="";
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].title;
                if(s!= ""){
                    document.getElementById("menu_movie").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            ismovie = 0;
            $("#select-btn").prop("disabled",false);
        }  
        else{
            document.getElementById("search_tvshow_name_msg").innerHTML = "TV Show not found! Please try again";
        }
    }
    request.send();
}

/** END SEARCH BY NAME FUNCTIONS */

/** SELECT FUNCTION */
//onclick select button
function SelectMovie(){
    var idx = document.getElementById("menu_movie").options.selectedIndex;
    var item_selected = document.getElementById("menu_movie").options.item(idx);
    if(item_selected.text==""){
        alert("Please select a movie in the menu!");
    }
    else{
        var description_list = document.getElementById("description_list");
        var other_info = document.getElementById("other_info");
        other_info.innerHTML="";
        description_list.innerHTML="";
        var j;
        for(j=0; j< myObj.length; j++){  
            if(myObj[j].title==item_selected.text){
                selected_movie= myObj[j];
                $("#add-btn").prop("disabled",false);
                break;
            }
        }
        if(selected_movie.playbill == null){
            $('#photo_movie').hide();
        }
        else{            
            document.getElementById("photo_movie").src= selected_movie.playbill;
            $('#photo_movie').show();
        }
        description_list.innerHTML+= `<dt>Title</dt> <dd>${selected_movie.title}</dd>`;

        description_list.innerHTML+= `<dt>Genres</dt>`;
        var genres = selected_movie.genres;
        if(genres.length == 0) description_list.innerHTML+= `<dd>Not specified </dd>`;
        else{
            var string_genres = "";
            for(j=0; j< genres.length; j++){
                if(j == genres.length-1){
                    string_genres += `${genres[j]}`;
                }
                else{
                    string_genres += `${genres[j]}, `;
                }
            }
            description_list.innerHTML+= `<dd>${string_genres}</dd>`;
        }
        

        if(ismovie){
            description_list.innerHTML+= `<dt>Release date:</dt> <dd>${selected_movie.year}</dd>`;
        } 
        else{
            description_list.innerHTML+= `<dt>Release date:</dt> <dd>${selected_movie.firstAirDate}</dd>`;
        }        
        description_list.innerHTML+= `<dt>Popularity</dt> <dd>${selected_movie.popularity}</dd>`;
        description_list.innerHTML+= `<dt>Vote average</dt> <dd>${selected_movie.voteAverage}</dd>`;

        document.getElementById("plot").innerHTML = selected_movie.plot;
        other_info.innerHTML+= `<dt>Original language:</dt><dd>${selected_movie.languages}</dd>`; 
        if(selected_movie.where != ""){
            other_info.innerHTML+= `<dt>Link:</dt><dd><a href="${selected_movie.where}" target="_blank">
                                    ${selected_movie.where}</a></dd>`; 
        }            
        if(ismovie == 1){
            isMovie();         
        }
        else if(ismovie == 0){
            isTvShow();       
        } 
        else{
            if(selected_movie.mediaType == "movie") isMovie();
            else isTvShow();
        }
        
        
        var cast = selected_movie.cast;
        if(cast.length!=0){
            other_info.innerHTML+= `<dt>Cast:</dt>`;
            var string_cast = "";
            for(j=0; j< cast.length; j++){
                if(j == cast.length-1){
                    string_cast += `${cast[j]}`;
                }
                else{
                    string_cast += `${cast[j]}, `;
                }
            }
            other_info.innerHTML+= `<dd>${string_cast}</dd>`; 
        }       

        
        var country_prod = selected_movie.country_prod;
        if(country_prod.length != 0){
            other_info.innerHTML+= `<dt>Country of production:</dt>`;
            var string_country_prod = "";
            for(j=0; j< country_prod.length; j++){
                if(j == country_prod.length-1){
                    string_country_prod += `${country_prod[j]}`;
                }
                else{
                    string_country_prod += `${country_prod[j]}, `;
                }
            }
            other_info.innerHTML+= `<dd>${string_country_prod}</dd>`; 
        }        

        $('#right-column').show(100); 
        
    }
}

function isMovie(){
    var director = selected_movie.director;
    var other_info = document.getElementById("other_info");
    if(director.length != 0){
        other_info.innerHTML+= `<dt>Director :</dt>`;
        var string_director ="";
        for(j=0; j< director.length; j++){
            if(j == director.length -1){
                string_director += `${director[j]}`;
            }
            else{
                string_director += `${director[j]}, `;
            }
        }
        other_info.innerHTML+= `<dd>${string_director}</dd>`;
    } 
}

function isTvShow(){
    var creators = selected_movie.creators;
    var other_info = document.getElementById("other_info");
    if(creators.length != 0){
        other_info.innerHTML+= `<dt>Creators :</dt>`;
        var string_creators ="";
        for(j=0; j< creators.length; j++){
            if(j == creators.length -1){
                string_creators += `${creators[j]}`;
            }
            else{
                string_creators += `${creators[j]}, `;
            }
        }
        other_info.innerHTML+= `<dd>${string_creators}</dd>`;
    }
                
    var writers = selected_movie.writers;
    if(writers.length != 0){
        other_info.innerHTML+= `<dt>Writers :</dt>`; 
        var string_writers ="";
        for(j=0; j< writers.length; j++){
            if(j == writers.length -1){
                string_writers += `${writers[j]}`;
            }
            else{
                string_writers += `${writers[j]}, `;
            }
        }
        other_info.innerHTML+= `<dd>${string_writers}</dd>`;
    }
}
/** END SELECT FUNCTION */

/** AdvancedSearchCategory*/
//Movie
function AdvancedSearchCategoryMovie(){
    document.getElementById("filters_msg_category_movie").innerHTML = "";
    var category_name =  document.getElementById('menu_category_movie').value;
    if(category_name == ""){
        document.getElementById("filters_msg_category_movie").innerHTML = "Please select a category!";
        return;
    }

    // AJAX XMLHttpRequest
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/media/movie/byCategory/${category_name}/19`, true);
    request.onload = function() {
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
            // Begin accessing JSON data here
            
            myObj = JSON.parse(request.response);
            if(myObj.length == 0){
                document.getElementById("filters_msg_category_movie").innerHTML = "Category temporarily unavailable.";
                return;
            }
            document.getElementById("menu_movie").innerHTML="";
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].title;
                if(s!= ""){
                    document.getElementById("menu_movie").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            ismovie = 1;
            $("#select-btn").prop("disabled",false);
        }  
        else{
            document.getElementById("filters_msg_category_movie").innerHTML = "Category temporarily unavailable.";
        }
    }

    request.send();
}

//TVShow
function AdvancedSearchCategoryTVShow(){
    document.getElementById("filters_msg_category_tvshow").innerHTML = "";
    var category_name =  document.getElementById('menu_category_tvshow').value;
    if(category_name == ""){
        document.getElementById("filters_msg_category_tvshow").innerHTML = "Please select a category!";
        return;
    }

    // AJAX XMLHttpRequest
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/media/tv/byCategory/${category_name}/19`, true);
    request.onload = function() {
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
             // Begin accessing JSON data here
            
            myObj = JSON.parse(request.response);
            if(myObj.length == 0){
                document.getElementById("filters_msg_category_tvshow").innerHTML = "Category temporarily unavailable.";
                return;
            }
            document.getElementById("menu_movie").innerHTML="";
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].title;
                if(s!= ""){
                    document.getElementById("menu_movie").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            ismovie = 0;
            $("#select-btn").prop("disabled",false);
        }  
        else{
            document.getElementById("filters_msg_category_tvshow").innerHTML = "Category temporarily unavailable.";
        }
    }

    request.send();
}

/** END AdvancedSearchCategory*/

/** AdvancedSearchYear*/
//Movie
function AdvancedSearchYearMovie(){
    document.getElementById("filters_msg_year_movie").innerHTML = "";
    var year =  document.getElementById('input_year_movie').value;
    if(year == "" || isNaN(year)|| year<1895){
        document.getElementById("filters_msg_year_movie").innerHTML = "Please type a valid year!";
        return;
    }

    // AJAX XMLHttpRequest
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/media/movie/byYear/${year}/19`, true);
    request.onload = function() {
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
             // Begin accessing JSON data here
            
            myObj = JSON.parse(request.response);
            if(myObj.length == 0){
                document.getElementById("filters_msg_year_movie").innerHTML = "No result for this year.";
                return;
            }
            document.getElementById("menu_movie").innerHTML="";
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].title;
                if(s!= ""){
                    document.getElementById("menu_movie").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            ismovie = 1;
            $("#select-btn").prop("disabled",false);
        }  
        else{
            document.getElementById("filters_msg_year_movie").innerHTML = "No result for this year.";
        }
    }

    request.send();
}


//Tv Show
function AdvancedSearchYearTVShow(){
    document.getElementById("filters_msg_year_tvshow").innerHTML = "";
    var year =  document.getElementById('input_year_tvshow').value;
    if(year == "" || isNaN(year)|| year<1895){
        document.getElementById("filters_msg_year_tvshow").innerHTML = "Please type a valid year!";
        return;
    }

    // AJAX XMLHttpRequest
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/media/tv/byYear/${year}/19`, true);
    request.onload = function() {
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
            // Begin accessing JSON data here
            
            myObj = JSON.parse(request.response);
            if(myObj.length == 0){
                document.getElementById("filters_msg_year_tvshow").innerHTML = "No result for this year.";
                return;
            }
            document.getElementById("menu_movie").innerHTML="";
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].title;
                if(s!= ""){
                    document.getElementById("menu_movie").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            ismovie = 0;
            $("#select-btn").prop("disabled",false);
        }  
        else{
            document.getElementById("filters_msg_year_tvshow").innerHTML = "No result for this year.";
        }
    }

    request.send();
}
/***END AdvancedSearchYear */


/** SearchByPerson*/
function SearchByPerson(){
    document.getElementById("search_artist_name_msg").innerHTML = "";
    var artist_name =  document.getElementById('search_artist_name').value;
    if(artist_name == ""){
        document.getElementById("search_artist_name_msg").innerHTML = "Please write an artist name!";
        return;
    }

    // AJAX XMLHttpRequest
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/media/byPerson/${artist_name}`, true);
    request.onload = function() {
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
             // Begin accessing JSON data here
            
            var artist = JSON.parse(request.response);
            if(artist.length == 0){
                document.getElementById("search_artist_name_msg").innerHTML = "No result for this artist.";
                return;
            }

            myObj = artist.knownFor;
            if(myObj.length == 0){
                document.getElementById("search_artist_name_msg").innerHTML = "No result for this artist.";
                return;
            }
            document.getElementById("menu_movie").innerHTML="";
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].title;
                if(s!= ""){
                    document.getElementById("menu_movie").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            ismovie = 2;
            $("#select-btn").prop("disabled",false);
        }  
        else{
            document.getElementById("search_artist_name_msg").innerHTML = "No result for this artist.";
        }
    }

    request.send();
}
/***END SearchByPerson**/


//onclick add button
function addMovie(){
    localStorage.movie=JSON.stringify(selected_movie);
    
    var perfect_night = JSON.parse(localStorage.perfect_night);
    var bool_issolo = perfect_night.bool_issolo;
    perfect_night.movie_tvSeries = `${selected_movie.id}`;
    if(ismovie) perfect_night.movie_tvSeries += `m`;
    else perfect_night.movie_tvSeries += `t`;

    localStorage.perfect_night = JSON.stringify(perfect_night);


    if(bool_issolo){        
        window.location.href='addElementSolo.html';
    }
    else{        
        window.location.href='addElementCompany.html';
    }
}