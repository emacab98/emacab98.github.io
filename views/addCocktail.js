var myObj;
var selected_cocktail;

$(document).ready(function(){
    $("#select-btn").prop("disabled",true);
    $("#add-btn").prop("disabled",true);
    $('#right-column').hide();
});

function SearchByName(){
    document.getElementById("search_cocktail_name_msg").innerHTML = "";
    var search_cocktail_name =  document.getElementById('search_cocktail_name').value;
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/cocktail/${search_cocktail_name}/multiple/10`, true);
    request.onload = function() {
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
             // Begin accessing JSON data here
            document.getElementById("menu_cocktail").innerHTML="";
            myObj = JSON.parse(request.response);
            if(myObj.length == 0){
                document.getElementById("search_cocktail_name_msg").innerHTML = "Cocktail not found! Please try again";
                return;
            }
            var s;
            for(i=0; i< myObj.length; i++){
                s = myObj[i].name;
                if(s!= ""){
                    document.getElementById("menu_cocktail").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            $("#select-btn").prop("disabled",false);  
        }  
        else{
            document.getElementById("search_cocktail_name_msg").innerHTML = "Cocktail not found! Please try again";
        }
    }
    request.send();
}

function SelectCocktail(){
    var idx = document.getElementById("menu_cocktail").options.selectedIndex;
    var item_selected = document.getElementById("menu_cocktail").options.item(idx);
    if(item_selected.text==""){
        alert("Please select a cocktail in the menu!")
    }
    else{
        document.getElementById("description_list").innerHTML="";
        var j;
        for(j=0; j< myObj.length; j++){               
            if(myObj[j].name==item_selected.text){
                document.getElementById("photo_cocktail").src= myObj[j].image;
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
                selected_cocktail = myObj[j];
                $("#add-btn").prop("disabled",false);
                break;
            }
        }
        $('#right-column').show(100);
    }
}

function RandomCocktail(){
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/cocktail/surprise/10`, true);
    request.onload = function() {
    // Begin accessing JSON data here
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
            document.getElementById("menu_cocktail").innerHTML="";
            myObj = JSON.parse(request.response);
            var s;
            for(i=0; i< myObj.length; i++){
                s = myObj[i].name;
                if(s!= ""){
                    document.getElementById("menu_cocktail").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            $("#select-btn").prop("disabled",false);  
        }  
    }
    request.send();
}

function RadioCocktail(){
    document.getElementById("search_cocktail_radio_msg").innerHTML="";
    if(document.getElementById('ingredients').checked){
        var search_cocktail_ingredient =  document.getElementById('search_cocktail_radio').value;
        if(search_cocktail_ingredient == ""){
            document.getElementById("search_cocktail_radio_msg").innerHTML = "Please type an ingredient!";
            return;
        }
        var request = new XMLHttpRequest();
        request.open('GET', `https://pacific-stream-14038.herokuapp.com/cocktail/ingredient/10/${search_cocktail_ingredient}`, true);
        request.onload = function() {
            if (request.readyState == 4 && request.status >= 200 && request.status < 400){
                // Begin accessing JSON data here
                document.getElementById("menu_cocktail").innerHTML="";
                myObj = JSON.parse(request.response);
                if(myObj.length == 0){
                    document.getElementById("search_cocktail_radio_msg").innerHTML = "Ingredient not found! Please try again";
                    return;
                }
                var s;
                for(i=0; i< myObj.length; i++){
                    s = myObj[i].name;
                    if(s!= ""){
                        document.getElementById("menu_cocktail").innerHTML +=  `<option value=${s}> ${s}</option>`;
                    }
                }  
                $("#select-btn").prop("disabled",false);  
            }  
            else{
                document.getElementById("search_cocktail_radio_msg").innerHTML = "Ingredient not found! Please try again";
            }
        }
        request.send();
    }      
    else if(document.getElementById('category').checked){
        var search_cocktail_category =  document.getElementById('search_cocktail_radio').value;
        var category = search_cocktail_category.toLowerCase();
        if(category != "ordinary drink" && category != "ordinarydrink" && category != "cocktail" && 
           category != "shot" && category != "homemade liqueur" && category != "homemadeliqueur" &&
           category != "beer"){
            //alert(category);
            document.getElementById("search_cocktail_radio_msg").innerHTML = "Category not found! Please try again";
            return;
        }
        var request = new XMLHttpRequest();
        request.open('GET', `https://pacific-stream-14038.herokuapp.com/cocktail/byCategory/${category}/10`, true);
        request.onload = function() {        
            if (request.readyState == 4 && request.status >= 200 && request.status < 400){
                // Begin accessing JSON data here
                document.getElementById("menu_cocktail").innerHTML="";
                myObj = JSON.parse(request.response);
                if(myObj.length == 0){
                    document.getElementById("search_cocktail_radio_msg").innerHTML = "Category not found! Please try again";
                    return;
                }
                var s;
                for(i=0; i< myObj.length; i++){
                    s = myObj[i].name;
                    if(s!= ""){
                        document.getElementById("menu_cocktail").innerHTML +=  `<option value=${s}> ${s}</option>`;
                    }
                }  
                $("#select-btn").prop("disabled",false);  
            }  
            else{
                document.getElementById("search_cocktail_radio_msg").innerHTML = "Category not found! Please try again";
            }
        }
        request.send();
    }      
    else{
        document.getElementById("search_cocktail_radio_msg").innerHTML="Please select a selection criteria";
    }
}


function addCocktail(){
    localStorage.cocktail=JSON.stringify(selected_cocktail);
    
    var perfect_night = JSON.parse(localStorage.perfect_night);
    perfect_night.cocktail = selected_cocktail.id;
    localStorage.perfect_night = JSON.stringify(perfect_night);


    window.location.href='javascript:history.go(-1)';
}