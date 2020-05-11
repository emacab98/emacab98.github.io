var myObj;
var selected_music;

//Token for adv search
var access_token = "";

//Aggiunta funzione ana 
function sendData(){
    //alert("Sending data");
    var params = (new URL(document.location)).searchParams;
    let code = params.get('code'); 
    let state=  params.get('state'); 
    //alert("Code: " + code);
    //alert("State: "+ state);
    
    var request = new XMLHttpRequest();
    var path = 'https://pacific-stream-14038.herokuapp.com/music/callback?code=' + code + '&state=' + state
    //alert("Path: " + path);
    request.open('GET', path, true)
    request.onload = function() {
    
    if (request.readyState == 4 && request.status >= 200 && request.status < 400) {
        var risposta = JSON.parse(this.response);
        access_token = risposta.access_token;
        //alert("Access token nella risposta: " + risposta.access_token);
        //alert("Access token nella variabile: " + access_token);
    } 
    else {
        alert("Something went wrong!");
    } 
}

request.send();
}
//end sendData()

$(document).ready(function(){
    sendData(); /*add comment on develop*/ 
    $("#select-btn").prop("disabled",true);
    $("#add-btn").prop("disabled",true);
    $("#save_song_btn").prop("disabled",true);
    $('#right-column').hide();

});



//ana
/*function RandomMusic(){
   
    //alert("Access token: " + access_token);
    var request = new XMLHttpRequest();
    request.open('GET', 'https://pacific-stream-14038.herokuapp.com/music/savedTracks/' + access_token, true);
    request.onload = function() {
    // Begin accessing JSON data here
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
            var risposta = JSON.parse(this.response);

            alert("Risposta: " + JSON.stringify(risposta));
        }  
        else{
            alert("Something went wrong");
        }
    }
    request.send();
}*/
//ana



/**********************************************************************/


function SearchByName(){
    document.getElementById("search_music_name_msg").innerHTML = "";
    var search_music_name =  document.getElementById('search_music_name').value;
    if(search_music_name == ""){
        document.getElementById("search_music_name_msg").innerHTML = "Please write a music name!";
        return;
    }
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/music/byTitle/${search_music_name}`, true);
    request.onload = function() {
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
             // Begin accessing JSON data here*/
            document.getElementById("menu_music").innerHTML="";
            myObj = JSON.parse(request.response);
            if(myObj.length == 0){
                document.getElementById("search_music_name_msg").innerHTML = "Music not found! Please try again";
                return;
            }
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].name;
                if(s!= ""){
                    document.getElementById("menu_music").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            $("#select-btn").prop("disabled",false);            
            $("#save_song_btn").prop("disabled",false);
        }  
        else{
            document.getElementById("search_music_name_msg").innerHTML = "Music not found! Please try again";
        }
    }
    request.send();
}

/** SELECT MUSIC */
function SelectMusic(){
    var idx = document.getElementById("menu_music").options.selectedIndex;
    var item_selected = document.getElementById("menu_music").options.item(idx);
    //alert(item_selected.text);
    if(item_selected.text==""){
        alert("Please select a music in the menu!");
    }
    else{
        var description_list = document.getElementById("description_list");
        var music_container = document.getElementById("music_container");
        music_container.innerHTML="";
        description_list.innerHTML="";
        var j;
        for(j=0; j< myObj.length; j++){ 
            //alert(myObj[j].name);     
            if(myObj[j].name==item_selected.text){
                selected_music= myObj[j];
                $("#add-btn").prop("disabled",false);
                break;
            }
        }
        //alert(JSON.stringify(selected_music));
        document.getElementById("photo_music").src= selected_music.album_image;
        var artist = selected_music.artists;
        description_list.innerHTML+= `<dt>Artist:</dt> <dd> `;
        for(j=0; j< artist.length; j++){
            if(j == artist.length-1){
                description_list.innerHTML+= `${artist[j]}</dd>`;
            }
            else{
                description_list.innerHTML+= `${artist[j]}, `;
            }
        }
        description_list.innerHTML+= `<dt>Name</dt> <dd> ${selected_music.name}</dd>`;
        description_list.innerHTML+= `<dt>Release date</dt> <dd> ${selected_music.release_date}</dd>`;
        //description_list.innerHTML+= `<dt>Popularity</dt> <dd> ${selected_music.popularity}</dd>`;

        //alert(selected_music.id);
        if(typeof(selected_music.tracks) !== "undefined"){
            //this is an album
            music_container.innerHTML += "<h4>Other info: </h4>";
            music_container.innerHTML += `<dl>`;
            music_container.innerHTML += `<dt>Label</dt> <dd> ${selected_music.label}</dd>`;
            music_container.innerHTML+= `<dt>Popularity</dt> <dd> ${selected_music.popularity}%</dd>`;
            var tracks = selected_music.tracks;
            music_container.innerHTML += `<dt>Tracks</dt>`;
            for(j=0; j< tracks.length; j++){
                music_container.innerHTML += `<dd>${tracks[j]}</dd>`;
            }
            music_container.innerHTML += `</dl>`;
        }
        else{
            //this is a song
            music_container.innerHTML += "<h4>Song preview: </h4>";
            if(selected_music.preview_url == null) music_container.innerHTML += "<p >Sorry, preview not available for this song! </p>";
            music_container.innerHTML += `<audio controls controlsList="nodownload"><source src="${selected_music.preview_url}" type="audio/mpeg">
            Your browser does not support the audio element.</audio>`;
        }       
        
        $('#right-column').show(100);    
        
    }
}
/** END - SELECT MUSIC */


/** ADV SEARCH*/
function AdvancedSearchAlbum(){
    document.getElementById("filters_msg_album").innerHTML = "";
    var search_music_name =  document.getElementById('album').value;
    if(search_music_name == ""){
        document.getElementById("filters_msg_album").innerHTML = "Please type an album!";
        return;
    }

    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/music/album/byName/${search_music_name}`, true);
    request.onload = function() {
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
             // Begin accessing JSON data here
            document.getElementById("menu_music").innerHTML="";
            myObj = JSON.parse(request.response);
            if(myObj.length == 0){
                document.getElementById("filters_msg_album").innerHTML = "Album not found! Please try again";
                return;
            }
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].name;
                if(s!= ""){
                    document.getElementById("menu_music").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            $("#select-btn").prop("disabled",false);
            $("#save_song_btn").prop("disabled",true);
        }  
        else{
            document.getElementById("filters_msg_album").innerHTML = "Album temporarily unavailable.";
        }
    }

    request.send();
}

function AdvancedSearchAlbumsArtist(){
    document.getElementById("filters_msg_artist").innerHTML = "";
    var search_music_name =  document.getElementById('artist').value;
    if(search_music_name == ""){
        document.getElementById("filters_msg_artist").innerHTML = "Please type an artist!";
        return;
    }

    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/music/album/byArtist/${search_music_name}`, true);
    request.onload = function() {
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
             // Begin accessing JSON data here
            document.getElementById("menu_music").innerHTML="";
            myObj = JSON.parse(request.response);
            if(myObj.length == 0){
                document.getElementById("filters_msg_artist").innerHTML = "Album not found! Please try again";
                return;
            }
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].name;
                if(s!= ""){
                    document.getElementById("menu_music").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            $("#select-btn").prop("disabled",false);
            $("#save_song_btn").prop("disabled",true);
        }  
        else{
            document.getElementById("filters_msg_artist").innerHTML = "Albums temporarily unavailable.";
        }
    }

    request.send();
}


function AdvancedSearchSongsArtist(){
    document.getElementById("filters_msg_artist").innerHTML = "";
    var search_music_name =  document.getElementById('artist').value;
    if(search_music_name == ""){
        document.getElementById("filters_msg_artist").innerHTML = "Please type an artist!";
        return;
    }

    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/music/byArtist/${search_music_name}`, true);
    request.onload = function() {
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
             // Begin accessing JSON data here
            document.getElementById("menu_music").innerHTML="";
            myObj = JSON.parse(request.response);
            if(myObj.length == 0){
                document.getElementById("filters_msg_artist").innerHTML = "Music not found! Please try again";
                return;
            }
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].name;
                if(s!= ""){
                    document.getElementById("menu_music").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            $("#select-btn").prop("disabled",false);            
            $("#save_song_btn").prop("disabled",false);
        }  
        else{
            document.getElementById("filters_msg_artist").innerHTML = "Songs temporarily unavailable.";
        }
    }

    request.send();
}
/** END - ADV SEARCH*/

/** GET SAVED MUSIC */
function GetSavedMusic(){
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/music/savedTracks/${access_token}`, true);
    request.onload = function() {
        // Begin accessing JSON data here
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
            // Begin accessing JSON data here*/
           document.getElementById("menu_music").innerHTML="";
           myObj = JSON.parse(request.response);
            if(myObj.length == 0){
                alert("You don't have saved music in your account!")
                return;
            }
           var s;
           for(var i=0; i< myObj.length; i++){
               s = myObj[i].name;
               if(s!= ""){
                   document.getElementById("menu_music").innerHTML +=  `<option value=${s}> ${s}</option>`;
               }
           }
           $("#select-btn").prop("disabled",false);
           $("#save_song_btn").prop("disabled",false);
        }  
        else{
            alert("You don't have saved music in your account!")
        }
        
    }
    request.send();
}
/** END - GET SAVED MUSIC */

/** SAVE MUSIC */
function SaveMusic(){
    var idx = document.getElementById("menu_music").options.selectedIndex;
    var item_selected = document.getElementById("menu_music").options.item(idx);
    document.getElementById("save_song_msg").innerHTML = "";
    if(item_selected.text==""){
        alert("Please select a music in the menu!");
    }
    else{
        if(typeof(selected_music.tracks) == "undefined"){
            //this is a song
            var j;
            for(j=0; j< myObj.length; j++){     
                if(myObj[j].name==item_selected.text){
                    selected_music= myObj[j];
                    $("#add-btn").prop("disabled",false);
                    break;
                }
            }

            /** SERVER */
            var request = new XMLHttpRequest();
            request.open('POST', `https://pacific-stream-14038.herokuapp.com/music/savedTracks/${access_token}/${selected_music.id}`, true);
            request.onload = function() {
                // Begin accessing JSON data here
                if (!(request.readyState == 4 && request.status >= 200 && request.status < 400)){
                    document.getElementById("save_song_msg").innerHTML = "Something went wrong";
                }              
            }
            request.send();

            /**DOCUMENT*/
            var description_list = document.getElementById("description_list");
            var music_container = document.getElementById("music_container");
            music_container.innerHTML="";
            description_list.innerHTML="";
            
            //alert(JSON.stringify(selected_music));
            document.getElementById("photo_music").src= selected_music.album_image;
            var artist = selected_music.artists;
            description_list.innerHTML+= `<dt>Artist:</dt> <dd> `;
            for(j=0; j< artist.length; j++){
                if(j == artist.length-1){
                    description_list.innerHTML+= `${artist[j]}</dd>`;
                }
                else{
                    description_list.innerHTML+= `${artist[j]}, `;
                }
            }
            description_list.innerHTML+= `<dt>Name</dt> <dd> ${selected_music.name}</dd>`;
            description_list.innerHTML+= `<dt>Release date</dt> <dd> ${selected_music.release_date}</dd>`;
            //description_list.innerHTML+= `<dt>Popularity</dt> <dd> ${selected_music.popularity}</dd>`;

            //alert(selected_music.id);
            /*if(typeof(selected_music.tracks) !== "undefined"){
                //this is an album
                music_container.innerHTML += "<h4>Other info: </h4>";
                music_container.innerHTML += `<dl><dt>Label</dt> <dd> ${selected_music.label}</dd>`;
                var tracks = selected_music.tracks;
                music_container.innerHTML += `<dt>Tracks</dt>`;
                for(j=0; j< tracks.length; j++){
                    music_container.innerHTML += `<dd>${tracks[j]}</dd>`;
                }
                music_container.innerHTML += `</dl>`;
            }
            else{*/
                //this is a song
            music_container.innerHTML += "<h4>Song preview: </h4>";
            music_container.innerHTML += `<audio controls controlsList="nodownload"><source src="${selected_music.preview_url}" type="audio/mpeg">
            Your browser does not support the audio element.</audio>`;

            //}          
            
            $('#right-column').show(100); 
        }
        else{
            document.getElementById("save_song_msg").innerHTML = "You have selected an album: can't save it!"
        }
    }
}

/** END - SAVE MUSIC */


/** ADD MUSIC */
function addMusic(){
    localStorage.music=JSON.stringify(selected_music);
    alert(localStorage.music);
    var perfect_night = JSON.parse(localStorage.perfect_night);
    perfect_night.artist = selected_music.id;
    localStorage.perfect_night = JSON.stringify(perfect_night);
    alert(localStorage.perfect_night);
    alert(perfect_night.bool_issolo);
    return;
    if(perfect_night.bool_issolo) window.location.href='addElementSolo.html';
    else window.location.href='addElementCompany.html';
}
/** END - ADD MUSIC */