var myObj;
var selected_cocktail;

//jQuery methods inside document ready event
//to prevent any jQuery code from running before the document is finished loading
$(document).ready(function(){
    $("#select-btn").prop("disabled",true);
    $("#add-btn").prop("disabled",true);
    //JQuery hide method (hide the right column until no element is selected)
    $('#right-column').hide();
});

//onclick search by name button
function SearchByName(){
    //getElementById() DOM method returns the element that has the ID attribute with the specified value
    //innerHTML DOM property sets the HTML content (inner HTML) of an element
    //reset control message
    document.getElementById("search_cocktail_name_msg").innerHTML = "";

    //value property returns the value of the value attribute of the input 
    var search_cocktail_name =  document.getElementById('search_cocktail_name').value;

    // AJAX XMLHttpRequest
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/cocktail/${search_cocktail_name}/multiple/10`, true);
    request.onload = function() {
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
            // Begin accessing JSON data here
            //reset menu cocktail
            document.getElementById("menu_cocktail").innerHTML="";
            myObj = JSON.parse(request.response);
            //checking if the response object is not empty (just to be careful)
            if(myObj.length == 0){
                //writing control message
                document.getElementById("search_cocktail_name_msg").innerHTML = "Cocktail not found! Please try again";
                return;
            }
            var s;
            //add each object in the response array to the menu
            for(i=0; i< myObj.length; i++){
                s = myObj[i].name;
                if(s!= ""){
                    document.getElementById("menu_cocktail").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            //enable select button
            $("#select-btn").prop("disabled",false);  
        }  
        else{
            document.getElementById("search_cocktail_name_msg").innerHTML = "Cocktail not found! Please try again";
        }
    }
    request.send();
}

//onclick select button
function SelectCocktail(){
    //options collection returns a collection of all <option> elements in a drop-down list
    //selectedIndex property sets or returns the index of the selected option in a drop-down list
    var idx = document.getElementById("menu_cocktail").options.selectedIndex;
    //item(index) method returns the <option> element from the collection with the specified index
    var item_selected = document.getElementById("menu_cocktail").options.item(idx);
    if(item_selected.text==""){
        alert("Please select a cocktail in the menu!")
    }
    else{
        document.getElementById("description_list").innerHTML="";
        var j;
        for(j=0; j< myObj.length; j++){ 
            //filling info containers              
            if(myObj[j].name==item_selected.text){
                // src property sets the value of the src attribute of the element image
                document.getElementById("photo_cocktail").src= myObj[j].image;
                document.getElementById("recipe").innerHTML= myObj[j].instructions; 
                //<dt> tag defines a term in a description list       
                //<dd> tag is used to describe a term in a description list    
                document.getElementById("description_list").innerHTML+= `<dt>Category</dt> <dd>- ${myObj[j].category}</dd>`;
                //creating table for composition
                document.getElementById("description_list").innerHTML+= `<dt>Composition:</dt> <dd><table id="tab" ><tr><th>Ingredients</th><th>Quantities</th></tr> </table></dd>`;
                var ing = myObj[j].ingredients;
                var qnt = myObj[j].quantities;
                var i;
                //filling the table
                for(i=0; i<ing.length; i++){
                    if(typeof qnt[i] !== "undefined"){
                        document.getElementById("tab").innerHTML += `<tr><td>${ing[i]}</td><td>${qnt[i]}</td></tr>`;
                    }
                    else{
                        document.getElementById("tab").innerHTML += `<tr><td>${ing[i]}</td><td>not specified</td></tr>`;
                    }
                }
                //initialize global variable to always know what is the item selected in the menu
                selected_cocktail = myObj[j];
                //enable add button
                $("#add-btn").prop("disabled",false);
                break;
            }
        }
        //showing the right column with info of selected item
        $('#right-column').show(100);
    }
}


//onclick random button
function RandomCocktail(){
    // AJAX XMLHttpRequest
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/cocktail/surprise/10`, true);
    request.onload = function() {
        // Begin accessing JSON data here
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
            document.getElementById("menu_cocktail").innerHTML="";
            myObj = JSON.parse(request.response);
            var s;
            //filling menu
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

//onclick advanced search button
function RadioCocktail(){
    document.getElementById("search_cocktail_radio_msg").innerHTML="";
    if(document.getElementById('ingredients').checked){
        //if ingredients radio button is checked 
        var search_cocktail_ingredient =  document.getElementById('search_cocktail_radio').value;
        if(search_cocktail_ingredient == ""){
            document.getElementById("search_cocktail_radio_msg").innerHTML = "Please type an ingredient!";
            return;
        }
        // AJAX XMLHttpRequest
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
        //if category radio button is checked 
        var search_cocktail_category =  document.getElementById('search_cocktail_radio').value;
        //checking the input
        var category = search_cocktail_category.toLowerCase();
        if(category != "ordinary drink" && category != "ordinarydrink" && category != "cocktail" && 
           category != "shot" && category != "homemade liqueur" && category != "homemadeliqueur" &&
           category != "beer"){
            document.getElementById("search_cocktail_radio_msg").innerHTML = "Category not found! Please try again";
            return;
        }
        // AJAX XMLHttpRequest
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

//onclick add button
function addCocktail(){
    //adding to the storage the choosen element 
    localStorage.cocktail=JSON.stringify(selected_cocktail);
    
    //taking from the storage the perfect night object
    var perfect_night = JSON.parse(localStorage.perfect_night);
    //adding to the perfect night object the element choosen property with its id as value
    perfect_night.cocktail = selected_cocktail.id;
    localStorage.perfect_night = JSON.stringify(perfect_night);

    //redirect the browser 
    window.location.href='javascript:history.go(-1)';
}