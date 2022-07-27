// const gameStores = () => {
//     console.log("gameStores ok.");
// }

export { gameYoutube } ;

const gameYoutube = (gameData) => {
    const preparePage = () => {
        // const cleanedArgument = argument.trim().replace(/\s+/g, "-"); ORIGINAL EN ATTENTE
    
        const cleanedArgument = gameData.id;

        const displayYoutube = (responseData) => {
            // console.log(responseData)
            const youtubeContainer = document.getElementById('youtube-container');

        };
    
        const fetchYoutube = (url, argument) => {
          // Log de vérif
          console.log('On est dans gameYoutube :\n', "url => ", url, "\n", "argument => ", argument);
             fetch(`${url}/${argument}/youtube?key=${process.env.RAWG_API_KEY}`)
            .then((response) => response.json())
            .then((responseData) => {
              // Log : juste pour avoir toutes les propriétés de l'objet responseData
              console.log(responseData.results);
              displayYoutube(responseData.results);
            });
        };
        // EN ATTENTE DE SAVOIR POUR L'ACCES RESTREINT
        // fetchYoutube('https://api.rawg.io/api/games', cleanedArgument);
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