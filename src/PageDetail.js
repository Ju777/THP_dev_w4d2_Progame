import { gameDetails } from './gameDetails';
import { gameStores } from './gameStores';
import { gameTrailer } from './gameTrailer';
import { gameScreenshots } from './gameScreenshots';
import { gameYoutube } from './gameYoutube';
import { similarGames } from './similarGames';

// const PageDetail = (argument = '') => {
//   console.log('Page Détail', argument);
// }

export { PageDetail };

const PageDetail = (argument) => {
    const preparePage = () => {
      const cleanedArgument = argument.trim().replace(/\s+/g, "-");
  
      const displayGame = (responseData) => {
        gameDetails(responseData);
        gameStores(responseData);
        gameTrailer(responseData);
        gameScreenshots(responseData);
        gameYoutube(responseData);
        similarGames(responseData);
      };
  
      const fetchGame = (url, argument) => {
        // Log de vérif
        console.log('On est dans PageDetail :\n', "url => ", url, "\n", "argument => ", argument);
        fetch(`${url}/${argument}?key=${process.env.RAWG_API_KEY}`)
          .then((response) => response.json())
          .then((responseData) => {
            // Log : juste pour avoir toutes les propriétés de l'objet responseData
            console.log(responseData);
            displayGame(responseData);
          });
      };
  
      fetchGame('https://api.rawg.io/api/games', cleanedArgument);
    };
  
    const render = () => {
      pageContent.innerHTML = `
        <section class="page-detail">
          <div class="article">
            <h1 class="title"></h1>
            <p class="release-date">Release date : <span></span></p>
            <p class="description"></p>
          </div>
        </section>
      `;
  
      preparePage();
    };
  
    render();
  };