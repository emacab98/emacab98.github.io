var myObj;
var selected_beer;

$(document).ready(function(){
    $("#select-btn").prop("disabled",true);
    $("#add-btn").prop("disabled",true);
    $('#right-column').hide();
});


//onclick search by name button
function SearchByName(){
    document.getElementById("search_beer_name_msg").innerHTML = "";
    var search_beer_name =  document.getElementById('search_beer_name').value;
    if(search_beer_name == ""){
        document.getElementById("search_beer_name_msg").innerHTML = "Please write a beer name!";
        return;
    }
    // AJAX XMLHttpRequest
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/beer/byName/${search_beer_name}/20`, true);
    request.onload = function() {
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
             // Begin accessing JSON data here*/
            document.getElementById("menu_beer").innerHTML="";
            myObj = JSON.parse(request.response);
            if(myObj.length == 0){
                document.getElementById("search_beer_name_msg").innerHTML = "Beer not found! Please try again";
                return;
            }
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].name;
                if(s!= ""){
                    document.getElementById("menu_beer").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            $("#select-btn").prop("disabled",false);
        }  
        else{
            document.getElementById("search_beer_name_msg").innerHTML = "Beer not found! Please try again";
        }
    }
    request.send();
}

//onclick select button
function SelectBeer(){
    var idx = document.getElementById("menu_beer").options.selectedIndex;
    var item_selected = document.getElementById("menu_beer").options.item(idx);
    if(item_selected.text==""){
        alert("Please select a beer in the menu!");
    }
    else{
        var description_list = document.getElementById("description_list");
        description_list.innerHTML="";
        var j;
        for(j=0; j< myObj.length; j++){   
            if(myObj[j].name==item_selected.text){
                selected_beer= myObj[j];
                $("#add-btn").prop("disabled",false);
                break;
            }
        }
        //checking if the selected item has a picture 
        if(selected_beer.image == "Sorry, no picture provided for this beer"){
            $('#photo_beer').hide();
            document.getElementById("photo_beer_msg").innerHTML=selected_beer.image;
        }
        else{            
            document.getElementById("photo_beer_msg").innerHTML="";
            document.getElementById("photo_beer").src= selected_beer.image;
            $('#photo_beer').show();
        }
        
        //filling description list
        description_list.innerHTML+= `<dt>Name</dt> <dd>- ${selected_beer.name}</dd>`;
        description_list.innerHTML+= `<dt>Category</dt> <dd>- ${selected_beer.category}</dd>`;
        description_list.innerHTML+= `<dt>ABV</dt> <dd>- ${selected_beer.abv}</dd>`;        
        description_list.innerHTML+= `<dt>IBU</dt> <dd>- ${selected_beer.ibu}</dd>`;
        
        //checking if some property of the selected item are not available 
        if(typeof selected_beer.description !== "undefined"){
            document.getElementById("description").innerHTML= selected_beer.description;
        }
        else{
            document.getElementById("description").innerHTML= "Description not available.";
        }
        
        if(typeof selected_beer.categoryDescription !== "undefined"){
            document.getElementById("cat_description").innerHTML= selected_beer.categoryDescription;
        }
        else{
            document.getElementById("cat_description").innerHTML= "Category description not available.";
        }
        
        $('#right-column').show(100);
    }
}

//onclick random button
function RandomBeer(){
    // AJAX XMLHttpRequest
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/beer/byRandom/9`, true);
    request.onload = function() {
        //Begin accessing JSON data here
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
            document.getElementById("menu_beer").innerHTML="";
            myObj = JSON.parse(request.response);
            
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].name;
                if(s!= ""){
                    document.getElementById("menu_beer").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            $("#select-btn").prop("disabled",false);  
        }  
    }
    request.send();
}

//onclick advanced search button
function AdvancedSearch(){
    document.getElementById("filters_msg").innerHTML ="";
    var ibu = document.getElementById('ibu').value;
    var abv = document.getElementById('abv').value;

    //checking the input 
    if((ibu =="" && abv=="")|| parseInt(ibu)<0 ||  parseInt(abv)<0){
        document.getElementById("filters_msg").innerHTML = "Please add a valid filter!";
        return;
    }
    if(ibu =="") ibu = "0";
    if(abv =="") abv = "0";

    // AJAX XMLHttpRequest
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/beer/byFilters/${ibu}/${abv}/10`, true);
    request.onload = function() {
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
            //Begin accessing JSON data here
            document.getElementById("menu_beer").innerHTML="";
            myObj = JSON.parse(request.response);
            if(myObj.length == 0){
                document.getElementById("filters_msg").innerHTML = "Beer not found! Please try again";
                return;
            }
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].name;
                if(s!= ""){
                    document.getElementById("menu_beer").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            $("#select-btn").prop("disabled",false);
        }  
        else{
            document.getElementById("filters_msg").innerHTML = "Beer not found! Please try again";
        }
    }
    request.send();
}

//onclick add button
function addBeer(){
    localStorage.beer=JSON.stringify(selected_beer);
    
    var perfect_night = JSON.parse(localStorage.perfect_night);
    perfect_night.beer = selected_beer.id;
    localStorage.perfect_night = JSON.stringify(perfect_night);


    window.location.href='javascript:history.go(-1)';
}