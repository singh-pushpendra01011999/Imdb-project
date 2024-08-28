let favoriteMovies=[];
document.addEventListener('DOMContentLoaded', () => {
  const movieList = document.getElementById('favorite-movie-list');
  
   favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies'));

  console.log(favoriteMovies);

  favoriteMovies.forEach((movie) => {
    let cardElement = document.createElement('div');
    cardElement.classList.add("main-fav-card");
    cardElement.innerHTML = `
        <img src="${movie.Poster}" class="fav-card-img" alt="${movie.Title}">
        <div class="card-body">
            <h5 class="card-title">${movie.Title}</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
            <p class="card-text"><small class="text-body-secondary">${movie.Year}</small></p>
          
        </div>`;
    movieList.appendChild(cardElement);
  })
});