// https://www.omdbapi.com/?i=tt3896198&apikey=94bc61c0

$(document).ready(() => {
  $("#searchForm").on("submit", (e) => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  axios
    .get("https://www.omdbapi.com/?s=" + searchText + "&apikey=94bc61c0")
    .then((response) => {
      let movies = response.data.Search;
      let output = "";

      $.each(movies, (index, movie) => {
        let poster = movie.Poster;
        let title = movie.Title.substring(0, 20) + "...";

        if (poster == "N/A") {
          poster = "../images/not-found.png";
        }

        output += `
                <div class="col-md-3">
                 <div class="well text-center" >
                    <img src="${poster}">
                    <h5 title="${movie.Title}">${title}</h5>
                    <a onClick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                 </div>
                </div>
            `;
      });
      $("#movies").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "../movie.html";
  return false;
}

function getMovie() {
  let output = "";

  axios
    .get(
      "https://www.omdbapi.com/?i=" +
        sessionStorage.getItem("movieId") +
        "&apikey=94bc61c0"
    )
    .then((response) => {
      let movie = response.data;
      console.log(movie);
      output += `
        <div class="row">
         <div class="col-md-4" >
            <img src="${movie.Poster}" class="thumbnail">
         </div>
         <div class="col-md-8" >
            <h2 title="${movie.Title}">${movie.Title}</h2>
            <ul class="list-group">
                <li class="list-group-item"><strong>Title: </strong>${movie.Title}</li>
                <li class="list-group-item"><strong>Title: </strong>${movie.Title}</li>
                <li class="list-group-item"><strong>Title: </strong>${movie.Title}</li>
                <li class="list-group-item"><strong>Title: </strong>${movie.Title}</li>
                <li class="list-group-item"><strong>Title: </strong>${movie.Title}</li>
                <li class="list-group-item"><strong>Title: </strong>${movie.Title}</li>
                <li class="list-group-item"><strong>Title: </strong>${movie.Title}</li>
                <li class="list-group-item"><strong>Title: </strong>${movie.Title}</li>
            </ul>
         </div>
        </div>
           <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <hr>
            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;
      console.log(output);
      $("#movie").html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}
