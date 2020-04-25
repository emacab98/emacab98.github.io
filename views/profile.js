var username = localStorage.getItem("username");


$(document).ready(function(){
  var first_night = true;
  var first_saved = true;
  var first_upvoted = true;

    document.getElementById("username_here").innerHTML = username + "'s profile";
    $("#message").hide();
    document.getElementById('my_night').style.color = '#CC2A41';
    document.getElementById('message').innerHTML = 'Your nights will appear here!Start creating now';

    //Funzione che carica le notti dinamicamente
    function findNights(){
      $("#nights_section").show();
      $("#favourites_section").hide();
      $("#saved_section").hide();
      if (!first_night){
        $("#message").hide();
        return;
      }
      else{
        first_night = false;
        populatePost("nights_section", "created");
      
      }
    }
    
    function findSavedNights(){
        $("#nights_section").hide();
        $("#favourites_section").hide();
        $("#saved_section").show();
      if (!first_saved){
        $("#message").hide();
        return;
        }

      else{
        first_saved = false;
        populatePost("saved_section", "saved");
      
      }
    }
    

    //funzione che carica le notti preferite dinamicamente
    function findFavouriteNights(){
      $("#favourites_section").show();
      $("#saved_section").hide();
      $("#nights_section").hide();
      if (!first_upvoted){
        $("#message").hide();
        return;
        }
      else{
        first_upvoted = false;
        populatePost("favourites_section", "upvoted");
     } 
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
    });

});
  
function logout(){
  var result = confirm("Are you sure you want to logout?");
    if (result) {
       localStorage.clear;
      alert("You are logging out! Bye!");
      window.location.href = "Home.html";  
    }
}


function reply_click(){
  window.localStorage.setItem('night_id', this.name)
  //alert("id: " + this.name);
  window.location.href = "Post_profile.html";
}

//funzione che carica i post dinamicamente
function populatePost(section, mode){
      var nights = [];
      var request = new XMLHttpRequest();
     
      var path =  'https://pacific-stream-14038.herokuapp.com/perfectnight/myProfile/'+username+ "/" + mode;
      request.open('GET', path, true)
      request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
          var risposta = JSON.parse(this.response);
          //var risposta_str = JSON.stringify(this.response);

          if(risposta.length == 0){
            if(mode=="created") document.getElementById('message').innerHTML = 'Your nights will appear here! Start creating now!';
            else if(mode =="saved")  document.getElementById('message').innerHTML = 'Your saved nights will appear here! Browse some on the feed page!';
            else  document.getElementById('message').innerHTML = 'Your upvoted nights will appear here! Browse some on the feed page!';
            $("#message").show();
          }
          else{
            //alert("Ci sono delle notti!Codice da implementare");
            $("#message").hide();
            //alert("Risposta: " + risposta_str + "\nLunghezza: " + risposta.length);
            var nights_section = document.getElementById(section);
            var i;
            for(i=0; i<risposta.length; i++){
              nights[i] = risposta[i];
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

              var my_desc_title = document.createElement("p");
              my_desc_title.className = "my_title";
              my_desc_title.innerHTML = "Description: "
              var my_desc = document.createElement("span");
              my_desc.className = "my_elem";
              my_desc.innerHTML = risposta[i].description;
              my_desc_title.appendChild(my_desc);
            
              div_well.appendChild(my_desc_title);
              //alert("My desc created");

              var my_tag_title = document.createElement("p");
              my_tag_title.className = "my_title";
              my_tag_title.innerHTML = "Tag: "
              var my_tag = document.createElement("span");
              my_tag.className = "my_elem";
              my_tag.innerHTML = risposta[i].tag_type;
              my_tag_title.appendChild(my_tag);
              div_well.appendChild(my_tag_title);
              //alert("My tag created");

              var my_elements_title = document.createElement("p");
              my_elements_title.className="my_title";
              my_elements_title.innerHTML = "Elements: "
              div_well.appendChild(my_elements_title);
              //alert("Elements created");

              var list = document.createElement("div");
              list.className = "my_list";

              if (risposta[i].board_game != null){
                
                var container1 = document.createElement("container");
                container1.className = "elem1";
                var my_board_game = document.createElement("span");
                my_board_game.className = "my_elem";
                my_board_game.innerHTML = risposta[i].board_game.name;

                var my_board_game_img = document.createElement("img");
                my_board_game_img.className = "img-thumbnail";
                my_board_game_img.src = risposta[i].board_game.imageUrl;
                
                var br = document.createElement("br");
               
                container1.appendChild(my_board_game);
                container1.appendChild(br);
                container1.appendChild(my_board_game_img);
                list.appendChild(container1);

               
              }
              if (risposta[i].meal != null){
                //alert("pasto trovato");
                var container2 = document.createElement("container");
                container2.className = "elem2";

                var my_meal = document.createElement("span");
                my_meal.className = "my_elem";
                my_meal.innerHTML = risposta[i].meal.name;

                var br = document.createElement("br");
                var my_meal_img = document.createElement("img");
                my_meal_img.className = "img-thumbnail";
                my_meal_img.src = risposta[i].meal.image
               
                container2.appendChild(my_meal);
                container2.appendChild(br);
                container2.appendChild(my_meal_img);
                list.appendChild(container2);
                //alert("Pasto aggiunto");
              }
              
              if (risposta[i].cocktail!= null){
                var container3 = document.createElement("container");
                container3.className = "elem3";
                var my_cocktail = document.createElement("span");
                my_cocktail.className = "my_elem";
                my_cocktail.innerHTML = risposta[i].cocktail.name;

                var my_cocktail_img = document.createElement("img");
                my_cocktail_img.className = "img-thumbnail";
                my_cocktail_img.src = risposta[i].cocktail.image
                
                var br = document.createElement("br");
               
                container3.appendChild(my_cocktail);
                container3.appendChild(br);
                container3.appendChild(my_cocktail_img);
                list.appendChild(container3);
              } 

              
              if (risposta[i].beer.name != undefined){
                var container4 = document.createElement("container");
                container4.className = "elem4";
                var my_beer = document.createElement("span");
                my_beer.className = "my_elem";
                my_beer.innerHTML = risposta[i].beer.name;

                if(risposta[i].beer.image == "Sorry, no picture provided for this beer") {
                  var my_beer_img = document.createElement("img");
                  my_beer_img.className = "img-thumbnail";
                  my_beer_img.src = "jedi.png";

                  
                }
                else {
                  var my_beer_img = document.createElement("img");
                  my_beer_img.className = "img-thumbnail";
                  my_beer_img.src = risposta[i].beer.image; }
                
                
                var br = document.createElement("br");
               
                container4.appendChild(my_beer);
                container4.appendChild(br);
                container4.appendChild(my_beer_img);
                list.appendChild(container4);
              } 

              div_well.appendChild(list);

              var bottone = document.createElement("button");
              bottone.type = "button";
              bottone.className = "post_button";
              bottone.innerHTML = "More infos";
              bottone.name= risposta[i].id;
              bottone.onclick = reply_click;

              div_well.appendChild(bottone); 

              
              div_col.appendChild(div_well);
              //alert("Append 1 done");
              div_row.appendChild(div_col);
              //alert("Append 2 done");
              nights_section.appendChild(div_row);
              //alert("Append 3 done");

            
            }

            localStorage.setItem("nights", JSON.stringify(nights));
          }
       }

      else {
          alert("Something went wrong. Message: " + this.responseText);
          } 
      }
      request.send();  
    } 
    
