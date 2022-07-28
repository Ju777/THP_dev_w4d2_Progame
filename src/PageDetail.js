import { gameDetails } from './gameDetails';
import { gameStores } from './gameStores';
import { gameTrailer } from './gameTrailer';
import { gameScreenshots } from './gameScreenshots';
import { gameYoutube } from './gameYoutube';
import { similarGames } from './similarGames';
import anime from 'animejs';

// const PageDetail = (argument = '') => {
//   console.log('Page Détail', argument);
// }

export { PageDetail };

const PageDetail = (argument) => {
  window.scrollTo(0, 0);


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
      // console.log('On est dans PageDetail :\n', "url => ", url, "\n", "argument => ", argument);
      fetch(`${url}/${argument}?key=${process.env.RAWG_API_KEY}`)
        .then((response) => response.json())
        .then((responseData) => {
          // Log : juste pour avoir toutes les propriétés de l'objet responseData
          console.log('fetchGame', responseData);
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
          <p class="release-date"><span></span></p>
          <p class="description"></p>
        </div>
      </section>
    `;

    preparePage();
  };

  render();
  backButtonBehavior();
};

const backButtonBehavior = () => {
  const backButtonContainer = document.getElementById('back-to-search-button-container');
  backButtonContainer.style.display = 'block';

  backButtonContainer.addEventListener('click', () => {
    backButtonContainer.style.display = 'none';
  });
}