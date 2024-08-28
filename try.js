const movieDetails=[];
const favoriteMoviesDetails=[];


async function popularMovie(){
  const apiKey="e612bb26";
  // const url=`http://www.omdbapi.com/?i=tt3896198&apikey=${apiKey}`;
  const searchMovie=['Avengers', 'Star Wars', 'Batman'];
  
  try{
    for(const term of searchMovie){
        
      const response=await fetch(`http://www.omdbapi.com/?s=${term}&apikey=${apiKey}`);
      
      const data= await response.json();
      if(data.Search){
        movieDetails.push(...data.Search);
      }
    }
        console.log(movieDetails);
        createCard();
        
        
        
      }catch(error){
        console.log("error fecting data:", error);
      }
    } 
    popularMovie();
    
    function createCard(){  
      for(let i=0;i<12;i++){
        let cardElement=document.createElement('div');
        cardElement.classList.add("card","border", "border-black");
        //cardElement.classList.add("border border-black");
        cardElement.innerHTML=
        `
        
        <img src="${movieDetails[i].Poster}" class="card-img-top" alt="...">
        <div class="card-body">
        <h5 class="card-title">${movieDetails[i].Title}</h5>
      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p class="card-text"><small class="text-body-secondary">${movieDetails[i].Year}</small></p>
      <button class="favorite-btn  like" data-index="${i}">Add to Favorites</button>
      </div>`
      
      let container = document.getElementById('cardlist');
      container.appendChild(cardElement);
      
    
      const cont = document.querySelector('#container');
      const popup = document.querySelector('#moviePopup');
      
      const closePopup = document.querySelector('#closePopup');
        const popupPoster = document.querySelector('#popupPoster');
        const popupTitle = document.querySelector('#popupTitle');
        const popupYear = document.querySelector('#popupYear');
        const popupPlot = document.querySelector('#popupPlot');
        
       
          cardElement.addEventListener("click",(event)=>{
        if (!event.target.classList.contains('favorite-btn')) {
          popupPoster.src= movieDetails[i].Poster;
          popupTitle.innerText = movieDetails[i].Title;
          popupYear.innerText = `Year: ${movieDetails[i].Year}`;
        
          popupPlot.innerText = movieDetails[i]?.Plot || "Plot details not available.";

          
          
          popup.classList.remove('hidden');
          cont.classList.add('blur-background');
        }
        })
          closePopup.addEventListener("click", () => {
          popup.classList.add('hidden');
          cont.classList.remove('blur-background');
        }
      );
        const likeButton = cardElement.querySelector('.favorite-btn.like');
        
        // Add event listener to the button
        
        likeButton.addEventListener("click", function(event){
          event.stopPropagation();
          console.log(movieDetails[i].Title);
          likeButton.Disabled=true;
          favoriteMoviesDetails.push(movieDetails[i]);
          // console.log(favoriteMoviesDetails);
          
        });
      };
      
    }
    
    let searchWord = "";
    document.addEventListener('DOMContentLoaded', () => {
      const searchInput = document.querySelector('#search');
      const searchButton = document.querySelector('#search-btn');
      // const searchInputValue= document.querySelector("#search").value;
      if (searchInput && searchButton) {
        
  
          searchButton.addEventListener("click", async () => {
              const searchWord = searchInput.value;
              if (searchWord) {
                  try {
                      const response = await fetch(`http://www.omdbapi.com/?s=${searchWord}&apikey=e612bb26`);
                      const data1 = await response.json();
                      console.log(data1);
                      displaySearchData(data1);
                  } catch (error) {
                      console.error("Error fetching data:", error);
                  }
              } else {
                  alert("Please enter a search term.");
              }
          });
      } else {
          console.error("Search input or button not found.");
      }
  });
  
  function displaySearchData(data1) {
      const container = document.querySelector('#cardlist');
      if (container) {
          container.innerHTML = '';  // Clear existing content
          data1.Search.forEach((movie, index) => {
              let cardElement = document.createElement('div');
              cardElement.classList.add("card", "border", "border-black");
              cardElement.innerHTML = `
                  <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                  <div class="card-body">
                      <h5 class="card-title">${movie.Title}</h5>
                      <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                      <p class="card-text"><small class="text-body-secondary">${movie.Year}</small></p>
                      <button class="favorite-btn like" data-index="${index}">Add to Favorites</button>
                  </div>`;
              container.appendChild(cardElement);
              
              
              const popup = document.querySelector('#moviePopup');
              const cont = document.querySelector('#container');
              
              const closePopup = document.querySelector('#closePopup');
              const popupPoster = document.querySelector('#popupPoster');
              const popupTitle = document.querySelector('#popupTitle');
              const popupYear = document.querySelector('#popupYear');
              const popupPlot = document.querySelector('#popupPlot');
              
             
              cardElement.addEventListener("click",(event)=>{
              if (!event.target.classList.contains('favorite-btn')) {
                
                
                popupPoster.src = movie.Poster;
                popupTitle.innerText = movie.Title;
                popupYear.innerText = `Year: ${movie.Year}`;
              
                popupPlot.innerText = movieDetails[index]?.Plot || "Plot details not available.";

                
                
                popup.classList.remove('hidden');
                cont.classList.add('blur-background');
              }
              })
              closePopup.addEventListener("click", () => {
                popup.classList.add('hidden');
                cont.classList.remove('blur-background');
                }
            );



              const likeButton = cardElement.querySelector('.favorite-btn.like');
        
              // Add event listener to the button
              likeButton.addEventListener("click", function(event){
                event.stopPropagation();
                console.log(movie.Title);
                favoriteMoviesDetails.push(movie);
                // console.log(favoriteMoviesDetails);
                
              });

          });
      } else {
          console.error("Element with ID 'cardlist' not found.");
      }
  }
  



document.getElementById('home').addEventListener("click",()=>{
  const container = document.querySelector('#cardlist');
  container.innerHTML="";
  createCard();
})




// Storing the movie data in localStorage when the button is clicked
document.getElementById('Watchlist').addEventListener('click', () => {
  localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMoviesDetails));
  window.location.href = "favorite.html"; // Redirect to index1.html
});
    
      





