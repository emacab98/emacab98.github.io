var myObj;
var selected_movie;
var ismovie;
$(document).ready(function(){
    $("#select-btn").prop("disabled",true);
    $("#add-btn").prop("disabled",true);
    $('#right-column').hide();
    $('#movie_line').click(function(){
        $('#movie_container').toggle();
    });
    $('#tvshow_line').click(function(){
        $('#tvshow_container').toggle();
    });
});

/** SEARCH BY NAME FUNCTIONS */

function SearchByNameMovie(){
    document.getElementById("search_movie_name_msg").innerHTML = "";
    var search_movie_name =  document.getElementById('search_movie_name').value;
    if(search_movie_name == ""){
        document.getElementById("search_movie_name_msg").innerHTML = "Please write a movie name!";
        return;
    }
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
            ismovie = true;
            $("#select-btn").prop("disabled",false);
        }  
        else{
            document.getElementById("search_movie_name_msg").innerHTML = "Movie not found! Please try again";
        }
    }
    request.send();
}

function SearchByNameTVShow(){
    document.getElementById("search_tvshow_name_msg").innerHTML = "";
    var search_movie_name =  document.getElementById('search_tvshow_name').value;
    if(search_movie_name == ""){
        document.getElementById("search_tvshow_name_msg").innerHTML = "Please write a TV Show name!";
        return;
    }
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
            ismovie = false;
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
function SelectMovie(){
    var idx = document.getElementById("menu_movie").options.selectedIndex;
    var item_selected = document.getElementById("menu_movie").options.item(idx);
    //alert(item_selected.text);
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
            //alert(myObj[j].name);     
            if(myObj[j].title==item_selected.text){
                selected_movie= myObj[j];
                $("#add-btn").prop("disabled",false);
                break;
            }
        }
        //alert(JSON.stringify(selected_movie));
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
            //if(selected_movie.year != "")
                description_list.innerHTML+= `<dt>Release date:</dt> <dd>${selected_movie.year}</dd>`;
        } 
        else{
            //if(selected_movie.firstAirDate != "")
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
        if(ismovie){             
            var director = selected_movie.director;
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
        else{             
            var creators = selected_movie.creators;
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
        $('#down_container').hide();
        $('#up_container').show();    
        
    }
}
/** END SELECT FUNCTION */

/** AdvancedSearchCategory*/
function AdvancedSearchCategoryMovie(){
    document.getElementById("filters_msg_category_movie").innerHTML = "";
    var category_name =  document.getElementById('menu_category_movie').value;
    if(category_name == ""){
        document.getElementById("filters_msg_category_movie").innerHTML = "Please select a category!";
        return;
    }

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
            ismovie = true;
            $("#select-btn").prop("disabled",false);
        }  
        else{
            document.getElementById("filters_msg_category_movie").innerHTML = "Category temporarily unavailable.";
        }
    }

    request.send();
}
/*****/
function AdvancedSearchCategoryTVShow(){
    document.getElementById("filters_msg_category_tvshow").innerHTML = "";
    var category_name =  document.getElementById('menu_category_tvshow').value;
    if(category_name == ""){
        document.getElementById("filters_msg_category_tvshow").innerHTML = "Please select a category!";
        return;
    }

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
            ismovie = false;
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
function AdvancedSearchYearMovie(){
    document.getElementById("filters_msg_year_movie").innerHTML = "";
    var year =  document.getElementById('input_year_movie').value;
    if(year == "" || isNaN(year)|| year<1895){
        document.getElementById("filters_msg_year_movie").innerHTML = "Please type a valid year!";
        return;
    }

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
            ismovie = true;
            $("#select-btn").prop("disabled",false);
        }  
        else{
            document.getElementById("filters_msg_year_movie").innerHTML = "No result for this year.";
        }
    }

    request.send();
}
/*****/

function AdvancedSearchYearTVShow(){
    document.getElementById("filters_msg_year_tvshow").innerHTML = "";
    var year =  document.getElementById('input_year_tvshow').value;
    if(year == "" || isNaN(year)|| year<1895){
        document.getElementById("filters_msg_year_tvshow").innerHTML = "Please type a valid year!";
        return;
    }

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
            ismovie = false;
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
            $("#select-btn").prop("disabled",true);
            $("#add-btn").prop("disabled",true);
            $('#photo_movie').hide();
            document.getElementById("menu_movie").innerHTML =  `<option selected value=""> Choose your movie :) </option>`;
            
            var description_list = document.getElementById("description_list");
            description_list.innerHTML ="";
            description_list.innerHTML+= `<dt>Name:</dt> <dd>${artist.name}</dd>`;
            description_list.innerHTML+= `<dt>Role:</dt> <dd>${artist.knownForDepartment}</dd>`;
            description_list.innerHTML+= `<dt>Popularity:</dt> <dd>${artist.popularity}</dd>`;
            
            var down_container = document.getElementById("down_container");
            var works = artist.knownFor;
            if(works.length == 0){
                down_container.innerHTML = `<h4> Works:</h4><p>Sorry, there aren't works linked with this artist.</p>`;
            }
            else{
                down_container.innerHTML = "";
                for(var j=0; j<works.length; j++){
                    var id= `inner${j}`;
                    down_container.innerHTML += `
                    <h4> Works:</h4>
                    <dl id="${id}">
                        <dt>Title:</dt><dd>${works[j].title}</dd>
                        <dt>Type:</dt><dd>${works[j].mediaType}</dd>
                        <dt>Plot:</dt><dd>${works[j].plot}</dd>
                        <dt>Genres:</dt>
                    </dl><hr style="border-top: 1px solid #424254;">`;

                    //description_list.innerHTML+= `<dt>Genres</dt>`;
                    var genres = works[j].genres;
                    if(genres.length == 0) document.getElementById(id).innerHTML+= `<dd>Not specified </dd>`;
                    else{
                        var string_genres = "";
                        for(var i=0; i< genres.length; i++){
                            if(i == genres.length-1){
                                string_genres += `${genres[i]}`;
                            }
                            else{
                                string_genres += `${genres[i]}, `;
                            }
                        }
                        document.getElementById(id).innerHTML+=`<dd>${string_genres}</dd>`;
                    }
                }
            }

            $('#right-column').show();
            $('#up_container').hide();
            $('#down_container').show();
        }  
        else{
            document.getElementById("search_artist_name_msg").innerHTML = "No result for this artist.";
        }
    }

    request.send();
}
/***END SearchByPerson**/


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