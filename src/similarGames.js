// const gameStores = () => {
//     console.log("gameStores ok.");
// }

export { similarGames } ;

const similarGames = (gameData) => {
    const preparePage = () => {
        // const cleanedArgument = argument.trim().replace(/\s+/g, "-"); ORIGINAL EN ATTENTE
    
        const cleanedArgument = gameData.id;

        const displaySimilarGames = (responseData) => {
            // console.log(responseData)
            const similarGamesContainer = document.getElementById('similar-games-container');
            
        };
    
        const fetchSimilarGames = (url, argument) => {
          // Log de vérif
          console.log('On est dans similarGames :\n', "url => ", url, "\n", "argument => ", argument);
             fetch(`${url}/${argument}/suggested?key=${process.env.RAWG_API_KEY}`)
            .then((response) => response.json())
            .then((responseData) => {
              // Log : juste pour avoir toutes les propriétés de l'objet responseData
              console.log(responseData.results);
              displaySimilarGames(responseData.results);
            });
        };
        // EN ATTENTE DE SAVOIR POUR L'ACCES RESTREINT
        // fetchSimilarGames('https://api.rawg.io/api/games', cleanedArgument);
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