'use strict';
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");
const test = document.querySelector(".test");

// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderMovies(movies.results);
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=${atob(
    "NTQyMDAzOTE4NzY5ZGY1MDA4M2ExM2M0MTViYmM2MDI="
  )}`;
};
//console.log(constructUrl(`movie/now_playing`));
// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  const creditRes = await fetchCredits(movie.id);
  const similarRes = await fetchSimilar(movie.id); 
  const trailerRes = await fetchTrailer(movie.id);
  // console.log(similarRes);
  renderMovie(movieRes,creditRes,similarRes,trailerRes);
  // console.log(movieDetails(movie));
};
const personDetails = async(id)=>{
  const actorres = await fetchActor(cast.id)
}
//    genre, production , language, popularity
// we need youtube trailer, actors, rating
// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchCredits= async(movieId)=>{
  const url= constructUrl(`movie/${movieId}/credits`);
  const res = await fetch (url);
  return res.json();
}
const fetchSimilar = async(movieId)=>{
  const url = constructUrl(`movie/${movieId}/similar`);
  const res = await fetch(url);
  return res.json();
}
const fetchTrailer = async(movieId)=>{
  const url = constructUrl(`movie/${movieId}/videos`);
  const res = await fetch(url);
  return res.json();
}
// console.log(fetchCredits(454626));
  
  const fetchMovies = async () => {
  const url = constructUrl(`movie/now_playing`);
  const res = await fetch(url);
  return res.json();
};
// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  movies.map((movie) => {
    const movieDiv = document.createElement("div");
    movieDiv.setAttribute("class","container")
    movieDiv.innerHTML = `
   <div class="row">
	  <div class="col-md-12">
							<img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${
      movie.title
    } poster">
        <h3>${movie.title}</h3>
        </div>
						</div>`;
        
    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });
    CONTAINER.appendChild(movieDiv);
  });
};

// You'll need to play with this function in order to add features and enhance the style.

const renderMovie = (movie,credits,similar,trailer) => {
  const actors = credits.cast.slice(0,5).map(function (actor){
    return `<div class="oneActor">
    <img Class="actorImg" src=${BACKDROP_BASE_URL+ actor.profile_path} width= 300><li class="actorName">${actor.name}</li> </div>`});

 let director = [];
    let crew = credits.crew;
       crew.forEach((e)=>{
          if(e.job ==="Director") {
                director.push(e.name) }});

let production= movie.production_companies.slice(0,3).map(function(e){
  return `<div class="oneProduction"><img src=${BACKDROP_BASE_URL+ e.logo_path} width= 150> 
  <p> ${e.name}</p> </div>
  `
});
let related = similar.results.slice(0,5).map(function(e){
return `<div class="oneSimilar">
<img src = "${BACKDROP_BASE_URL+ e.backdrop_path} "width= 300><li> ${e.title}</li></div>
`});
let trailerVideos = trailer.results.map(function(e){
  return `<div class="oneTrailer">
  <iframe width="300" height="315" src="https://www.youtube.com/embed/${e.key}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><li> ${e.name}</li></div>`
})
  test.innerHTML = `
    <div class="row">
        <div class="col-md-3 col-lg-6">
             <img id="movie-backdrop" src=${
               BACKDROP_BASE_URL + movie.backdrop_path
             }>
        </div>
        <div class="col-md-8">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${
              movie.release_date
            }</p>
            <p id="movie-runtime"><b>Runtime:</b> ${movie.runtime} Minutes</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
        </div>
        </div>
            <h3>Actors:</h3>
            <ul id="actors" class="list-unstyled">
               ${actors.join(" ")}
            </ul>
            <h4>Director :${director} </h4>
            <h4>Movie language:${movie.original_language}</h4>
            <h4>Up Votes: ${movie.popularity}</h4>
            <h4> Trailers:</h4>
            <ul id ="trailers">
            ${trailerVideos.join(" ")}
            </ul>
            <h4> production companies : </h4>
            <ul id="production">
            ${production.join(" ")}
            </ul>
            <h4> Similar Movies: </h4>
            <ul id= "similar">
            ${related.join(" ")}
            </ul>
            

            
    </div>`;
  
};
function actorDetail(id){

}




document.addEventListener("DOMContentLoaded", autorun);
