var myObj;

$(document).ready(function(){
    $("#select-btn").prop("disabled",true);
    $("#add-btn").prop("disabled",true);
});

function SearchByName(){
    var search_cocktail_name =  document.getElementById('search_cocktail_name').value;
    var request = new XMLHttpRequest();
    request.open('GET', 'https://pacific-stream-14038.herokuapp.com/cocktail/'+search_cocktail_name, true);
    request.onload = function() {
    // Begin accessing JSON data here
        if (request.status >= 200 && request.status < 400){
            myObj = JSON.parse(request.response);
            document.getElementById("menu_cocktail").innerHTML =  `<option value=${myObj.name}> ${myObj.name}</option>`;    
            $("#select-btn").prop("disabled",false);  
        }  
        else{
            alert("Error connecting");
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
       // var arr = myObj.drinks;
       // var i, result;
        document.getElementById("description_list").innerHTML="";
        //for(i=0; i< arr.length; i++){
           // result=arr[i];                
            /*if(result.strDrink==item_selected.text){
                document.getElementById("photo_cocktail").src= result.strDrinkThumb;
                document.getElementById("recipe").innerHTML= result.strInstructions;                
                document.getElementById("description_list").innerHTML+= `<dt>Category</dt> <dd>- ${result.strCategory}</dd>`;
                document.getElementById("description_list").innerHTML+= `<dt>Type</dt> <dd>- ${result.strAlcoholic}</dd>`;
            }
        }*/
        if(myObj.name==item_selected.text){
            document.getElementById("photo_cocktail").src= myObj.image;
            document.getElementById("recipe").innerHTML= myObj.instructions;                
            document.getElementById("description_list").innerHTML+= `<dt>Category</dt> <dd>- ${myObj.category}</dd>`;
            document.getElementById("description_list").innerHTML+= `<dt>Composition:</dt> <dd><table id="tab" width=30%> </table></dd>`;
            var ing = myObj.ingredients;
            var qnt = myObj.quantities;
            var i;
            for(i=0; i<ing.length; i++){
                if(typeof qnt[i] !== "undefined"){
                    document.getElementById("tab").innerHTML += `<tr><td>${ing[i]}</td><td>${qnt[i]}</td></tr>`;
                }
            }
        }
    }
}