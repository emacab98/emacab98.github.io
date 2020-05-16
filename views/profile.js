var username = localStorage.getItem("username");

$(document).ready(function () {
  var first_night = true;
  var first_saved = true;
  var first_upvoted = true;

  document.getElementById("username_here").innerHTML = username + "'s profile";
  $("#message").hide();
  document.getElementById("message").innerHTML =
    "Your nights will appear here!Start creating now";
  document.getElementById("my_night").style.color = "white";

  //Funzione che carica le notti create dinamicamente
  function findNights() {
    $("#nights_section").show();
    $("#favourites_section").hide();
    $("#saved_section").hide();
    if (!first_night) {
      $("#message").hide();
      return;
    } else {
      first_night = false;
      populatePost("nights_section", "created");
    }
  }

  //Funzione che carica le notti salvate dinamicamente
  function findSavedNights() {
    $("#nights_section").hide();
    $("#favourites_section").hide();
    $("#saved_section").show();
    if (!first_saved) {
      $("#message").hide();
      return;
    } else {
      first_saved = false;
      populatePost("saved_section", "saved");
    }
  }

  //funzione che carica le notti preferite dinamicamente
  function findFavouriteNights() {
    $("#favourites_section").show();
    $("#saved_section").hide();
    $("#nights_section").hide();
    if (!first_upvoted) {
      $("#message").hide();
      return;
    } else {
      first_upvoted = false;
      populatePost("favourites_section", "upvoted");
    }
  }

  //chiamo questa subito perché di default si parte  con my nights selezionato
  findNights();

  //my_nights
  $("#my_night").click(function () {
    document.getElementById("my_night").style.color = "white";
    document.getElementById("my_saved").style.color = "rgb(153, 153, 153)";
    document.getElementById("my_favourite").style.color = "rgb(153, 153, 153)";
    findNights();
  });

  //my_saved
  $("#my_saved").click(function () {
    document.getElementById("my_saved").style.color = "white";
    document.getElementById("my_night").style.color = "rgb(153, 153, 153)";
    document.getElementById("my_favourite").style.color = "rgb(153, 153, 153)";
    findSavedNights();
  });

  //my_favourites
  $("#my_favourite").click(function () {
    document.getElementById("my_favourite").style.color = "white";
    document.getElementById("my_night").style.color = "rgb(153, 153, 153)";
    document.getElementById("my_saved").style.color = "rgb(153, 153, 153)";
    findFavouriteNights();
  });
});

function logout() {
  var result = confirm("Are you sure you want to logout?");
  if (result) {
    localStorage.clear;
    alert("You are logging out! Bye!");
    window.location.href = "Home.html";
  }
}

function reply_click() {
  window.localStorage.setItem("night_id", this.name);
  window.location.href = "Post_profile.html";
}

//funzione che carica i post dinamicamente
function populatePost(section, mode) {
  var nights = [];
  var request = new XMLHttpRequest();

  var path =
    "https://pacific-stream-14038.herokuapp.com/perfectnight/myProfile/" +
    username +
    "/" +
    mode;
  request.open("GET", path, true);
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      var risposta = JSON.parse(this.response);
      var risposta_str = JSON.stringify(this.response);

      if (risposta.length == 0) {
        if (mode == "created")
          document.getElementById("message").innerHTML =
            "Your nights will appear here! Start creating now!";
        else if (mode == "saved")
          document.getElementById("message").innerHTML =
            "Your saved nights will appear here! Browse some on the feed page!";
        else
          document.getElementById("message").innerHTML =
            "Your upvoted nights will appear here! Browse some on the feed page!";
        $("#message").show();
      } else {
        var risposta_len = risposta.length;
        $("#message").hide();
        var nights_section = document.getElementById(section);
        var index = 0;
        

        for (index = 0; index < risposta_len; index++) {
          var elementi = 0;
          nights[index] = risposta[index];
          var div_row = document.createElement("div");
          div_row.className = "row";

          var div_col = document.createElement("div");
          div_col.className = "col-sm-11";

          var div_well = document.createElement("div");
          div_well.className = "well";

          var my_desc_title = document.createElement("p");
          my_desc_title.className = "my_title";
          my_desc_title.innerHTML = "Description: ";
          var my_desc = document.createElement("span");
          my_desc.className = "my_elem";
          my_desc.innerHTML = risposta[index].description;
          my_desc_title.appendChild(my_desc);

          div_well.appendChild(my_desc_title);

          var my_tag_title = document.createElement("p");
          my_tag_title.className = "my_title";
          my_tag_title.innerHTML = "Tag: ";
          var my_tag = document.createElement("span");
          my_tag.className = "my_elem";
          my_tag.innerHTML = risposta[index].tag_type;
          my_tag_title.appendChild(my_tag);
          div_well.appendChild(my_tag_title);

          var my_elements_title = document.createElement("p");
          my_elements_title.className = "my_title";
          my_elements_title.innerHTML = "Elements: ";
          div_well.appendChild(my_elements_title);

          var list = document.createElement("div");
          list.className = "my_list";

          if (risposta[index].board_game.id != undefined) {
            elementi += 1;

            var board_game = risposta[index].board_game;
            var container1 = document.createElement("container");
            container1.className = "elem" + elementi;
            var my_board_game = document.createElement("span");
            my_board_game.className = "my_elem";
            my_board_game.innerHTML = board_game.name;

            var my_board_game_img = document.createElement("img");
            my_board_game_img.className = "img-thumbnail";
            my_board_game_img.src = board_game.imageUrl;

            var br = document.createElement("br");
            container1.appendChild(my_board_game);
            container1.appendChild(br);
            container1.appendChild(my_board_game_img);
            list.appendChild(container1);
          }

          if (risposta[index].meal.id != undefined) {
            elementi += 1;
            var container2 = document.createElement("container");
            container2.className = "elem" + elementi;

            var my_meal = document.createElement("span");
            my_meal.className = "my_elem";
            my_meal.innerHTML = risposta[index].meal.name;

            var br = document.createElement("br");
            var my_meal_img = document.createElement("img");
            my_meal_img.className = "img-thumbnail";
            my_meal_img.src = risposta[index].meal.image;

            container2.appendChild(my_meal);
            container2.appendChild(br);
            container2.appendChild(my_meal_img);
            list.appendChild(container2);
          }

          if (risposta[index].cocktail.id != undefined) {
            elementi += 1;
            var container3 = document.createElement("container");
            container3.className = "elem" + elementi;
            var my_cocktail = document.createElement("span");
            my_cocktail.className = "my_elem";
            my_cocktail.innerHTML = risposta[index].cocktail.name;

            var my_cocktail_img = document.createElement("img");
            my_cocktail_img.className = "img-thumbnail";
            my_cocktail_img.src = risposta[index].cocktail.image;

            var br = document.createElement("br");

            container3.appendChild(my_cocktail);
            container3.appendChild(br);
            container3.appendChild(my_cocktail_img);
            list.appendChild(container3);
          }
          if (risposta[index].beer.name != undefined) {
            elementi += 1;
            var container4 = document.createElement("container");
            container4.className = "elem" + elementi;
            var my_beer = document.createElement("span");
            my_beer.className = "my_elem";
            my_beer.innerHTML = risposta[index].beer.name;

            if (
              risposta[index].beer.image ==
              "Sorry, no picture provided for this beer"
            ) {
              var my_beer_img = document.createElement("img");
              my_beer_img.className = "img-thumbnail";
              my_beer_img.src = "jedi.jpg";
            } else {
              var my_beer_img = document.createElement("img");
              my_beer_img.className = "img-thumbnail";
              my_beer_img.src = risposta[index].beer.image;
            }

            var br = document.createElement("br");

            container4.appendChild(my_beer);
            container4.appendChild(br);
            container4.appendChild(my_beer_img);
            list.appendChild(container4);
          }

          if (risposta[index].artist.id != undefined) {
            elementi += 1;

            var container5 = document.createElement("container");
            container5.className = "elem" + elementi;
            var my_artist = document.createElement("span");
            my_artist.className = "my_elem";
            if (risposta[index].artist.tracks != undefined) {
              var string = "Album: " + risposta[index].artist.name + " by: ";
              var my_artists = risposta[index].artist.artists;

              var t = 0;
              var len = my_artists.length;
              for (t = 0; t < len; t++) {
                if (t == len - 1) {
                  string += my_artists[t];
                } else {
                  string += my_artists[t] + "& ";
                }
              }

              my_artist.innerHTML = string;
            } else {
              var string = "Song: " + risposta[index].artist.name + " by: ";
              var my_artists = risposta[index].artist.artists;

              var t = 0;
              var len = my_artists.length;
              for (t = 0; t < len; t++) {
                if (t == len - 1) {
                  string += my_artists[t];
                } else {
                  string += my_artists + "&  ";
                }
              }
              my_artist.innerHTML = string;
            }

            var my_artist_img = document.createElement("img");
            my_artist_img.className = "img-thumbnail";
            my_artist_img.src = risposta[index].artist.album_image;

            var br = document.createElement("br");

            container5.appendChild(my_artist);
            container5.appendChild(br);
            container5.appendChild(my_artist_img);
            list.appendChild(container5);
          }

          if (risposta[index].book.volume_id != undefined) {
            elementi += 1;

            var container6 = document.createElement("container");
            container6.className = "elem" + elementi;

            var my_book = document.createElement("span");
            my_book.className = "my_elem";
            var string = risposta[index].book.title + " by: <br> ";
            var my_authors = risposta[index].book.authors;

            var t = 0;
            var len = my_authors.length;
            for (t = 0; t < len; t++) {
              if (t == len - 1) {
                string += my_authors[t];
              } else {
                string += my_authors[t] + " & ";
              }
            }
            my_book.innerHTML = string;

            var br = document.createElement("br");

            if (
              risposta[index].book.image == "Sorry, no picture for this book!"
            ) {
              var my_book_img = document.createElement("img");
              my_book_img.className = "img-thumbnail";
              my_book_img.src = "jedi.jpg";
            } else {
              var my_book_img = document.createElement("img");
              my_book_img.className = "img-thumbnail";
              my_book_img.src = risposta[index].book.image;
            }

            container6.appendChild(my_book);
            container6.appendChild(br);
            container6.appendChild(my_book_img);
            list.appendChild(container6);
          }

          if (risposta[index].movie.id != undefined) {
            elementi += 1;

            var container7 = document.createElement("container");
            container7.className = "elem" + elementi;

            var my_film = document.createElement("span");
            my_film.className = "my_elem";
            my_film.innerHTML = risposta[index].movie.title;

            var br = document.createElement("br");

            if (risposta[index].movie.playbill == null) {
              var my_film_img = document.createElement("img");
              my_film_img.className = "img-thumbnail";
              my_film_img.src = "jedi.jpg";
            } else {
              var my_film_img = document.createElement("img");
              my_film_img.className = "img-thumbnail";
              my_film_img.src = risposta[index].movie.playbill;
            }

            container7.appendChild(my_film);
            container7.appendChild(br);
            container7.appendChild(my_film_img);
            list.appendChild(container7);
          }

          div_well.appendChild(list);

          var bottone = document.createElement("button");
          var br = document.createElement("br");

          bottone.type = "button";
          bottone.className += "post_button";
          bottone.name = risposta[index].id;

          var span = document.createElement("span");
          span.innerHTML = "More infos";
          bottone.onclick = reply_click;
          bottone.appendChild(span);

          div_well.appendChild(bottone);

          div_col.appendChild(div_well);

          div_row.appendChild(div_col);

          nights_section.appendChild(div_row);
        }
        localStorage.setItem("nights", JSON.stringify(nights));
      }
    } else {
      alert("Something went wrong. Message: " + this.responseText);
    }
  };
  request.send();
}
