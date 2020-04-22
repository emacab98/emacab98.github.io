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
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/meal/byName/${search_meal_name}/10`, true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400){
             // Begin accessing JSON data here
            document.getElementById("menu_meal").innerHTML="";
            myObj = JSON.parse(request.response);
            var s;
            for(i=0; i< myObj.length; i++){
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
        alert("Please select a meal in the menu!")
    }
    else{
        document.getElementById("description_list").innerHTML="";
        var j;
        for(j=0; j< myObj.length; j++){               
            if(myObj[j].name==item_selected.text){
                document.getElementById("photo_meal").src= myObj[j].image;
                document.getElementById("recipe").innerHTML= myObj[j].instructions;                
                document.getElementById("description_list").innerHTML+= `<dt>Category</dt> <dd>- ${myObj[j].category}</dd>`;
                document.getElementById("description_list").innerHTML+= `<dt>Composition:</dt> <dd><table id="tab" ><tr><th>Ingredients</th><th>Quantities</th></tr> </table></dd>`;
                var ing = myObj[j].ingredients;
                var qnt = myObj[j].quantities;
                var i;
                for(i=0; i<ing.length; i++){
                    if(typeof qnt[i] !== "undefined"){
                        document.getElementById("tab").innerHTML += `<tr><td>${ing[i]}</td><td>${qnt[i]}</td></tr>`;
                    }
                    else{
                        document.getElementById("tab").innerHTML += `<tr><td>${ing[i]}</td><td>not specified</td></tr>`;
                    }
                }
                selected_meal = myObj[j];
                $("#add-btn").prop("disabled",false);
                break;
            }
        }
        $('#right-column').show(100);
    }
}

function RandomMeal(){
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/cocktail/surprise/10`, true);
    request.onload = function() {
    // Begin accessing JSON data here
        if (request.status >= 200 && request.status < 400){
            document.getElementById("menu_meal").innerHTML="";
            myObj = JSON.parse(request.response);
            var s;
            for(i=0; i< myObj.length; i++){
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

function RadioMeal(){
    document.getElementById("search_meal_radio_msg").innerHTML="";
    if(document.getElementById('ingredients').checked){
        var search_meal_ingredient =  document.getElementById('search_meal_radio').value;
        var request = new XMLHttpRequest();
        request.open('GET', `https://pacific-stream-14038.herokuapp.com/cocktail/ingredient/10/${search_meal_ingredient}`, true);
        request.onload = function() {
            if (request.status >= 200 && request.status < 400){
                // Begin accessing JSON data here
                document.getElementById("menu_meal").innerHTML="";
                myObj = JSON.parse(request.response);
                var s;
                for(i=0; i< myObj.length; i++){
                    s = myObj[i].name;
                    if(s!= ""){
                        document.getElementById("menu_meal").innerHTML +=  `<option value=${s}> ${s}</option>`;
                    }
                }  
                $("#select-btn").prop("disabled",false);  
            }  
            else{
                document.getElementById("search_meal_radio_msg").innerHTML = "Ingredient not found! Please try again";
            }
        }
        request.send();
    }      
    else if(document.getElementById('category').checked){
        var search_meal_category =  document.getElementById('search_meal_radio').value;
        var request = new XMLHttpRequest();
        request.open('GET', `https://pacific-stream-14038.herokuapp.com/cocktail/byCategory/${search_meal_category}/10`, true);
        request.onload = function() {        
            if (request.status >= 200 && request.status < 400){
                // Begin accessing JSON data here
                document.getElementById("menu_meal").innerHTML="";
                myObj = JSON.parse(request.response);
                var s;
                for(i=0; i< myObj.length; i++){
                    s = myObj[i].name;
                    if(s!= ""){
                        document.getElementById("menu_meal").innerHTML +=  `<option value=${s}> ${s}</option>`;
                    }
                }  
                $("#select-btn").prop("disabled",false);  
            }  
            else{
                document.getElementById("search_meal_radio_msg").innerHTML = "Category not found! Please try again";
            }
        }
        request.send();
    }      
    else{
        document.getElementById("search_meal_radio_msg").innerHTML="Please select a selection criteria";
    }
}


function addMeal(){
    localStorage.meal=JSON.stringify(selected_meal);
    
    var perfect_night = JSON.parse(localStorage.perfect_night);
    perfect_night.meal = selected_meal.id;
    localStorage.perfect_night = JSON.stringify(perfect_night);


    window.location.href='addElementSolo.html';
}