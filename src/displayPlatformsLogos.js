export { displayPlatformsLogos };

const displayPlatformsLogos = (games) => {
  for(let i = 0 ; i < games.length ; i++) {
    const platformsContainer = document.getElementById(`game-${games[i].id}-platforms`)
    // console.log('platformsContainer', platformsContainer);
    for(let j = 0 ; j < games[i].parent_platforms.length ; j++){
      let platformName = games[i].parent_platforms[j].platform.name;
      // platformsContainer.innerHTML += `${platformName} `;
      if (platformName === 'PC') { platformsContainer.innerHTML += `<img src="./src/assets/images/logos/windows.svg" /> `; }
      if (platformName === 'PlayStation') { platformsContainer.innerHTML += `<img src="./src/assets/images/logos/ps4.svg" /> `; }
      if (platformName === 'Xbox') { platformsContainer.innerHTML += `<img src="./src/assets/images/logos/xbox.svg" /> `; }
      if (platformName === 'iOs' || platformName === 'Android') { platformsContainer.innerHTML += `<img src="./src/assets/images/logos/mobile.svg" /> `; }
      if (platformName === 'Linux') { platformsContainer.innerHTML += `<img src="./src/assets/images/logos/linux.svg" /> `; }
      if (platformName === 'Nintendo') { platformsContainer.innerHTML += `<img src="./src/assets/images/logos/switch.svg" /> `; }
    }
  }
};
  