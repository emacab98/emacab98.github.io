function GoToRecap(){
    var category = document.getElementById("category").value;
    if(category == ""){
        var answer = confirm("Are you sure you don't want to set a category for your night?");
        if(answer){
            category = "No category";
            //alert(category);
        }
        else{
            //alert("esco");
            return;
        }
    }
    var perfect_night = JSON.parse(localStorage.perfect_night);
    var bool_issolo = perfect_night.bool_issolo;

    perfect_night.tag_type = category;

    var description = document.getElementById("description").value;
    if(description != ""){
        //alert(description);
        perfect_night.description = description;
    }
    else{
        perfect_night.description = "No description";
    }

    localStorage.perfect_night = JSON.stringify(perfect_night);

    if(bool_issolo){        
        window.location.href='recapSolo.html';
    }
    else{        
        window.location.href='recapCompany.html';
    }
}