// const gameStores = () => {
//     console.log("gameStores ok.");
// }

export { gameStores } ;

const gameStores = (gameData) => {
    const preparePage = () => {
        // const cleanedArgument = argument.trim().replace(/\s+/g, "-"); ORIGINAL EN ATTENTE
        const cleanedArgument = gameData.id;
    
        const fetchGameStores = (url, argument) => {
          // Log de vérif
          // console.log('On est dans gameStores :\n', "url => ", url, "\n", "argument => ", argument);
             fetch(`${url}/${argument}/stores?key=${process.env.RAWG_API_KEY}`)
            .then((response) => response.json())
            .then((responseData) => {
              const gameStores = responseData.results;
              // console.log('fetchGameStores', gameStores);
              fetchStoresGeneralList(gameStores); // gameStores et ici passé en paramètre pour l'utiliser ailleurs. Sinon je n'arrive pas à appeler cette variable (!?)

              
            });
        };
    
        fetchGameStores('https://api.rawg.io/api/games', cleanedArgument);
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

const fetchStoresGeneralList = (gameStores) => {
   fetch(`https://api.rawg.io/api/stores?key=${process.env.RAWG_API_KEY}`)
    .then((response) => response.json())
    .then((responseData) => {
      // Log : juste pour avoir toutes les propriétés de l'objet responseData
      const storesGeneralList = responseData.results;
      // console.log('fetchStoresGeneralList', storesGeneralList, gameStores);
      displayStoresLinks(gameStores, storesGeneralList);
    });
}

const displayStoresLinks = (gameStores, storesGeneralList) => {
  // console.log('On est dans displayStoresLinks');

    const buyContainer = document.getElementById('buy-container');
    for(let i = 0 ; i< gameStores.length ; i++) {
        let span = document.createElement('span');
        buyContainer.appendChild(span);
        for(let j = 0 ; j < storesGeneralList.length ; j++) {
          // console.log(gameStores[i].store_id + " / " + storesGeneralList[j].id);
          if (gameStores[i].store_id === storesGeneralList[j].id) { span.innerHTML = `<a href="${gameStores[i].url}">${storesGeneralList[j].name}</a><br/>`; }
        }
    }
}
