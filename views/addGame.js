var myObj;
var selected_game;
$(document).ready(function(){
    $("#select-btn").prop("disabled",true);
    $("#add-btn").prop("disabled",true);
    $('#right-column').hide();
});

function SearchByName(){
    document.getElementById("search_game_name_msg").innerHTML = "";
    var search_game_name =  document.getElementById('search_game_name').value;
    if(search_game_name == ""){
        document.getElementById("search_game_name_msg").innerHTML = "Please write a game name!";
        return;
    }
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/boardgame/byName/${search_game_name}/30`, true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400){
             // Begin accessing JSON data here*/
            document.getElementById("menu_game").innerHTML="";
            $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
            myObj = JSON.parse(request.response);
            if(myObj.length == 0){
                document.getElementById("search_game_name_msg").innerHTML = "Game not found! Please try again";
                return;
            }
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].name;
                if(s!= ""){
                    document.getElementById("menu_game").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            $("#select-btn").prop("disabled",false);
        }  
        else{
            document.getElementById("search_game_name_msg").innerHTML = "Game not found! Please try again";
        }
    }
    request.send();
}

function SelectGame(){
    var idx = document.getElementById("menu_game").options.selectedIndex;
    var item_selected = document.getElementById("menu_game").options.item(idx);
    if(item_selected.text==""){
        alert("Please select a game in the menu!");
    }
    else{
        var description_list = document.getElementById("description_list");
        var characteristics = document.getElementById("characteristics");
        description_list.innerHTML="";
        characteristics.innerHTML="";
        var j;
        for(j=0; j< myObj.length; j++){        
            if(myObj[j].name==item_selected.text){
                selected_game= myObj[j];
                $("#add-btn").prop("disabled",false);
                break;
            }
        }
        ///
        document.getElementById("photo_game").src= selected_game.imageUrl;
        
        description_list.innerHTML+= `<dt>Price</dt> <dd>- $${selected_game.price}</dd>`;
        description_list.innerHTML+= `<dt>Average rating</dt> <dd>- ${selected_game.averageRating}</dd>`;

        var minPlaytime = selected_game.minPlaytime;
        if(minPlaytime == null) characteristics.innerHTML+= `<dt>Minimum play time</dt> <dd>- not specified</dd>`;
        else characteristics.innerHTML+= `<dt>Minimum play time</dt> <dd>- ${minPlaytime} min</dd>`;

        var maxPlaytime = selected_game.maxPlaytime;
        if(maxPlaytime == null) characteristics.innerHTML+= `<dt>Maximum play time</dt> <dd>- not specified</dd>`;
        else characteristics.innerHTML+= `<dt>Maximum play time</dt> <dd>- ${maxPlaytime} min</dd>`;

        var minPlayers = selected_game.minPlayers;
        if(minPlayers == null) characteristics.innerHTML+= `<dt>Minimum players number</dt> <dd>- not specified</dd>`;
        else characteristics.innerHTML+= `<dt>Minimum players number</dt> <dd>- ${minPlayers}</dd>`;
        
        var maxPlayers = selected_game.maxPlayers;
        if(maxPlayers == null) characteristics.innerHTML+= `<dt>Maximum players number</dt> <dd>- not specified</dd>`;
        else characteristics.innerHTML+= `<dt>Maximum players number</dt> <dd>- ${maxPlayers}</dd>`;

        var minAge = selected_game.minAge;
        if(minAge == null) characteristics.innerHTML+= `<dt>Minimum age</dt> <dd>- not specified</dd>`;
        else characteristics.innerHTML+= `<dt>Minimum age</dt> <dd>- ${minAge} y.o.</dd>`;

        
        var description = new String(selected_game.description);
        if(description == "") document.getElementById("description").innerHTML= "No available description, sorry!";
        else document.getElementById("description").innerHTML= description;
        $('#right-column').show(100); 
        ///
        
    }
}

function RandomGame(){
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/boardgame/byRandom/20`, true);
    request.onload = function() {
    // Begin accessing JSON data here
        if (request.status >= 200 && request.status < 400){
            document.getElementById("menu_game").innerHTML="";
            myObj = JSON.parse(request.response);
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].name;
                if(s!= ""){
                    document.getElementById("menu_game").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            $("#select-btn").prop("disabled",false);  
        }  
    }
    request.send();
}

function AdvancedSearch(){
    var filterObj = {};
    document.getElementById("filters_msg").innerHTML ="";
    var play_time = document.getElementById('play_time').value;
    if(play_time!="" && parseInt(play_time)>= 0){
        filterObj.play_time = parseInt(play_time);
    }
    var players_num = document.getElementById('players_num').value;
    if(players_num!="" && parseInt(players_num)>= 0){
        filterObj.players_num = parseInt(players_num);
    }
    if((play_time =="" && players_num=="")|| parseInt(play_time)<0 ||  parseInt(players_num)<0){
        document.getElementById("filters_msg").innerHTML = "Please add a valid filter!";
        return;
    }
    var data;
    var request = new XMLHttpRequest();
    request.open('POST', `https://pacific-stream-14038.herokuapp.com/boardgame/byFilters/10`, true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400){
             // Begin accessing JSON data here
            document.getElementById("menu_game").innerHTML="";
            $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
            myObj = JSON.parse(request.response);
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].name;
                if(s!= ""){
                    document.getElementById("menu_game").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            $("#select-btn").prop("disabled",false);
        }  
        else{
            document.getElementById("filters_msg").innerHTML = "Game not found! Please try again";
        }
    }

    data = JSON.stringify(filterObj);    
    request.setRequestHeader("Content-type", "application/json");
    request.send(data);
}

function addGame(){
    localStorage.game=JSON.stringify(selected_game);
    
    var perfect_night = JSON.parse(localStorage.perfect_night);
    perfect_night.game = selected_game.id;
    localStorage.perfect_night = JSON.stringify(perfect_night);


    window.location.href='javascript:history.go(-1)';
}
