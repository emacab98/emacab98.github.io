var username = localStorage.getItem("username");


$(document).ready(async function(){
  await Promise.all([
    findUpvotedNights().catch(()=>{alert("Could not load upvoted nights!"); return}),
     findSavedNights().catch(()=>{alert("Could not load saved nights!"); return})
  ])

    saved = JSON.parse(localStorage.getItem("saved_nights"));
    upvoted = JSON.parse(localStorage.getItem("upvoted_nights"));

    var nights = [];
    var request = new XMLHttpRequest();
    var path =  'https://pacific-stream-14038.herokuapp.com/perfectnight/feed/fillRandom';
    request.open('GET', path, true)
    request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        var risposta = JSON.parse(this.response);
        //var risposta_str = JSON.stringify(this.response);

        if(risposta.length == 0){
          if(mode=="created") document.getElementById('message').innerHTML = 'Created nights will appear here! Start creating now!';
          $("#message").show();
        }
        else{
          $("#message").hide();
          var nights_section = document.getElementById("posts");
          var index = 0;
          var risposta_len = risposta.length;

          for(index=0; index<risposta_len; index++){
            //alert("Index: " + index);
            var checked_saved = false;
            var checked_upvoted = false;
            var saved_len = saved.length;
            var upvoted_len = upvoted.length;
            //alert("controllo se l'utente ha la notte tra quelle salvate");
            
            for(var j =0; j<saved_len; j++){
              
              //alert("Saved:" + saved[j].id + " ID: " +  risposta[index].id);
              if(saved[j].id == risposta[index].id){
                checked_saved = true;
                //alert("Cambio variabile!")
                break;
              }
            }
          
            //alert("Saved: " + checked_saved);
            
            //alert("Controllato")
            //alert("controllo se l'utente ha la notte tra quelle piaciute")

            for(var j=0; j<upvoted_len; j++){
              
                if(upvoted[j].id == risposta[index].id){
                  checked_upvoted = true;
                  break;
                }
            }
            //alert("Upvoted: " + checked_upvoted);
            //alert("controllato")

            nights[index] = risposta[index];
            var div_row = document.createElement("div");
            div_row.className = "row";
           

            var div_col = document.createElement("div");
            div_col.className = "col-sm-11";
            //alert("Col created");
            

            var div_well = document.createElement("div");
            div_well.className = "well";

            var my_desc_title = document.createElement("p");
            my_desc_title.className = "my_title";
            my_desc_title.innerHTML = "Description: "
            var my_desc = document.createElement("span");
            my_desc.className = "my_elem";
            my_desc.innerHTML = risposta[index].description;
            my_desc_title.appendChild(my_desc);
          
            div_well.appendChild(my_desc_title);

            var my_tag_title = document.createElement("p");
            my_tag_title.className = "my_title";
            my_tag_title.innerHTML = "Tag: "
            var my_tag = document.createElement("span");
            my_tag.className = "my_elem";
            my_tag.innerHTML = risposta[index].tag_type;
            my_tag_title.appendChild(my_tag);
            div_well.appendChild(my_tag_title);

            var my_elements_title = document.createElement("p");
            my_elements_title.className="my_title";
            my_elements_title.innerHTML = "Elements: "
            div_well.appendChild(my_elements_title);

            var list = document.createElement("div");
            list.className = "my_list";

            if (risposta[index].board_game != null){
              
              var board_game =  risposta[index].board_game;
              var container1 = document.createElement("container");
              container1.className = "elem1";
              var my_board_game = document.createElement("span");
              my_board_game.className = "my_elem";
              my_board_game.innerHTML = board_game.name;

              var my_board_game_img = document.createElement("img");
              my_board_game_img.className = "img-thumbnail";
              my_board_game_img.src = board_game.imageUrl;
              
              var br = document.createElement("br");
              container1.appendChild(my_board_game);
              container1.appendChild(br);
              container1.appendChild(my_board_game_img);
              list.appendChild(container1);

             
            }
            

            if (risposta[index].meal.id != undefined){
              
              //alert("pasto trovato");
              var container2 = document.createElement("container");
              container2.className = "elem2";

              var my_meal = document.createElement("span");
              my_meal.className = "my_elem";
              my_meal.innerHTML = risposta[index].meal.name;

              var br = document.createElement("br");
              var my_meal_img = document.createElement("img");
              my_meal_img.className = "img-thumbnail";
              my_meal_img.src = risposta[index].meal.image;
             
              container2.appendChild(my_meal);
              container2.appendChild(br);
              container2.appendChild(my_meal_img);
              list.appendChild(container2);
              //alert("Pasto aggiunto");
            }
            
           

            if (risposta[index].cocktail.id != undefined){
             
              var container3 = document.createElement("container");
              container3.className = "elem3";
              var my_cocktail = document.createElement("span");
              my_cocktail.className = "my_elem";
              my_cocktail.innerHTML = risposta[index].cocktail.name;

              var my_cocktail_img = document.createElement("img");
              my_cocktail_img.className = "img-thumbnail";
              my_cocktail_img.src = risposta[index].cocktail.image
              
              var br = document.createElement("br");
             
              container3.appendChild(my_cocktail);
              container3.appendChild(br);
              container3.appendChild(my_cocktail_img);
              list.appendChild(container3);
            } 
            if (risposta[index].beer.name != undefined){
              var container4 = document.createElement("container");
              container4.className = "elem4";
              var my_beer = document.createElement("span");
              my_beer.className = "my_elem";
              my_beer.innerHTML = risposta[index].beer.name;

              if(risposta[index].beer.image == "Sorry, no picture provided for this beer") {
                var my_beer_img = document.createElement("img");
                my_beer_img.className = "img-thumbnail";
                my_beer_img.src = "jedi.jpg";

                
              }
              else {
                var my_beer_img = document.createElement("img");
                my_beer_img.className = "img-thumbnail";
                my_beer_img.src = risposta[index].beer.image; }
              
              
              var br = document.createElement("br");
             
              container4.appendChild(my_beer);
              container4.appendChild(br);
              container4.appendChild(my_beer_img);
              list.appendChild(container4);
            }
           

            div_well.appendChild(list);
           

            var bottone = document.createElement("button");
            var br = document.createElement("br");

            bottone.type = "button";
            bottone.className += "post_button";
            bottone.name= risposta[index].id;
            bottone.innerHTML = "More infos"
            bottone.onclick = reply_click;

            var link = document.createElement("a");
            link.id= risposta[index].id + "upvote";
            link.name = risposta[index].id;
              //span.innerHTML = "Upvote";
            if(checked_upvoted == false){
              //alert("Not upvoted!")
              link.className = "my_link";
              link.innerHTML = "Upvote  "
              link.onclick = upvote_function ;
              var span = document.createElement("span");
              span.className = "glyphicon glyphicon-arrow-up";

            }
            else {
              //alert("Upvoted!")
              link.className = "upvotedAndSaved";
              link.innerHTML = "Upvoted  ";
            }
            
            var link2 = document.createElement("a")
            link2.id= risposta[index].id + "save";
            link2.name = risposta[index].id;
            
            //span2.innerHTML = "Save";

            if(checked_saved == false){
              //alert("Not Saved!")
              link2.className = "my_link";
              link2.innerHTML = "   Save";
              link2.onclick = save_function ;
              var span2 = document.createElement("span");
              span2.className = "glyphicon glyphicon-download-alt";
            }
            else{
              //alert("Saved!")
              link2.className = "upvotedAndSaved";
              link2.innerHTML = "  Saved"
            }
            
            
            
            div_well.appendChild(br);
            if(checked_upvoted == false) link.appendChild(span);
            div_well.appendChild(link);
            if(checked_saved == false)link2.appendChild(span2);
            div_well.appendChild(link2);
            div_well.appendChild(bottone); 

            
            div_col.appendChild(div_well);
              
            div_row.appendChild(div_col);
              
            nights_section.appendChild(div_row);
              
           

          }
          localStorage.setItem("nights", JSON.stringify(nights));

        }
     }

    else {
        alert("Something went wrong. Message: " + this.responseText);
        } 
    }
    request.send();  

});


  function reply_click(){
        window.localStorage.setItem('night_id', this.name)
        //alert("id: " + this.name);
        window.location.href = "Post.html";
  }


function logout(){
    var result = confirm("Are you sure you want to logout?");
      if (result) {
        localStorage.clear;
        alert("You are logging out! Bye!");
        window.location.href = "Home.html";  
  }
  }

  function upvote_function(){
    
   
    var id = this.name;
    
    
    var path  = 'https://pacific-stream-14038.herokuapp.com/upvoted/'+ localStorage.username+'/'+id ;

    var request = new XMLHttpRequest();
   

    request.open('POST', path , true);

    request.onload = function() {
  
    
    if (request.status >= 200 && request.status < 400) {
        //alert("You upvoted this night!")
        document.getElementById(id+"upvote").innerHTML = "Upvoted";
        document.getElementById(id+"upvote").style.color = "green";
        document.getElementById(id+"upvote").style.cursor= "text";
        document.getElementById(id+"upvote").style.textDecoration = "none"

        document.getElementById(id+"upvote").onclick = function(){ return false;}

         } 

    else {
        
        alert("Something went wrong, please try again!");
        } 
  }
  
  request.send();
 

  }

  function save_function(){

    var id = this.name;
    
    var path  = 'https://pacific-stream-14038.herokuapp.com/saved/'+ localStorage.username+'/'+id ;

    var request = new XMLHttpRequest();
   
    request.open('POST', path , true);

    request.onload = function() {
    // Begin accessing JSON data here
   
    if (request.status >= 200 && request.status < 400) {

        //alert("You saved this night!");
        document.getElementById(id+"save").innerHTML = "Saved";
        document.getElementById(id+"save").style.color = "green";
        document.getElementById(id+"save").style.cursor= "text";
        document.getElementById(id+"save").style.textDecoration = "none"
        document.getElementById(id+"save").onclick = function(){ return false;}

         } 

    else {
        
        alert("Something went wrong, please try again!");
        } 
  }
  
  request.send();
   

  }

  function findUpvotedNights(){
    return new Promise(function(resolve,reject){
     
      var request = new XMLHttpRequest();
     
      var path =  'https://pacific-stream-14038.herokuapp.com/upvoted/'+username;
      request.open('GET', path, true)
      request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
          var risposta = JSON.parse(this.response);

          localStorage.setItem("upvoted_nights", JSON.stringify(risposta));
          resolve();           
      }

      else {
          alert("Something went wrong. Message: " + this.responseText);
          reject();
          } 
      }

      request.send();  
        
    });

    } 

function findSavedNights(){
  return new Promise(function(resolve,reject){
    var request = new XMLHttpRequest();
     
    var path =  'https://pacific-stream-14038.herokuapp.com/saved/'+username;
    request.open('GET', path, true)
    request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        var risposta = JSON.parse(this.response);
        
          localStorage.setItem("saved_nights", JSON.stringify(risposta));
          resolve();
     }

    else {
        alert("Something went wrong. Message: " + this.responseText);
        reject();
        } 
    }
    request.send(); 

  })
    
    
  }

  
