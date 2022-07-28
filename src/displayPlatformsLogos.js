import { PageList } from "./PageList";
export { displayPlatformsLogos };

const displayPlatformsLogos = (games, allPlatforms) => {
  for(let i = 0 ; i < games.length ; i++) {
    const platformsContainer = document.getElementById(`game-${games[i].id}-platforms`)
    // console.log('platformsContainer', platformsContainer);
    for(let j = 0 ; j < games[i].parent_platforms.length ; j++){
      let spanDevLink = document.createElement('span');
      platformsContainer.appendChild(spanDevLink);
      let platformName = games[i].parent_platforms[j].platform.name;

      if (platformName === 'PC') { spanDevLink.innerHTML = `<img src="./src/assets/images/logos/windows.svg" /> `; }
      if (platformName === 'PlayStation') { spanDevLink.innerHTML = `<img src="./src/assets/images/logos/ps4.svg" /> `; }
      if (platformName === 'Xbox') { spanDevLink.innerHTML = `<img src="./src/assets/images/logos/xbox.svg" /> `; }
      if (platformName === 'iOs' || platformName === 'Android') { spanDevLink.innerHTML = `<img src="./src/assets/images/logos/mobile.svg" /> `; }
      if (platformName === 'Linux') { spanDevLink.innerHTML = `<img src="./src/assets/images/logos/linux.svg" /> `; }
      if (platformName === 'Nintendo') { spanDevLink.innerHTML = `<img src="./src/assets/images/logos/switch.svg" /> `; }

      spanDevLink.addEventListener('mouseover', () => {
        spanDevLink.style.cursor = "pointer";
      });

      spanDevLink.addEventListener('click', () => {
        // console.log('click !');
        
        // La requete pour les plateformes ne fonctionne pas par la slug mais par l'id. Il nous faut donc l'id correspondant à la plateforme sélectionnée.
        for(let i = 0 ; i < allPlatforms.length ; i ++) {
            if(allPlatforms[i].name === platformName) { 
                console.log(allPlatforms[i].name, allPlatforms[i].id);
                PageList('', 9, allPlatforms[i].id);
            }
        }
      });
    }
  }
};
  