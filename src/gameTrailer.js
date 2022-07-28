export { gameTrailer } ;

const gameTrailer = (gameData) => {
    const preparePage = () => {
        // const cleanedArgument = argument.trim().replace(/\s+/g, "-"); ORIGINAL EN ATTENTE
        // console.log("data given => ", gameData.id)
        const cleanedArgument = gameData.id.toString();;

        const displayTrailer = (responseData) => {
            // console.log('displayTrailer', responseData);
            let trailerContainer = document.getElementById('trailer-container');
            let trailerPlayer = document.getElementById('trailer-player');
            let imageNoTrailer = document.createElement('img');
            trailerContainer.appendChild(imageNoTrailer);

            if (responseData.length === 0) {
              // console.log("ca vaut 0");
              trailerPlayer.style.display = 'none';
              //imageNoTrailer.setAttribute('src', "./assets/images/no-trailer-sorry-min.png");
              imageNoTrailer.setAttribute('alt', 'No trailer for this game ... sorry ¯\\\_(ツ)_/¯ ! ');              
            } else {
                    trailerPlayer.innerHTML = `<source src="${responseData[0].data["max"]}" type="video/mp4">
                                  Sorry, your browser doesn't support embedded videos.
                                  `;
            }
        };
    
        const fetchTrailer = (url, argument) => {
          // Log de vérif
          // console.log('On est dans gameTrailer :\n', "url => ", url, "\n", "argument => ", argument);
             fetch(`${url}/${argument}/movies?key=${process.env.RAWG_API_KEY}`)
            .then((response) => response.json())
            .then((responseData) => {
              // console.log('fetchTrailer', responseData);
              // Log : juste pour avoir toutes les propriétés de l'objet responseData
              // console.log(responseData.results[0].data["480"]); // => renvoie undefined si pas de trailer trouvé.
              displayTrailer(responseData.results);
            });
        };
    
        fetchTrailer('https://api.rawg.io/api/games', cleanedArgument);
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