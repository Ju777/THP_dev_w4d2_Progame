export { gameScreenshots } ;

const gameScreenshots = (gameData) => {
    const preparePage = () => {    
        const cleanedArgument = gameData.id;

        const displayScreenshots = (responseData) => {
            // console.log(responseData)
            const screenshotsContainer = document.getElementById('screenshots-container');
            for(let i = 0 ; i < responseData.length ; i++) {
              let divScreen = document.createElement('div');
              divScreen.classList.add = 'one-screenshot-container';
              screenshotsContainer.appendChild(divScreen);
              divScreen.innerHTML = `
                                      <img src="${responseData[i].image}" alt="screenshot of the game" class="screenshot"/>
                                    `;
            }

            
        };
    
        const fetchScreenshots = (url, argument) => {
          // Log de vérif
          console.log('On est dans gameScreenshots :\n', "url => ", url, "\n", "argument => ", argument);
             fetch(`${url}/${argument}/screenshots?key=${process.env.RAWG_API_KEY}`)
            .then((response) => response.json())
            .then((responseData) => {
              // Log : juste pour avoir toutes les propriétés de l'objet responseData
              console.log(responseData.results);
              displayScreenshots(responseData.results);
            });
        };
    
        fetchScreenshots('https://api.rawg.io/api/games', cleanedArgument);
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
}