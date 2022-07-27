// const gameStores = () => {
//     console.log("gameStores ok.");
// }

export { gameStores } ;

const gameStores = (gameData) => {
    const preparePage = () => {
        // const cleanedArgument = argument.trim().replace(/\s+/g, "-"); ORIGINAL EN ATTENTE
        const cleanedArgument = gameData.id;
        const displayStores = (responseData) => {
            // console.log(responseData)
            const buyContainer = document.getElementById('buy-container');
            for(let i = 0 ; i< responseData.length ; i++) {
                let span = document.createElement('span');
                buyContainer.appendChild(span);
                span.innerHTML = `<a href="${responseData[i].url}">link ${i}</a><br/>`;
            }
        };
    
        const fetchStores = (url, argument) => {
          // Log de vérif
          console.log('On est dans gameStores :\n', "url => ", url, "\n", "argument => ", argument);
             fetch(`${url}/${argument}/stores?key=${process.env.RAWG_API_KEY}`)
            .then((response) => response.json())
            .then((responseData) => {
              // Log : juste pour avoir toutes les propriétés de l'objet responseData
              console.log(responseData.results);
              displayStores(responseData.results);
            });
        };
    
        fetchStores('https://api.rawg.io/api/games', cleanedArgument);
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