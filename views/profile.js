var username = localStorage.getItem("username");


$(document).ready(function(){
  var changed = true;

    document.getElementById("username_here").innerHTML = username + "'s profile";
    $("#message").hide();
    document.getElementById('my_night').style.color = '#CC2A41';
    document.getElementById('message').innerHTML = 'Your nights will appear here!Start creating now';

    //Funzione che carica le notti dinamicamente
    function findNights(){
      //$("#nights_section").html("");
      $("#nights_section").show();
      if (!changed){
        $("#message").hide();
        return;
      }
      else{
       
        changed = false;
      var request = new XMLHttpRequest();
     
      var path =  'https://pacific-stream-14038.herokuapp.com/created/'+username ;
      //alert("Path: " + path);
      request.open('GET', path, true)
      request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
          var risposta = JSON.parse(this.response);
          var risposta_str = JSON.stringify(this.response);

          if(risposta.length == 0){
            document.getElementById('message').innerHTML = 'Your nights will appear here! Start creating now!';
            $("#message").show();
          }
          else{
            //alert("Ci sono delle notti!Codice da implementare");
            $("#message").hide();
            //alert("Risposta: " + risposta_str + "\nLunghezza: " + risposta.length);
            var nights_section = document.getElementById("nights_section");
            var i;
            for(i=0; i<risposta.length; i++){
              //alert("Notte: " + i);
              var div_row = document.createElement("div");
              div_row.className = "row";
              //alert("Row created");

              var div_col = document.createElement("div");
              div_col.className = "col-sm-11";
              //alert("Col created");

              var div_well = document.createElement("div");
              div_well.className = "well";
              //alert("Well created");

              var my_desc = document.createElement("p");
              my_desc.className = "my_desc";
      
              my_desc.innerHTML = risposta[i].description;
            
              div_well.appendChild(my_desc);
              //alert("My desc created");

              var my_tag = document.createElement("p");
              my_tag.className = "my_tag";
              my_tag.innerHTML = risposta[i].tag_type;
              div_well.appendChild(my_tag);
              //alert("My tag created");


              if (risposta[i].board_game != null){
               
                var my_board_game = document.createElement("p");
                my_board_game.className = "my_elem";
                my_board_game.innerHTML = "My boardgame";
                div_well.appendChild(my_board_game);
               
              }
              if (risposta[i].meal != null){
                //alert("pasto trovato");
                var my_meal = document.createElement("p");
                my_meal.className = "my_elem";
                my_meal.innerHTML = "My meal";
                div_well.appendChild(my_meal);
                //alert("Pasto aggiunto");
              }
              if (risposta[i].artist != null){
                //alert("Artista trovato");
                var my_artist = document.createElement("p");
                my_artist.className = "my_elem";
                my_artist.innerHTML = "My artist";
                div_well.appendChild(my_artist);
                //alert("Artista aggiunto");
              }
              if (risposta[i].movie_tvSeries != null){
                //alert("Serie tv trovata");
                var my_movie_tvSeries = document.createElement("p");
                my_movie_tvSeries.className = "my_elem";
                my_movie_tvSeries.innerHTML = "My movie";
                div_well.appendChild(my_movie_tvSeries);
                //alert("Serie tv aggiunta");
              }
              if (risposta[i].cocktail!= null){
                var my_cocktail = document.createElement("p");
                my_cocktail.className = "my_elem";
                my_cocktail.innerHTML = "My cocktail";
                div_well.appendChild(my_cocktail);
              } 

              var bottone = document.createElement("button");
              bottone.type = "button";
              bottone.className = "post_button";
              bottone.innerHTML = "More infos"
              div_well.appendChild(bottone); 

              
              div_col.appendChild(div_well);
              //alert("Append 1 done");
              div_row.appendChild(div_col);
              //alert("Append 2 done");
              nights_section.appendChild(div_row);
              //alert("Append 3 done");

            
            }

          }
       }

      else {
          alert("Something went wrong. Message: " + this.responseText);
          } 
      }
      request.send();  
    } 
    }
    

    //funzione che carica le notti salvate dinamicamente
    function findSavedNights(){
      $("#nights_section").hide();
     
      var request = new XMLHttpRequest();
      var path =  'https://pacific-stream-14038.herokuapp.com/saved/'+username ;
      request.open('GET', path, true)
      request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
          var risposta = JSON.parse(this.response);
          if(risposta.length == 0){
            document.getElementById('message').innerHTML = 'Your saved nights will appear here! Browse some nights on the feed page!';
            $("#message").show();
          }
          else{
            alert("Ci sono delle notti!Codice da implementare")

          }
      }

      else {
          alert("Something went wrong");
          } 
      }
      request.send();   
    }
    

    //funzione che carica le notti preferite dinamicamente
    function findFavouriteNights(){
      $("#nights_section").hide();
      var request = new XMLHttpRequest();
      var path =  'https://pacific-stream-14038.herokuapp.com/upvoted/'+username ;
      request.open('GET', path, true)
      request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
          var risposta = JSON.parse(this.response);
          if(risposta.length == 0){
            document.getElementById('message').innerHTML = 'Your favourites nights will appear here! Browse some nights on the feed page!';
            $("#message").show();
          }
          else{
            alert("Ci sono delle notti! Codice da implementare")

          }
      }

      else {
          alert("Something went wrong");
          } 
      }
      request.send();   
    }

    findNights();

    $("#my_night").click(function(){

      document.getElementById('my_night').style.color = '#CC2A41';
      document.getElementById('my_saved').style.color = '#424254';
      document.getElementById('my_favourite').style.color ='#424254';
      findNights();
    });

    //my_saved
    $("#my_saved").click(function(){

      document.getElementById('my_saved').style.color = '#CC2A41';
      document.getElementById('my_night').style.color = '#424254';
      document.getElementById('my_favourite').style.color ='#424254';
      findSavedNights();
    });
   
    //my_favourites
    $("#my_favourite").click( function(){

      document.getElementById('my_favourite').style.color = '#CC2A41';
      document.getElementById('my_night').style.color = '#424254';
      document.getElementById('my_saved').style.color = '#424254';
      findFavouriteNights();
    })

});
  
function logout(){
  var result = confirm("Are you sure you want to logout?");
    if (result) {
      alert("You are logging out! Bye!");
      window.location.href = "./home.html";  
    }
}

