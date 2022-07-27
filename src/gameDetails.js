export { gameDetails };

const gameDetails = (gameData) => {
    // log de vérif
    console.log('On est dans gameDetails', gameData);
    
    const informationContainer = document.getElementById('information-container');
    informationContainer.style.display = "none";

    const gameDetailsContainer = document.getElementById('game-details-container');
    gameDetailsContainer.style.display = 'block';

    // Travail du champ description de gameData pour en faire 3 morceaux : short description, plot et gameplay
    let rawDescriptionField = gameData.description;
    let splittedFields = rawDescriptionField.split('</p>');
    // console.log('splittedFields', splittedFields);

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

    gameDetailsContainer.innerHTML = `
            <div id="game-image-container">
                #game-image-container<br/>
                <img src="${gameData.background_image}" alt="image of the game" class="game-image"/>
                <a href="${gameData.website}"><button id="check-website-button">check website</button></a>
            </div>
       

            <div id="title-and-vote-container">
                <div id="game-title-container">
                    <h1>${gameData.name}</h1><br/>
                    <p>${shortDescription}</p>
                </div>
                <div id="vote-container">
                   ${gameData.rating} / 5 - ${gameData.ratings_count} votes
                </div>
            </div>

            <div id="plot-container">
                <p><strong>Plot</strong><br/>
                ${plot}</p>
            </div>

            <div id="gameplay-container">
                <p><strong>Gameplay</strong><br/>
                ${gameplay}</p>
            </div>

            <div id="release-container">
                <div id="release-date-container">
                    <p><strong>Release date</strong><br/>
                    ${gameData.released}</p>
                </div>
                <div id="developer-container">
                    <p><strong>Developer</strong><br/>
                    => ARRAY</p>
                </div>
                <div id="platforms-container">
                <p><strong>Platforms</strong><br/>
                => ARRAY</p>
                </div>
                <div id="publiser-container">
                <p><strong>Publiser</strong><br/>
                => ARRAY</p>
                </div>
            </div>

            <div id="genre-and-tags-container">
                <div id="genre-container">
                <p><strong>Genre</strong><br/>
                => ARRAY</p>
                </div>

                <div id="tags-container">
                    <p><strong>Tags</strong><br/>
                    => ARRAY</p>
                </div>
            </div>

            <div id="buy-container">
                <h2>BUY</h2>
            </div>

            <div id="trailer-container">
                <h2>TRAILER</h2>
                    <video id="trailer-player" controls width="100%">
                    
                    </video>
            </div>

            <div id="screenshots-container">
                <h2>SCREENSHOTS</h2>
            </div>

            <div id="youtube-container">
                <h2>YOUTUBE</h2>
                <p>Accès restreint par l'AIP on dirait ...</p>
            </div>

            <div id="similar-games-container">
                <h2>SIMILAR GAMES</h2>
                <p>Accès restreint par l'AIP on dirait ...</p>
            </div>  
    `;
};

