import { PageList } from './PageList';

export { gameDetails };

const gameDetails = (gameData) => {
    // log de vérif
    // console.log('On est dans gameDetails', gameData);
    
    const informationContainer = document.getElementById('information-container');
    informationContainer.style.display = "none";

    const gameDetailsContainer = document.getElementById('game-details-container');
    gameDetailsContainer.style.display = 'block';

    // Récupération des données à afficher
    const descriptionTexts = splitDescriptionText(gameData);    

    // Affichage des données récupérées
    finalDisplay(gameData, gameDetailsContainer, descriptionTexts); 
};

const splitDescriptionText = (gameData) => {
    
    // Dans la mesure où les données de l'API ne sont pas homogènes d'un jeu à l'autre, certains champs finiront vides.
    let rawDescriptionField = gameData.description;
    // console.log('includes', rawDescriptionField.includes('<br />'));

    let splittedFields = '';
    // Le critère de split est soit <br /> soit </p> s'il n'y a pas de <br />
    if (rawDescriptionField.includes('<br />')) {
        // console.log('includes', rawDescriptionField.includes('<br />'));
        splittedFields = rawDescriptionField.split('<br />');
    }
    else {
        // console.log('includes', rawDescriptionField.includes('<br />'));
        splittedFields = rawDescriptionField.split('</p>');
    }

    // short description sera le premier élément du tableau
    let shortDescription = splittedFields[0];

    // gameplay sera l'avant dernier élément du tableau (la dernière place étant prise par '' du au split sur </p>)
    let gameplay = splittedFields[splittedFields.length-2];

    // plot sera la concaténation de tous les éléments entre les 2 précédents.
    let plot = '';
    
    for(let i = 1 ; i < splittedFields.length -2 ; i++) {
        plot += splittedFields[i];
    }
    if (shortDescription === '') { shortDescription = 'Data not available ... sorry ¯\\\_(ツ)_/¯ !'; }
    if (plot === '') { plot = 'Data NA ... sorry ¯\\\_(ツ)_/¯ !'; }
    if (gameplay === '') { gameplay = 'Data NA ... sorry ¯\\\_(ツ)_/¯ !'; }

    // console.log("texts", shortDescription, plot, gameplay);

    // On rassemble tout dans un seul objet descriptionTexts
    const descriptionTexts = {
        short: shortDescription,
        plot: plot,
        gameplay: gameplay
    }
    // console.log('descriptionTexts', descriptionTexts);
    return descriptionTexts;
}

const finalDisplay = (gameData, gameDetailsContainer, descriptionTexts) => {
    gameDetailsContainer.innerHTML = `
    <div id="game-image-container">
        <div id="game-website-button-container" class="game-website-button-container"><a href="${gameData.website}" target="blank"><button id="game-website-button">Game website</button></a></div>
        
        <div><img src="${gameData.background_image}" alt="image of the game" class="game-image"/></div>
        
    </div>


    <div id="title-and-vote-container">
        <div id="game-title-container">
            <h1>${gameData.name}</h1>
            <p>${descriptionTexts.short}</p>
        </div>
        <div id="vote-container">
           ${gameData.rating} / 5<br />${gameData.ratings_count} votes
        </div>
    </div>

    <div id="plot-container">
        <p><strong>Plot</strong><br/>
        ${descriptionTexts.plot}</p>
    </div>

    <div id="gameplay-container">
        <p><strong>Gameplay</strong><br/>
        ${descriptionTexts.gameplay}</p>
    </div>

    <div id="release-container">

        <div id="release-date-container">
            <p><strong>Release date</strong><br/>
            ${gameData.released}</p>
        </div>

        <div id="developer-container">
            <strong>Developer</strong><br/>
            <div id="developers-list-container"></div>
  
        </div>

        <div id="platforms-container">
            <strong>Platforms</strong><br/>
            <div id="platforms-list-container"></div>
        </div>
        
        <div id="publiser-container">
            <strong>Publisher</strong><br/>
            <div id="publishers-list-container"></div>
        </div>
        
    </div>

    <div id="genre-and-tags-container">

        <div id="genre-container">
          <strong>Genre</strong><br/>
          <div id="genres-list-container"></div>
        </div>

        <div id="tags-container">
            <strong>Tags</strong><br/>
            <div id="tags-list-container"></div>
        </div>

    </div>

    <div id="buy-container">
        <h2>BUY</h2>
    </div>

    <div id="trailer-container">
        <h2>TRAILER</h2>
        <video id="trailer-player" controls width="100%"></video>
    </div>

    <div id="screenshots-container">
        <h2>SCREENSHOTS</h2>
        <div id="screenshots" >
        </div>
        
    </div>

    <div id="youtube-container">
        <h2>YOUTUBE</h2>
        <p>Data not available ... sorry ¯\\\_(ツ)_/¯ !</p>
    </div>

    <div id="similar-games-container">
        <h2>SIMILAR GAMES</h2>
        <p>Data not available ... sorry ¯\\\_(ツ)_/¯ !</p>
    </div>  
    `;

    fetchPlatforms(gameData, 'https://api.rawg.io/api/platforms/lists/parents'); // => se finit par l'appel de displayPlatforms
    displayDevelopers(gameData);
    displayPublishers(gameData);
    displayGenres(gameData);
    displayTags(gameData);
}

const fetchPlatforms = (gameData, url) => {
    // Log de vérif
    // console.log('On est dans fetchPlatforms :\n', "url => ", url, "\n", "argument => ", argument);
       fetch(`${url}?ordering=name&key=${process.env.RAWG_API_KEY}`)
      .then((response) => response.json())
      .then((responseData) => {
        // Log : juste pour avoir toutes les propriétés de l'objet responseData
        // console.log('fetchPlatforms', responseData.results);
        let allPlatforms = responseData.results;
        displayPlatforms(gameData, allPlatforms);
      });
  };

const displayPlatforms = (gameData, allPlatforms) => {
    const platformsListContainer = document.getElementById('platforms-list-container');
    for(let i = 0 ; i < gameData.parent_platforms.length ; i++) {
        let spanDevLink = document.createElement('span');
        platformsListContainer.appendChild(spanDevLink);
        let platform = gameData.parent_platforms[i].platform.name;

        // Affichage du logo correspondant à la plateforme
        if (platform === 'PC') {  spanDevLink.innerHTML = `<a><img src="./src/assets/images/logos/windows.svg" /></a> `; }
        if (platform === 'PlayStation') {  spanDevLink.innerHTML = `<a><img src="./src/assets/images/logos/ps4.svg" /></a> `; }
        if (platform === 'Xbox') {  spanDevLink.innerHTML = `<a><img src="./src/assets/images/logos/xbox.svg" /></a> `; }
        if (platform === 'iOs' || platform === 'Android') {  spanDevLink.innerHTML = `<a><img src="./src/assets/images/logos/mobile.svg" /></a> `; }
        if (platform === 'Linux') {  spanDevLink.innerHTML = `<a><img src="./src/assets/images/logos/linux.svg" /></a> `; }
        if (platform === 'Nintendo') {  spanDevLink.innerHTML = `<a><img src="./src/assets/images/logos/switch.svg" /></a> `; }

        spanDevLink.addEventListener('mouseover', () => {
            spanDevLink.style.cursor = "pointer";
        });

        spanDevLink.addEventListener('click', () => {
            // console.log('click !');

            // Cacher les éléments de pageDetail pour laisser place à la liste de jeux de PageList
            const gameDetailsContainer = document.getElementById('game-details-container');
            gameDetailsContainer.style.display = 'none';
            // Afficher la structure de PageList, qui sera rempli avec les datas fetchées par PageList()
            const informationContainer = document.getElementById('information-container');
            informationContainer.style.display = "block";

            // La requete pour les plateformes ne fonctionne pas par la slug mais par l'id. Il nous faut donc l'id correspondant à la plateforme sélectionnée.
            for(let i = 0 ; i < allPlatforms.length ; i ++) {
                if(allPlatforms[i].name === platform) { 
                    console.log(allPlatforms[i].name);
                    PageList('', 9, allPlatforms[i].id);
                }
            }
        });
    }
}

const displayDevelopers = (gameData) => {
    const developersListContainer = document.getElementById('developers-list-container');
    for(let i = 0 ; i < gameData.developers.length ; i++) {
        let spanDevLink = document.createElement('span');
        developersListContainer.appendChild(spanDevLink);
        spanDevLink.innerHTML = `<a>${gameData.developers[i].name}</a><br/>`;

        spanDevLink.addEventListener('mouseover', () => {
            spanDevLink.style.cursor = "pointer";
        });

        spanDevLink.addEventListener('click', () => {
            // console.log('click !');

            // Cacher les éléments de pageDetail pour laisser place à la liste de jeux de PageList
            const gameDetailsContainer = document.getElementById('game-details-container');
            gameDetailsContainer.style.display = 'none';
            // Afficher la structure de PageList, qui sera rempli avec les datas fetchées par PageList()
            const informationContainer = document.getElementById('information-container');
            informationContainer.style.display = "block";

            PageList('', 9, '', gameData.developers[i].slug);
        });
    }
}

const displayPublishers = (gameData) => {
    const publishersListContainer = document.getElementById('publishers-list-container');
    for(let i = 0 ; i < gameData.publishers.length ; i++) {
        let spanDevLink = document.createElement('span');
        publishersListContainer.appendChild(spanDevLink);
        spanDevLink.innerHTML = `<a>${gameData.publishers[i].name}</a><br/>`;

        spanDevLink.addEventListener('mouseover', () => {
            spanDevLink.style.cursor = "pointer";
        });

        spanDevLink.addEventListener('click', () => {
            // console.log('click !');

            // Cacher les éléments de pageDetail pour laisser place à la liste de jeux de PageList
            const gameDetailsContainer = document.getElementById('game-details-container');
            gameDetailsContainer.style.display = 'none';
            // Afficher la structure de PageList, qui sera rempli avec les datas fetchées par PageList()
            const informationContainer = document.getElementById('information-container');
            informationContainer.style.display = "block";

            PageList('', 9, '', '', gameData.publishers[i].slug);
        });
    }
}

const displayGenres = (gameData) => {
    const genresListContainer = document.getElementById('genres-list-container');
    for(let i = 0 ; i < gameData.genres.length ; i++) {
        let spanDevLink = document.createElement('span');
        genresListContainer.appendChild(spanDevLink);
        spanDevLink.innerHTML = `<a>${gameData.genres[i].name}</a> `;

        spanDevLink.addEventListener('mouseover', () => {
            spanDevLink.style.cursor = "pointer";
        });

        spanDevLink.addEventListener('click', () => {
            // console.log('click !');

            // Cacher les éléments de pageDetail pour laisser place à la liste de jeux de PageList
            const gameDetailsContainer = document.getElementById('game-details-container');
            gameDetailsContainer.style.display = 'none';
            // Afficher la structure de PageList, qui sera rempli avec les datas fetchées par PageList()
            const informationContainer = document.getElementById('information-container');
            informationContainer.style.display = "block";

            PageList('', 9, '', '', '', gameData.genres[i].slug);
        });
    }
}

const displayTags = (gameData) => {
    const tagsListContainer = document.getElementById('tags-list-container');
    for(let i = 0 ; i < gameData.tags.length ; i++) {
        let spanDevLink = document.createElement('span');
        tagsListContainer.appendChild(spanDevLink);
        spanDevLink.innerHTML = `<a>${gameData.tags[i].name.toLowerCase()}</a> `;

        spanDevLink.addEventListener('mouseover', () => {
            spanDevLink.style.cursor = "pointer";
        });

        spanDevLink.addEventListener('click', () => {
            // console.log('click !');

            // Cacher les éléments de pageDetail pour laisser place à la liste de jeux de PageList
            const gameDetailsContainer = document.getElementById('game-details-container');
            gameDetailsContainer.style.display = 'none';
            // Afficher la structure de PageList, qui sera rempli avec les datas fetchées par PageList()
            const informationContainer = document.getElementById('information-container');
            informationContainer.style.display = "block";

            PageList('', 9, '', '', '', '', gameData.tags[i].slug);
        });
    }
}