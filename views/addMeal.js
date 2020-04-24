var myObj;// = [{"id":492560,"image":"https://spoonacular.com/recipeImages/St--Louis-Style-Pizza-492560.jpg","title":"Quick and Easy St. Louis-Style Pizza","servings":8,"readyInMinutes":27},{"id":559251,"image":"https://spoonacular.com/recipeImages/Breakfast-Pizza-559251.jpg","title":"Breakfast Pizza","servings":6,"readyInMinutes":25},{"id":630293,"image":"https://spoonacular.com/recipeImages/Egg---rocket-pizzas-630293.jpg","title":"Egg & rocket pizzas","servings":2,"readyInMinutes":30},{"id":601651,"image":"https://spoonacular.com/recipeImages/Fruit-Pizza-601651.jpg","title":"Fruit Pizza","servings":8,"readyInMinutes":90},{"id":496972,"image":"https://spoonacular.com/recipeImages/Ricotta-Pizza-with-Prosciutto-and-Fresh-Pea-Salad-496972.jpg","title":"Ricotta Pizza with Prosciutto and Fresh Pea Salad","servings":6,"readyInMinutes":30},{"id":223993,"image":"https://spoonacular.com/recipeImages/Easy-tomato-pizzas-223993.jpg","title":"Easy tomato pizzas","servings":8,"readyInMinutes":90},{"id":481601,"image":"https://spoonacular.com/recipeImages/Neapolitan-Pizza-and-Honey-Whole-Wheat-Dough-481601.jpg","title":"Neapolitan Pizza and Honey Whole Wheat Dough","servings":8,"readyInMinutes":102},{"id":222869,"image":"https://spoonacular.com/recipeImages/Pizza-puff-pinwheels-222869.jpg","title":"Pizza puff pinwheels","servings":12,"readyInMinutes":35},{"id":225711,"image":"https://spoonacular.com/recipeImages/Tuna--olive---rocket-pizzas-225711.jpg","title":"Tuna, olive & rocket pizzas","servings":2,"readyInMinutes":27},{"id":209785,"image":"https://spoonacular.com/recipeImages/No-oven-pizza-209785.jpg","title":"No-oven pizza","servings":4,"readyInMinutes":40}];
var selected_meal;
$(document).ready(function(){
    $("#select-btn").prop("disabled",true);
    $("#add-btn").prop("disabled",true);
    $('#right-column').hide();
});

function SearchByName(){
    document.getElementById("search_meal_name_msg").innerHTML = "";
    var search_meal_name =  document.getElementById('search_meal_name').value;
    if(search_meal_name == ""){
        document.getElementById("search_meal_name_msg").innerHTML = "Please write a meal name!";
        return;
    }
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/meal/byName/${search_meal_name}/30`, true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400){
             // Begin accessing JSON data here*/
            document.getElementById("menu_meal").innerHTML="";
            $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
            myObj = JSON.parse(request.response);
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].title;
                if(s!= ""){
                    document.getElementById("menu_meal").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            $("#select-btn").prop("disabled",false);
        }  
        else{
            document.getElementById("search_meal_name_msg").innerHTML = "Meal not found! Please try again";
        }
    }
    request.send();
}

function SelectMeal(){
    var idx = document.getElementById("menu_meal").options.selectedIndex;
    var item_selected = document.getElementById("menu_meal").options.item(idx);
    if(item_selected.text==""){
        alert("Please select a meal in the menu!");
    }
    else{
        var description_list = document.getElementById("description_list");
        description_list.innerHTML="";
        var j;
        for(j=0; j< myObj.length; j++){        
            if(myObj[j].title==item_selected.text){
                selected_meal= myObj[j];
                $("#add-btn").prop("disabled",false);
                break;
            }
        }
        ///
        var request = new XMLHttpRequest();
        var details;
        request.open('GET', `https://pacific-stream-14038.herokuapp.com/meal/overview/${selected_meal.id}`, true);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400){
                // Begin accessing JSON data here
                details = JSON.parse(request.response);
                document.getElementById("photo_meal").src= selected_meal.image;
                
                description_list.innerHTML+= `<dt>Ready in minutes</dt> <dd>- ${selected_meal.readyInMinutes}</dd>`;
                description_list.innerHTML+= `<dt>Servings</dt> <dd>- ${selected_meal.servings}</dd>`;
                
                var overview = new String(details.overview);
                var instructions = new String(details.instructions);
                document.getElementById("overview").innerHTML= overview;
                document.getElementById("recipe").innerHTML= instructions;
                
                var i, ing;
                ing = details.ingredients;
                document.getElementById("ingredients").innerHTML = "";
                for(i=0; i<ing.length; i++){
                    if(i == ing.length -1){
                        document.getElementById("ingredients").innerHTML += `${ing[i]}`;
                    }
                    else{
                        document.getElementById("ingredients").innerHTML += `${ing[i]}, `;
                    }
                }
                $('#right-column').show(100);                
            }
        }
        request.send();
        ///
        
    }
}

function RandomMeal(){
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/meal/byRandom/20`, true);
    request.onload = function() {
    // Begin accessing JSON data here
        if (request.status >= 200 && request.status < 400){
            document.getElementById("menu_meal").innerHTML="";
            myObj = JSON.parse(request.response);
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].title;
                if(s!= ""){
                    document.getElementById("menu_meal").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            $("#select-btn").prop("disabled",false);  
        }  
    }
    request.send();
}

function AdvancedSearch(){
    var search_meal_name =  document.getElementById('meal_name').value;
    if(search_meal_name == ""){
        document.getElementById("filters_msg").innerHTML = "Please write a meal name!";
        return;
    }
    var filterObj = {};
    var data;
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/meal/byName/${search_meal_name}/30`, true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400){
             // Begin accessing JSON data here
            document.getElementById("menu_meal").innerHTML="";
            $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
            myObj = JSON.parse(request.response);
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].title;
                if(s!= ""){
                    document.getElementById("menu_meal").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            $("#select-btn").prop("disabled",false);
        }  
        else{
            document.getElementById("filters_msg").innerHTML = "Meal not found! Please try again";
        }
    }
    
    document.getElementById('exclude_ingredients_msg').innerHTML = "";
    document.getElementById('intolerances_msg').innerHTML = "";
    document.getElementById("filters_msg").innerHTML = "";
    var idx = document.getElementById("menu_cuisine").options.selectedIndex;
    var cuisine_selected = document.getElementById("menu_cuisine").options.item(idx);
    if(cuisine_selected.text!=""){
        filterObj.cuisine = cuisine_selected.text;
    }
    idx = document.getElementById("menu_diet").options.selectedIndex;
    var diet_selected = document.getElementById("menu_diet").options.item(idx);
    if(diet_selected.text!=""){
        filterObj.diet = diet_selected.text;
    }
    var regex = new RegExp("(([a-zA-Z][\s]*\,[\s]*)*([a-zA-Z]){1}$");
    var exclude_ingredients = document.getElementById('exclude_ingredients').value;
    if(exclude_ingredients != ""){
        if(regex.test(exclude_ingredients)){
            filterObj.excludeIngredients = exclude_ingredients;
        }
        else{
            document.getElementById('exclude_ingredients_msg').innerHTML = 'Wrong format!';
            return;
        }
    }
    
    var intolerances = document.getElementById('intolerances').value;
    if(intolerances != ""){
        if(regex.test(intolerances)){
            filterObj.intolerances = intolerances;
        }
        else{
            document.getElementById('intolerances_msg').innerHTML = 'Wrong format!';
            return;
        }
    }

    data = JSON.stringify(filterObj);    
    request.setRequestHeader("Content-type", "application/json");
    request.send(data);
}

function addMeal(){
    localStorage.meal=JSON.stringify(selected_meal);
    
    var perfect_night = JSON.parse(localStorage.perfect_night);
    perfect_night.meal = selected_meal.id;
    localStorage.perfect_night = JSON.stringify(perfect_night);


    window.location.href='javascript:history.go(-1)';
}