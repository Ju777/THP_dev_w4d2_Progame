// const gameStores = () => {
//     console.log("gameStores ok.");
// }
import { displayPlatformsLogos } from "./displayPlatformsLogos";
export { similarGames } ;

const similarGames = (gameData) => {
    const preparePage = () => {
        // const cleanedArgument = argument.trim().replace(/\s+/g, "-"); ORIGINAL EN ATTENTE
    
        const cleanedArgument = gameData.id;         
    
        const fetchSimilarGames = (url, argument) => {
          // Log de vérif
          console.log('On est dans similarGames :\n', "url => ", url, "\n", "argument => ", argument);
             fetch(`${url}/${argument}/game-series?key=${process.env.RAWG_API_KEY}`)
            .then((response) => response.json())
            .then((responseData) => {
              // Log : juste pour avoir toutes les propriétés de l'objet responseData
              console.log(responseData.results);
              displaySimilarGames(responseData.results);
            });
        };
        fetchSimilarGames('https://api.rawg.io/api/games', gameData.id);
      };
  
      const render = () => {
        pageContent.innerHTML = `
          <section class="page-detail">
            <div class="article">
              <h1 class="title"></h1>
              <p class="release-date"><span></span></p>
              <p class="description"></p>
            </div>
          </section>
        `;
    
        preparePage();
      };
    
      render();
}

const displaySimilarGames = (similarGames) => { // Fonction non terminé car l'API limite le nombre de requêtes possible.
  console.log("displaySimilarGames OK.");

  var similarGamesContainer = document.getElementById('similar-games-container');

  similarGamesContainer = similarGames.map((game) => (
    similarGamesContainer.innerHTML+=
    `<div id="similar-game-${game.id}-card" class="card-container">

        <div id="similar-game-${game.id}-image-container" class="game-image-container">
          <img id="similar-game-${game.id}-image" src="${game.background_image}" alt="video game image" class="image-in-card"/>
        </div>

        <div class="game-name-container">
          <a href="#pagedetail/${game.id}"><p class="game-name">${game.name}</p></a>
        </div>

        <div id="similar-game-${game.id}-platforms" class="platforms-container">
        </div>

    </div>`


  ));
let allsCardsContainer = document.getElementById('all-cards-container');
allsCardsContainer.innerHTML = similarGamesContainer.join("\n");

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
      displayPlatformsLogos(similarGames, allPlatforms);
    });
// };
  }