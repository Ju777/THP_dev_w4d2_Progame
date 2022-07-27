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
    const developers = getDeveloppers(gameData);
    const platforms = getPlatforms(gameData);
    const publishers = getPublishers(gameData);
    const genres = getGenres(gameData);
    const tags = getTags(gameData);

    // Affichage des données récupérées
    finalDisplay(gameData, gameDetailsContainer, descriptionTexts, developers, platforms, publishers, genres, tags); 
};

const splitDescriptionText = (gameData) => {
    
    // Dans la mesure où les données de l'API ne sont pas homogènes d'un jeu à l'autre, certains champs finiront vides.
    let rawDescriptionField = gameData.description;
    // console.log('includes', rawDescriptionField.includes('<br />'));

    let splittedFields = '';
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

const getDeveloppers = (gameData) => {
    let developers = '';

    for(let i = 0 ; i < gameData.developers.length ; i++) {
        developers += gameData.developers[i].name + ' ';
    }

    return developers;
}

const getPlatforms = (gameData) => {
    let platforms = '';

    for(let i = 0 ; i < gameData.parent_platforms.length ; i++) {
        platforms += gameData.parent_platforms[i].platform.name + ' ';
    }

    return platforms;
}

const getPublishers = (gameData) => {
    let publishers = '';

    for(let i = 0 ; i < gameData.publishers.length ; i++) {
        publishers += gameData.publishers[i].name + ' ';
    }

    return publishers;
}

const getGenres = (gameData) => {
    let genres = '';

    for(let i = 0 ; i < gameData.genres.length ; i++) {
        genres += gameData.genres[i].name + ' ';
    }

    return genres;
}

const getTags = (gameData) => {
    let tags = '';

    for(let i = 0 ; i < gameData.tags.length ; i++) {
        tags += gameData.tags[i].name + ' ';
    }

    return tags;
}

const finalDisplay = (gameData, gameDetailsContainer, descriptionTexts, developers, platforms, publishers, genres, tags) => {
    gameDetailsContainer.innerHTML = `
    <div id="game-image-container">
        #game-image-container<br/>
        <img src="${gameData.background_image}" alt="image of the game" class="game-image"/>
        <a href="${gameData.website}"><button id="check-website-button">check website</button></a>
    </div>


    <div id="title-and-vote-container">
        <div id="game-title-container">
            <h1>${gameData.name}</h1><br/>
            <p>${descriptionTexts.short}</p>
        </div>
        <div id="vote-container">
           ${gameData.rating} / 5 - ${gameData.ratings_count} votes
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
            <p><strong>Developer</strong><br/>
            ${developers}</p>
        </div>
        <div id="platforms-container">
        <p><strong>Platforms</strong><br/>
        ${platforms}</p>
        </div>
        <div id="publiser-container">
        <p><strong>Publisher</strong><br/>
        ${publishers}</p>
        </div>
    </div>

    <div id="genre-and-tags-container">
        <div id="genre-container">
        <p><strong>Genre</strong><br/>
        ${genres}</p>
        </div>

        <div id="tags-container">
            <p><strong>Tags</strong><br/>
            ${tags}</p>
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
        <p>Accès restreint par l'API on dirait ...</p>
    </div>

    <div id="similar-games-container">
        <h2>SIMILAR GAMES</h2>
        <p>Accès restreint par l'API on dirait ...</p>
    </div>  
`;
}