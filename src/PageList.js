import { displayPlatformsLogos } from "./displayPlatformsLogos";
import { cardsMouseover } from "./cardsMouseover";

export { PageList };

const PageList = (argument = '', listSizeFilter = 9, platformId = '') => {
  // console.log('platformIdFilter', platformIdFilter);
  // Récupération du choix de plateforme
  // let platformIdFilter = platformFilter[0];

    const preparePage = () => {
      const cleanedArgument = argument.trim().replace(/\s+/g, '-');

      const displayResults = (games) => {
        const resultsContent = games.map((game) => (
            `<div id="game-${game.id}-card" class="one-card-container">
              <div id="game-${game.id}-image-container" "class="background-image-container">
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
        displayPlatformsLogos(games);

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
            console.log(responseData.results);
            displayResults(responseData.results);
          });
      };

      if(platformId === '') {
        fetchList(`https://api.rawg.io/api/games?page_size=${listSizeFilter}&dates=2022-01-01&key=${process.env.RAWG_API_KEY}`, cleanedArgument);
      } else {
        fetchList(`https://api.rawg.io/api/games?page_size=${listSizeFilter}&platforms=${platformId}&key=${process.env.RAWG_API_KEY}`, cleanedArgument);
      }
      
      const showmoreButton = document.getElementById('showmore-button');
      showmoreButton.style.display = 'block';
    };
  
    const render = () => {
      pageContent.innerHTML = `
        <section class="page-list">
          <div class="articles">Loading...</div>
        </section>
      `;
  
      preparePage();
    };
  
    render();
  };