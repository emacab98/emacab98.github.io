var myObj;

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
    // Begin accessing JSON data here
        if (request.status >= 200 && request.status < 400){
            document.getElementById("menu_cocktail").innerHTML="";
            myObj = JSON.parse(request.response);
            for(i=0; i< myObj.length; i++){
                document.getElementById("menu_cocktail").innerHTML +=  `<option value=${myObj[i].name}> ${myObj[i].name}</option>`;
            }
            //document.getElementById("menu_cocktail").innerHTML =  `<option value=${myObj.name}> ${myObj.name}</option>`;    
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
            }
        }
        $('#right-column').show(100);
        /*if(myObj.name==item_selected.text){
            document.getElementById("photo_cocktail").src= myObj.image;
            document.getElementById("recipe").innerHTML= myObj.instructions;                
            document.getElementById("description_list").innerHTML+= `<dt>Category</dt> <dd>- ${myObj.category}</dd>`;
            document.getElementById("description_list").innerHTML+= `<dt>Composition:</dt> <dd><table id="tab" width=39%> </table></dd>`;
            var ing = myObj.ingredients;
            var qnt = myObj.quantities;
            var i;
            for(i=0; i<ing.length; i++){
                if(typeof qnt[i] !== "undefined"){
                    document.getElementById("tab").innerHTML += `<tr><td>${ing[i]}</td><td>${qnt[i]}</td></tr>`;
                }
                else{
                    document.getElementById("tab").innerHTML += `<tr><td>${ing[i]}</td><td>not specified</td></tr>`;
                }
            }
        }*/
    }
}

function RandomCocktail(){
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/cocktail/surprise/10`, true);
    request.onload = function() {
    // Begin accessing JSON data here
        if (request.status >= 200 && request.status < 400){
            document.getElementById("menu_cocktail").innerHTML="";
            myObj = JSON.parse(request.response);
            for(i=0; i< myObj.length; i++){
                document.getElementById("menu_cocktail").innerHTML +=  `<option value=${myObj[i].name}> ${myObj[i].name}</option>`;
            }
            //document.getElementById("menu_cocktail").innerHTML =  `<option value=${myObj.name}> ${myObj.name}</option>`;    
            $("#select-btn").prop("disabled",false);  
        }  
    }
    request.send();
}

function RadioCocktail(){
    document.getElementById("search_cocktail_radio_msg").innerHTML="";
    if(document.getElementById('ingredients').checked){
        var search_cocktail_ingredient =  document.getElementById('search_cocktail_radio').value;
        var request = new XMLHttpRequest();
        request.open('GET', `https://pacific-stream-14038.herokuapp.com/cocktail/ingredient/10/${search_cocktail_ingredient}`, true);
        request.onload = function() {
        // Begin accessing JSON data here
            if (request.status >= 200 && request.status < 400){
                document.getElementById("menu_cocktail").innerHTML="";
                myObj = JSON.parse(request.response);
                for(i=0; i< myObj.length; i++){
                    document.getElementById("menu_cocktail").innerHTML +=  `<option value=${myObj[i].name}> ${myObj[i].name}</option>`;
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
        var request = new XMLHttpRequest();
        request.open('GET', `https://pacific-stream-14038.herokuapp.com/cocktail/byCategory/${search_cocktail_category}/10`, true);
        request.onload = function() {
        // Begin accessing JSON data here
            if (request.status >= 200 && request.status < 400){
                document.getElementById("menu_cocktail").innerHTML="";
                myObj = JSON.parse(request.response);
                for(i=0; i< myObj.length; i++){
                    document.getElementById("menu_cocktail").innerHTML +=  `<option value=${myObj[i].name}> ${myObj[i].name}</option>`;
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