$(document).ready(function () {

  var nights = JSON.parse(localStorage.getItem("nights"));
 
  var id = localStorage.getItem("night_id");
  var index = 0;
  for (var i = 0; i < nights.length; i++) {
    if (nights[i].id == id) {
      index = i;
      break;
    }
  }
  var found_night = nights[index];
  document.getElementById("desc").innerHTML += found_night.description;
  document.getElementById("tag").innerHTML += found_night.tag_type;

  if (found_night.meal.name != undefined) {
    $("#meal_container").show();
    var img = document.createElement("img");
    img.className = "img-thumbnail";
    img.src = found_night.meal.image;
    document.getElementById("col-sx-meal").appendChild(img);

    document.getElementById("meal_name").innerHTML = found_night.meal.name;
    document.getElementById("meal_category").innerHTML =
      found_night.meal.category;
    document.getElementById("meal_description").innerHTML =
      found_night.meal.cuisine;
    var length = found_night.meal.ingredients.length;

    if (length > 0) {
      document.getElementById("meal_ingredients").innerHTML += "<br>";
      for (var i = 0; i < length; i++) {
        var qt = found_night.meal.quantities[i];
        var ing = found_night.meal.ingredients[i];
        document.getElementById("meal_ingredients").innerHTML +=
          qt + " of " + ing + "<br>";
      }
    }
    document.getElementById("meal_recipe").innerHTML =
      found_night.meal.instructions;
  } else {
    $("#meal_container").hide();
  }

  if (found_night.cocktail.name != undefined) {
    $("#cocktail_container").show();
    var img = document.createElement("img");
    img.className = "img-thumbnail";
    img.src = found_night.cocktail.image;
    document.getElementById("col-sx-cocktail").appendChild(img);
    document.getElementById("cocktail_name").innerHTML +=
      found_night.cocktail.name;
    document.getElementById("cocktail_category").innerHTML +=
      found_night.cocktail.category;
    var length = found_night.cocktail.ingredients.length;
    if (length > 0) {
      document.getElementById("cocktail_ingredients").innerHTML += "<br>";
      for (var i = 0; i < length; i++) {
        var qt = found_night.cocktail.quantities[i];
        var ing = found_night.cocktail.ingredients[i];
        document.getElementById("cocktail_ingredients").innerHTML +=
          qt + "of: " + ing + "<br>";
      }
    }
    document.getElementById("cocktail_instructions").innerHTML =
      "<br>" + found_night.cocktail.instructions;
  } else {
    $("#cocktail_container").hide();
  }

  if (found_night.board_game.name != undefined) {
    $("#board_game_container").show();
    var img = document.createElement("img");
    img.className = "img-thumbnail";
    img.src = found_night.board_game.imageUrl;
    document.getElementById("col-sx-board_game").appendChild(img);

    document.getElementById("bg_name").innerHTML = found_night.board_game.name;
    document.getElementById("bg_mint").innerHTML =
      found_night.board_game.minPlaytime;
    document.getElementById("bg_maxt").innerHTML =
      found_night.board_game.maxPlaytime;
    document.getElementById("bg_minp").innerHTML =
      found_night.board_game.minPlayers;
    document.getElementById("bg_maxp").innerHTML =
      found_night.board_game.maxPlayers;
    document.getElementById("bg_mina").innerHTML =
      found_night.board_game.minAge;
    document.getElementById("bg_desc").innerHTML =
      found_night.board_game.description;
    document.getElementById("bg_rating").innerHTML =
      found_night.board_game.averageRating;
  } else {
    $("#board_game_container").hide();
  }

  if (found_night.beer.name != undefined) {
    $("#beer_container").show();

    if (found_night.beer.image == "Sorry, no picture provided for this beer") {
      var my_beer_img = document.createElement("img");
      my_beer_img.className = "img-thumbnail";
      my_beer_img.src = "jedi.jpg";
    } else {
      var my_beer_img = document.createElement("img");
      my_beer_img.className = "img-thumbnail";
      my_beer_img.src = found_night.beer.image;
    }

    document.getElementById("col-sx-beer").appendChild(my_beer_img);

    document.getElementById("beer_name").innerHTML = found_night.beer.name;
    document.getElementById("beer_category").innerHTML =
      found_night.beer.category;
    document.getElementById("beer_abv").innerHTML = found_night.beer.abv;
    document.getElementById("beer_ibu").innerHTML = found_night.beer.ibu;
    document.getElementById("beer_description").innerHTML =
      found_night.beer.description;
    document.getElementById("beer_category_description").innerHTML =
      found_night.beer.categoryDescription;
  } else {
    $("#beer_container").hide();
  }

  if (found_night.artist.id != undefined) {
    $("#music_container").show();
    var my_music_img = document.createElement("img");
    my_music_img.className = "img-thumbnail";
    my_music_img.src = found_night.artist.album_image;
    document.getElementById("col-sx-music").appendChild(my_music_img);

    document.getElementById("music_name").innerHTML = found_night.artist.name;
    var my_artists = found_night.artist.artists;

    var t = 0;
    var len = my_artists.length;
    for (t = 0; t < len; t++) {
      if (t == len - 1) {
        document.getElementById("music_artist").innerHTML += my_artists[t];
      } else {
        document.getElementById("music_artist").innerHTML +=
          my_artists[t] + " & ";
      }
    }

    document.getElementById("music_popularity").innerHTML =
      found_night.artist.popularity;

    document.getElementById("music_date").innerHTML =
      found_night.artist.release_date;

    if (found_night.artist.tracks != undefined) {
      $("#album_tracks").show();
      $("#album_label").show();
      var my_artists = found_night.artist.tracks;

      var t = 0;
      var len = my_artists.length;
      for (t = 0; t < len; t++) {
        if (t == len - 1) {
          document.getElementById("music_tracks").innerHTML += my_artists[t];
        } else {
          document.getElementById("music_tracks").innerHTML +=
            my_artists[t] + " <br>";
        }
      }
      document.getElementById("music_label").innerHTML =
        found_night.artist.label;
    } else {
      $("#album_tracks").hide();

      $("#album_label").hide();
    }
  } else {
    $("#music_container").hide();
  }

  if (found_night.book.volume_id != undefined) {
    $("#book_container").show();

    if (found_night.book.image == "Sorry, no picture for this book!") {
      var my_book_img = document.createElement("img");
      my_book_img.className = "img-thumbnail";
      my_book_img.src = "jedi.jpg";
    } else {
      var my_book_img = document.createElement("img");
      my_book_img.className = "img-thumbnail";
      my_book_img.src = found_night.book.image;
    }

    document.getElementById("col-sx-book").appendChild(my_book_img);

    document.getElementById("book_title").innerHTML = found_night.book.title;
    var my_authors = found_night.book.authors;

    var t = 0;
    var len = my_authors.length;
    for (t = 0; t < len; t++) {
      if (t == len - 1) {
        document.getElementById("book_authors").innerHTML += my_authors[t];
      } else {
        document.getElementById("book_authors").innerHTML +=
          my_authors[t] + " & ";
      }
    }
    document.getElementById("book_plot").innerHTML =
      found_night.book.description;

    if (typeof found_night.book.categoryList != "string") {
      var category = found_night.book.categoryList;

      var t = 0;
      var len = category.length;
      for (t = 0; t < len; t++) {
        if (t == len - 1) {
          document.getElementById("book_category").innerHTML += category[t];
        } else {
          document.getElementById("book_category").innerHTML +=
            category[t] + " & ";
        }
      }
    } else {
      document.getElementById("book_category").innerHTML =
        found_night.book.categoryList;
    }
  } else {
    $("#book_container").hide();
  }

  if (found_night.movie.year != undefined) {
    $("#film_container").show();

    
    if (found_night.movie.playbill == null) {

      var my_film_img = document.createElement("img");
      my_film_img.className = "img-thumbnail";
      my_film_img.src = "jedi.jpg";
    } else {
      var my_film_img = document.createElement("img");
      my_film_img.className = "img-thumbnail";

      my_film_img.src = found_night.movie.playbill;
    }

    document.getElementById("col-sx-movie").appendChild(my_film_img);

    document.getElementById("movie_title").innerHTML = found_night.movie.title;
    document.getElementById("movie_date").innerHTML = found_night.movie.year;
    document.getElementById("movie_plot").innerHTML = found_night.movie.plot;
    if (
      found_night.movie.genres != null ||
      found_night.movie.genres.length > 0
    ) {
      var genres = found_night.movie.genres;
      var t = 0;
      var len = genres.length;
      for (t = 0; t < len; t++) {
        if (t == len - 1) {
          document.getElementById("movie_genres").innerHTML += genres[t];
        } else {
          document.getElementById("movie_genres").innerHTML +=
            genres[t] + " <br> ";
        }
      }
    } else {
      document.getElementById("movie_genres").innerHTML = "No genres available";
    }

    document.getElementById("movie_popularity").innerHTML =
      found_night.movie.popularity;
    document.getElementById("movie_average").innerHTML =
      found_night.movie.voteAverage;

    if (
      found_night.movie.director != null &&
      found_night.movie.director.length > 0
    ) {
      var my_authors = found_night.movie.director;

      var t = 0;
      var len = my_authors.length;
      for (t = 0; t < len; t++) {
        if (t == len - 1) {
          document.getElementById("movie_dir").innerHTML += my_authors[t];
        } else {
          document.getElementById("movie_dir").innerHTML +=
            my_authors[t] + " <br> ";
        }
      }
    } else {
      document.getElementById("movie_dir").innerHTML = "No directors available";
    }
    if (found_night.movie.cast != null && found_night.movie.cast.length > 0) {
      var my_cast = found_night.movie.cast;
      var t = 0;
      var len = my_cast.length;
      for (t = 0; t < len; t++) {
        if (t == len - 1) {
          document.getElementById("movie_cast").innerHTML += my_cast[t];
        } else {
          document.getElementById("movie_cast").innerHTML +=
            my_cast[t] + " <br> ";
        }
      }
    } else {
      document.getElementById("movie_cast").innerHTML = "No cast available";
    }

    if (
      found_night.movie.languages != null &&
      found_night.movie.languages.length > 0
    ) {
          document.getElementById("movie_lan").innerHTML += found_night.movie.languages;
    } else {
      document.getElementById("movie_lan").innerHTML =
        "Sorry no languages available";
    }

    if (
      found_night.movie.country_prod != null &&
      found_night.movie.country_prod.length > 0
    ) {
      var my_country = found_night.movie.country_prod;

      var t = 0;
      var len = my_country.length;
      for (t = 0; t < len; t++) {
        if (t == len - 1) {
          document.getElementById("movie_prod").innerHTML += my_country[t];
        } else {
          document.getElementById("movie_prod").innerHTML +=
            my_country[t] + " <br> ";
        }
      }
    } else {
      document.getElementById("movie_prod").innerHTML =
        "Sorry no country available";
    }
  } else {
    $("#movie_container").hide();
  }

  if (found_night.movie.firstAirDate != undefined) {
    $("#tv_container").show();

    if (found_night.movie.playbill == null) {
      var my_tv_img = document.createElement("img");
      my_tv_img.className = "img-thumbnail";
      my_tv_img.src = "jedi.jpg";
    } else {
      var my_tv_img = document.createElement("img");
      my_tv_img.className = "img-thumbnail";
      my_tv_img.src = found_night.movie.playbill;
    }

    document.getElementById("col-sx-tv").appendChild(my_tv_img);

    document.getElementById("tv_title").innerHTML = found_night.movie.title;
    document.getElementById("tv_date").innerHTML =
      found_night.movie.firstAirDate;
    document.getElementById("tv_plot").innerHTML = found_night.movie.plot;
    if (
      found_night.movie.genres != null &&
      found_night.movie.genres.length > 0
    ) {
      var genres = found_night.movie.genres;
      var t = 0;
      var len = genres.length;
      for (t = 0; t < len; t++) {
        if (t == len - 1) {
          document.getElementById("tv_genres").innerHTML += genres[t];
        } else {
          document.getElementById("tv_genres").innerHTML +=
            genres[t] + " <br> ";
        }
      }
    } else {
      document.getElementById("tv_genres").innerHTML = "No genres available";
    }
    document.getElementById("tv_popularity").innerHTML =
      found_night.movie.popularity;
    document.getElementById("tv_average").innerHTML =
      found_night.movie.voteAverage;

    if (
      found_night.movie.creators != null &&
      found_night.movie.creators.length > 0
    ) {
      var my_authors = found_night.movie.creators;

      var t = 0;
      var len = my_authors.length;
      for (t = 0; t < len; t++) {
        if (t == len - 1) {
          document.getElementById("tv_creators").innerHTML += my_authors[t];
        } else {
          document.getElementById("tv_creators").innerHTML +=
            my_authors[t] + " <br> ";
        }
      }
    } else {
      document.getElementById("tv_creators").innerHTML =
        "Sorry no creators available";
    }

    if (
      found_night.movie.writers != undefined &&
      found_night.movie.writers != null &&
      found_night.movie.writers.length > 0
    ) {
      var my_authors = found_night.movie.writers;

      var t = 0;
      var len = my_authors.length;
      for (t = 0; t < len; t++) {
        if (t == len - 1) {
          document.getElementById("tv_writers").innerHTML += my_authors[t];
        } else {
          document.getElementById("tv_writers").innerHTML +=
            my_authors[t] + " <br> ";
        }
      }
    } else {
      document.getElementById("tv_writers").innerHTML =
        "Sorry no writers available";
    }
    if (found_night.movie.cast != null && found_night.movie.cast.length > 0) {
      var my_cast = found_night.movie.cast;

      var t = 0;
      var len = my_cast.length;
      for (t = 0; t < len; t++) {
        if (t == len - 1) {
          document.getElementById("tv_cast").innerHTML += my_cast[t];
        } else {
          document.getElementById("tv_cast").innerHTML += my_cast[t] + " <br> ";
        }
      }
    } else {
      document.getElementById("tv_cast").innerHTML = "Sorry no cast available";
    }
    if (
      found_night.movie.languages != null &&
      found_night.movie.languages.length > 0
    ) {
        document.getElementById("tv_lan").innerHTML = found_night.movie.languages;
    } else {
      document.getElementById("tv_lan").innerHTML =
        "Sorry no languages available";
    }

    if (
      found_night.movie.country_prod != null &&
      found_night.movie.country_prod.length > 0
    ) {
      var my_country = found_night.movie.country_prod;

      var t = 0;
      var len = my_country.length;
      for (t = 0; t < len; t++) {
        if (t == len - 1) {
          document.getElementById("tv_prod").innerHTML += my_country[t];
        } else {
          document.getElementById("tv_prod").innerHTML +=
            my_country[t] + " <br> ";
        }
      }
    } else {
      document.getElementById("tv_prod").innerHTML =
        "Sorry no country available";
    }
  } else {

    $("#tv_container").hide();
  }
});

