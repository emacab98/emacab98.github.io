var myObj;
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
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/meal/${search_meal_name}/multiple/30`, true);
    request.onload = function() {
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
             // Begin accessing JSON data here*/
            document.getElementById("menu_meal").innerHTML="";
            myObj = JSON.parse(request.response);
            if(myObj.length == 0){
                document.getElementById("search_meal_name_msg").innerHTML = "Meal not found! Please try again";
                return;
            }
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].name;
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
    //alert(item_selected.text);
    if(item_selected.text==""){
        alert("Please select a meal in the menu!");
    }
    else{
        var description_list = document.getElementById("description_list");
        description_list.innerHTML="";
        var j;
        for(j=0; j< myObj.length; j++){ 
            //alert(myObj[j].name);     
            if(myObj[j].name==item_selected.text){
                selected_meal= myObj[j];
                $("#add-btn").prop("disabled",false);
                break;
            }
        }
        //alert(JSON.stringify(selected_meal));
        document.getElementById("photo_meal").src= selected_meal.image;
        description_list.innerHTML+= `<dt>Name</dt> <dd>- ${selected_meal.name}</dd>`;
        description_list.innerHTML+= `<dt>Category</dt> <dd>- ${selected_meal.category}</dd>`;
        description_list.innerHTML+= `<dt>Cuisine</dt> <dd>- ${selected_meal.cuisine}</dd>`;
        
        description_list.innerHTML+= `<dt>Composition:</dt> <dd><table id="tab" ><tr><th>Ingredients</th><th>Quantities</th></tr> </table></dd>`;

        var tab = document.getElementById("tab");
        var ing = selected_meal.ingredients;
        var qnt = selected_meal.quantities;
        var i;
        for(i=0; i<ing.length; i++){
            if(typeof qnt[i] !== "undefined"){
                document.getElementById("tab").innerHTML += `<tr><td>${ing[i]}</td><td>${qnt[i]}</td></tr>`;
            }
            else{
                document.getElementById("tab").innerHTML += `<tr><td>${ing[i]}</td><td>not specified</td></tr>`;
            }
        }
        
        //alert(selected_meal.instructions);
        if(typeof selected_meal.instructions !== "undefined"){
            document.getElementById("description").innerHTML= selected_meal.instructions;
        }
        else{
            document.getElementById("description").innerHTML= "Description not available.";
        }
        
        
        $('#right-column').show(100);    
        
    }
}

function RandomMeal(){
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/meal/surprise/20`, true);
    request.onload = function() {
    // Begin accessing JSON data here
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
            document.getElementById("menu_meal").innerHTML="";
            myObj = JSON.parse(request.response);
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].name;
                if(s!= ""){
                    document.getElementById("menu_meal").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            $("#select-btn").prop("disabled",false);  
        }  
    }
    request.send();
}

function AdvancedSearchCuisine(){
    document.getElementById("filters_msg_cuisine").innerHTML = "";
    var search_meal_name =  document.getElementById('menu_cuisine').value;
    if(search_meal_name == ""){
        document.getElementById("filters_msg_cuisine").innerHTML = "Please select a cuisine!";
        return;
    }

    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/meal/cuisine/${search_meal_name}/30`, true);
    request.onload = function() {
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
             // Begin accessing JSON data here
            document.getElementById("menu_meal").innerHTML="";
            myObj = JSON.parse(request.response);
            if(myObj.length == 0){
                document.getElementById("filters_msg_cuisine").innerHTML = "Cuisine temporarily unavailable.";
                return;
            }
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].name;
                if(s!= ""){
                    document.getElementById("menu_meal").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            $("#select-btn").prop("disabled",false);
        }  
        else{
            document.getElementById("filters_msg_cuisine").innerHTML = "Cuisine temporarily unavailable.";
        }
    }

    request.send();
}

function AdvancedSearchCategory(){
    document.getElementById("filters_msg_category").innerHTML = "";
    var search_meal_name =  document.getElementById('menu_category').value;
    if(search_meal_name == ""){
        document.getElementById("filters_msg_category").innerHTML = "Please select a category!";
        return;
    }

    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/meal/category/${search_meal_name}/30`, true);
    request.onload = function() {
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
             // Begin accessing JSON data here
            document.getElementById("menu_meal").innerHTML="";
            myObj = JSON.parse(request.response);
            if(myObj.length == 0){
                document.getElementById("filters_msg_category").innerHTML = "Category temporarily unavailable.";
                return;
            }
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].name;
                if(s!= ""){
                    document.getElementById("menu_meal").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            $("#select-btn").prop("disabled",false);
        }  
        else{
            document.getElementById("filters_msg_category").innerHTML = "Category temporarily unavailable.";
        }
    }

    request.send();
}

function addMeal(){
    localStorage.meal=JSON.stringify(selected_meal);
    
    var perfect_night = JSON.parse(localStorage.perfect_night);
    perfect_night.meal = selected_meal.id;
    localStorage.perfect_night = JSON.stringify(perfect_night);


    window.location.href='javascript:history.go(-1)';
}