// const gameStores = () => {
//     console.log("gameStores ok.");
// }

import { PageList } from "./PageList";

export { platformSelection } ;

const platformSelection = (argument = '') => {
    const preparePage = () => {
        const cleanedArgument = argument.trim().replace(/\s+/g, "-");
        let allPlatforms = [];

        const displayPlatforms = (responseData) => {
            const selectInput = document.getElementById('select-input');
            for(let i = 0 ; i < responseData.length ; i++) {
              allPlatforms.push(responseData[i]);
              let option = document.createElement('option');
              selectInput.appendChild(option);
              option.innerHTML = `${responseData[i].name}`;
            };
            selectInput.addEventListener('change', () => {
              getPlatformId(selectInput.value, allPlatforms);
            });
            
        };
    
        const fetchPlatforms = (url) => {
          // Log de vérif
          // console.log('On est dans fetchPlatforms :\n', "url => ", url, "\n", "argument => ", argument);
             fetch(`${url}?ordering=name&key=${process.env.RAWG_API_KEY}`)
            .then((response) => response.json())
            .then((responseData) => {
              // Log : juste pour avoir toutes les propriétés de l'objet responseData
              // console.log('fetchPlatforms', responseData.results);
              displayPlatforms(responseData.results);
            });
        };
    
        fetchPlatforms('https://api.rawg.io/api/platforms');
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

      const getPlatformId = (platformName, allPlatforms) => {
        // console.log('filterByPlatform', platformName, allPlatforms);
        allPlatforms.map(platform => {
          // console.log(platform.name);
          if(platform.name === platformName) {
            // console.log(platform.id);
            PageList('', 9, platform.id)
          }
        });
        // const selectedPlatform = allPlatforms.filter(platform => {platform.name === "Android"});
        // console.log("Filtre => ", selectedPlatform);
      }




}