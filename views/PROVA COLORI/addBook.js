var myObj;
var selected_book;
$(document).ready(function(){
    $("#select-btn").prop("disabled",true);
    $("#add-btn").prop("disabled",true);
    $('#right-column').hide();
});

function SearchByName(){
    document.getElementById("search_book_name_msg").innerHTML = "";
    var search_book_name =  document.getElementById('search_book_name').value;
    if(search_book_name == ""){
        document.getElementById("search_book_name_msg").innerHTML = "Please write a book name!";
        return;
    }
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/book/multiple/${search_book_name}/10`, true);
    request.onload = function() {
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
             // Begin accessing JSON data here*/
            document.getElementById("menu_book").innerHTML="";
            myObj = JSON.parse(request.response);
            if(myObj.length == 0){
                document.getElementById("search_book_name_msg").innerHTML = "Book not found! Please try again";
                return;
            }
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].title;
                if(s!= ""){
                    document.getElementById("menu_book").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            $("#select-btn").prop("disabled",false);
        }  
        else{
            document.getElementById("search_book_name_msg").innerHTML = "Book not found! Please try again";
        }
    }
    request.send();
}

function SelectBook(){
    var idx = document.getElementById("menu_book").options.selectedIndex;
    var item_selected = document.getElementById("menu_book").options.item(idx);
    //alert(item_selected.text);
    if(item_selected.text==""){
        alert("Please select a book in the menu!");
    }
    else{
        var description_list = document.getElementById("description_list");
        description_list.innerHTML="";
        var j;
        for(j=0; j< myObj.length; j++){ 
            //alert(myObj[j].name);     
            if(myObj[j].title==item_selected.text){
                selected_book= myObj[j];
                $("#add-btn").prop("disabled",false);
                break;
            }
        }
        //alert(JSON.stringify(selected_book));
        //alert(selected_book.image);
        if(selected_book.image == "Sorry, no picture for this book!"){       
            document.getElementById("photo_book_msg").innerHTML= selected_book.image;
            $('#photo_book').hide();
            $('#photo_book_msg').show();
        }
        else {
            document.getElementById("photo_book").src= selected_book.image;
            $('#photo_book_msg').hide();
            $('#photo_book').show();
        }
            
        description_list.innerHTML+= `<dt>Authors</dt> <dd> ${selected_book.authors}</dd>`; 
        description_list.innerHTML+= `<dt>Title</dt> <dd> ${selected_book.title}</dd>`;
        description_list.innerHTML+= `<dt>Category</dt> <dd> ${selected_book.categoryList}</dd>`;              
        document.getElementById("description").innerHTML = `${selected_book.description}`;
        document.getElementById("link").innerHTML = `<a href= "${selected_book.link}" target="_blank">${selected_book.link}</a>`;
        $('#right-column').show(100);    
        
    }
}

function RandomBook(){
    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/book/surprise/20`, true);
    request.onload = function() {
    // Begin accessing JSON data here
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
            document.getElementById("menu_book").innerHTML="";
            myObj = JSON.parse(request.response);
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].name;
                if(s!= ""){
                    document.getElementById("menu_book").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            $("#select-btn").prop("disabled",false);  
        }  
    }
    request.send();
}

function AdvancedSearchAuthors(){
    document.getElementById("filters_msg_authors").innerHTML = "";
    var search_book_name =  document.getElementById('authors').value;
    if(search_book_name == ""){
        document.getElementById("filters_msg_authors").innerHTML = "Please type an author!";
        return;
    }

    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/book/byAuthor/${search_book_name}`, true);
    request.onload = function() {
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
             // Begin accessing JSON data here
            document.getElementById("menu_book").innerHTML="";
            myObj = JSON.parse(request.response);
            if(myObj.length == 0){
                document.getElementById("filters_msg_authors").innerHTML = "Authors temporarily unavailable.";
                return;
            }
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].title;
                if(s!= ""){
                    document.getElementById("menu_book").innerHTML +=  `<option value=${s}> ${s}</option>`;
                }
            }
            $("#select-btn").prop("disabled",false);
        }  
        else{
            document.getElementById("filters_msg_authors").innerHTML = "Authors temporarily unavailable.";
        }
    }

    request.send();
}

function AdvancedSearchCategory(){
    document.getElementById("filters_msg_category").innerHTML = "";
    var search_book_name =  document.getElementById('category').value;
    if(search_book_name == ""){
        document.getElementById("filters_msg_category").innerHTML = "Please type a category!";
        return;
    }

    var request = new XMLHttpRequest();
    request.open('GET', `https://pacific-stream-14038.herokuapp.com/book/category/${search_book_name}/10`, true);
    request.onload = function() {
        if (request.readyState == 4 && request.status >= 200 && request.status < 400){
             // Begin accessing JSON data here
            document.getElementById("menu_book").innerHTML="";
            myObj = JSON.parse(request.response);
            if(myObj.length == 0){
                document.getElementById("filters_msg_category").innerHTML = "Category temporarily unavailable.";
                return;
            }
            var s;
            for(var i=0; i< myObj.length; i++){
                s = myObj[i].title;
                if(s!= ""){
                    document.getElementById("menu_book").innerHTML +=  `<option value=${s}> ${s}</option>`;
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

function addBook(){
    localStorage.book=JSON.stringify(selected_book);
    
    var perfect_night = JSON.parse(localStorage.perfect_night);
    perfect_night.book = selected_book.volume_id;
    localStorage.perfect_night = JSON.stringify(perfect_night);


    window.location.href='javascript:history.go(-1)';
}