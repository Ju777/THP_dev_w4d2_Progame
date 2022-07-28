import { displayPlatformsLogos } from "./displayPlatformsLogos";
import { cardsMouseover } from "./cardsMouseover";

export { PageList };


const PageList = (argument = '', listSizeFilter = 9, platformId = '', developer = '', publisher = '', genre = '', tag = '') => {
  window.scrollTo(0, 150);
  const preparePage = () => {
      const cleanedArgument = argument.trim().replace(/\s+/g, '-');

      const displayResults = (games) => {
        const resultsContent = games.map((game) => (
            `<div id="game-${game.id}-card" class="card-container">

                <div id="game-${game.id}-image-container" class="game-image-container">
                  <img src="${game.background_image}" alt="video game image" class="image-in-card"/>
                </div>

                <div class="game-name-container">
                  <a href="#pagedetail/${game.id}"><p class="game-name">${game.name}</p></a>
                </div>

                <div id="game-${game.id}-platforms" class="platforms-container">
                </div>

            </div>`


          ));
        let allsCardsContainer = document.getElementById('all-cards-container');
        allsCardsContainer.innerHTML = resultsContent.join("\n");

        // Affichage des plateformes de chaque jeu.
        // const fetchPlatforms = (gameData, url) => {
          // Log de vérif
          // console.log('On est dans fetchPlatforms :\n', "url => ", url, "\n", "argument => ", argument);
             fetch(`https://api.rawg.io/api/platforms/lists/parents?ordering=name&key=${process.env.RAWG_API_KEY}`)
            .then((response) => response.json())
            .then((responseData) => {
              // Log : juste pour avoir toutes les propriétés de l'objet responseData
              // console.log('fetchPlatforms', responseData.results);
              let allPlatforms = responseData.results;
              // displayPlatforms(gameData, allPlatforms);
              displayPlatformsLogos(games, allPlatforms);
            });
        // };

        

        // Mise en place du mouseover sur les cards de jeu
        cardsMouseover(games);

      };

      const fetchList = (url, argument) => {
        // Log de vérif
        // console.log('On est dans PageList :\n', "url => ", url, "\n", "argument => ", argument);

        const finalURL = argument ? `${url}&search=${argument}` : url;
        fetch(finalURL)
          .then((response) => response.json())
          .then((responseData) => {
            // console.log('fetchList', responseData.results);
            displayResults(responseData.results);
          });
      };

      if(platformId) {
        fetchList(`https://api.rawg.io/api/games?page_size=${listSizeFilter}&platforms=${platformId}&key=${process.env.RAWG_API_KEY}`, cleanedArgument);
        
      } else if(developer) {
        fetchList(`https://api.rawg.io/api/games?page_size=${listSizeFilter}&developers=${developer}&key=${process.env.RAWG_API_KEY}`, cleanedArgument)
      } else if(publisher) {
        fetchList(`https://api.rawg.io/api/games?page_size=${listSizeFilter}&publishers=${publisher}&key=${process.env.RAWG_API_KEY}`, cleanedArgument)
      } else if(genre) {
        fetchList(`https://api.rawg.io/api/games?page_size=${listSizeFilter}&genres=${genre}&key=${process.env.RAWG_API_KEY}`, cleanedArgument)
      } else if(tag) {
        fetchList(`https://api.rawg.io/api/games?page_size=${listSizeFilter}&tags=${tag}&key=${process.env.RAWG_API_KEY}`, cleanedArgument)
      } else {
        fetchList(`https://api.rawg.io/api/games?page_size=${listSizeFilter}&dates=2022-01-01&key=${process.env.RAWG_API_KEY}`, cleanedArgument);
      }
 
      const showmoreButton = document.getElementById('showmore-button');
      showmoreButton.style.display = 'block';
    };
  
    const render = () => {
      pageContent.innerHTML = `
        <section class="page-list">
          <div class="articles"></div>
        </section>
      `;
  
      preparePage();
    };
  
    render();
  };