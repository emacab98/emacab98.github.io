$(document).ready(function(){
    var nights = JSON.parse(localStorage.getItem("nights"));
    var id= localStorage.getItem("night_id");
   //alert("Id: " + id)}
    var index = 0;
    for(var i=0; i<nights.length; i++){
        if(nights[i].id ==  id){
            index = i;
            break;
        }
    }
    var found_night = nights[index];
    document.getElementById("desc").innerHTML += found_night.description;
    document.getElementById("tag").innerHTML += found_night.tag_type;

    if(found_night.meal.name != undefined){
        $("#meal_container").show();
        var img = document.createElement("img");
        img.className = "img-thumbnail";
        img.src = found_night.meal.image;
        document.getElementById("col-sx-meal").appendChild(img);
        //document.getElementById("meal_img").src = found_night.meal.image;
        document.getElementById("meal_name").innerHTML = found_night.meal.name;
        document.getElementById("meal_category").innerHTML = found_night.meal.category;
        document.getElementById("meal_description").innerHTML = found_night.meal.cuisine; 
        var length =  found_night.meal.ingredients.length;
        
        if(length>0){
        document.getElementById("meal_ingredients").innerHTML += "<br>"
            for(var i=0; i<length; i++){
                var qt = found_night.meal.quantities[i];
                var ing = found_night.meal.ingredients[i];
                document.getElementById("meal_ingredients").innerHTML += qt + " of " + ing + "<br>";
            }
        }
        document.getElementById("meal_recipe").innerHTML = found_night.meal.instructions;
    }
    else{
        $("#meal_container").hide();
    }

    

    if(found_night.cocktail.name != undefined){
        $("#cocktail_container").show();
        var img = document.createElement("img");
        img.className = "img-thumbnail";
        img.src = found_night.cocktail.image 
        document.getElementById("col-sx-cocktail").appendChild(img);
        //$('#cocktail_img').attr('src', JSON.stringify(found_night.cocktail.image));
        document.getElementById("cocktail_name").innerHTML += found_night.cocktail.name;
        document.getElementById("cocktail_category").innerHTML += found_night.cocktail.category;
        var length =  found_night.cocktail.ingredients.length;
        if(length>0){
        document.getElementById("cocktail_ingredients").innerHTML += "<br>"
            for(var i=0; i<length; i++){
                var qt = found_night.cocktail.quantities[i];
                var ing = found_night.cocktail.ingredients[i];
                document.getElementById("cocktail_ingredients").innerHTML += qt + "of: " + ing + "<br>";
            }
        }
        document.getElementById("cocktail_instructions").innerHTML ="<br>" + found_night.cocktail.instructions;
    }
    else{
        $("#cocktail_container").hide();
    }
   
    
    if(found_night.board_game.name != undefined){
         $("#board_game_container").show();
            //$('#bg_img').attr('src', found_night.board_game.imageUrl);
            var img = document.createElement("img");
            img.className = "img-thumbnail";
            img.src = found_night.board_game.imageUrl;
            document.getElementById("col-sx-board_game").appendChild(img);

            document.getElementById("bg_name").innerHTML = found_night.board_game.name;
            document.getElementById("bg_mint").innerHTML = found_night.board_game.minPlaytime;
            document.getElementById("bg_maxt").innerHTML = found_night.board_game.maxPlaytime;
            document.getElementById("bg_minp").innerHTML = found_night.board_game.minPlayers;
            document.getElementById("bg_maxp").innerHTML = found_night.board_game.maxPlayers;
            document.getElementById("bg_mina").innerHTML = found_night.board_game.minAge;
            document.getElementById("bg_desc").innerHTML = found_night.board_game.description;
            document.getElementById("bg_rating").innerHTML = found_night.board_game.averageRating;
    }
    else{
        $("#board_game_container").hide();
    }

    if(found_night.beer.name != undefined){
            $("#beer_container").show()
            
            if(found_night.beer.image == "Sorry, no picture provided for this beer") {
               
                var my_beer_img = document.createElement("img");
                my_beer_img.className = "img-thumbnail";
                my_beer_img.src = "jedi.jpg";

                
              }
              else {
                
                var my_beer_img = document.createElement("img");
                my_beer_img.className = "img-thumbnail";
                my_beer_img.src = found_night.beer.image; }
            
            document.getElementById("col-sx-beer").appendChild(my_beer_img);

            document.getElementById("beer_name").innerHTML = found_night.beer.name;
            document.getElementById("beer_category").innerHTML = found_night.beer.category;
            document.getElementById("beer_abv").innerHTML = found_night.beer.abv;
            document.getElementById("beer_ibu").innerHTML = found_night.beer.ibu;
            document.getElementById("beer_description").innerHTML = found_night.beer.description;
            document.getElementById("beer_category_description").innerHTML = found_night.beer.categoryDescription;
    }
    else{
        $("#beer_container").hide();
    }
  
  }); 
  