//onlick recap button
function GoToRecap(){
    //checking category input 
    var category = document.getElementById("category").value;
    if(category == ""){
        var answer = confirm("Are you sure you don't want to set a category for your night?");
        if(answer){
            category = "No category";
        }
        else{
            return;
        }
    }
    var perfect_night = JSON.parse(localStorage.perfect_night);
    var bool_issolo = perfect_night.bool_issolo;

    //adding tag_type ( = category) property to perfect night object in localStorage
    perfect_night.tag_type = category;

    //adding description property to perfect night object in localStorage
    var description = document.getElementById("description").value;
    if(description != ""){
        perfect_night.description = description;
    }
    else{
        perfect_night.description = "No description";
    }

    localStorage.perfect_night = JSON.stringify(perfect_night);

    //redirect browser
    if(bool_issolo){        
        window.location.href='recapSolo.html';
    }
    else{        
        window.location.href='recapCompany.html';
    }
}

//onload function
function CheckStorage(){
    var perfect_night = JSON.parse(localStorage.perfect_night);
    //checking if tag_type & description are already in the perfect night object
    if(typeof(perfect_night.tag_type) != "undefined"){
        document.getElementById("category").value = perfect_night.tag_type;
    }
    if(typeof(perfect_night.description) != "undefined"){
        document.getElementById("description").value = perfect_night.description;
    }
}