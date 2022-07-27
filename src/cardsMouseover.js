export { cardsMouseover };


const cardsMouseover = (games) => {
    // console.log('On est dans cardsMouseover.');
    for(let i = 0 ; i < games.length ; i++) {
        const cardContainer = document.getElementById(`game-${games[i].id}-card`);
        const imageCardContainer = document.getElementById(`game-${games[i].id}-image-container`);

        // Sauvegarde du contenu actuel de la card, pour le ré-afficher après le mouseover.
        let toKeep = imageCardContainer.innerHTML;

        // Récupérer les genres du jeu qui sont disponible dans un tableau.
        let gameGenres = '';
        for(let j = 0 ; j < games[i].genres.length ; j++){
            gameGenres += games[i].genres[j].name.toLowerCase() + ' ';
        }
        
        // Récupérer les éditeurs du jeur
        fetch(`https://api.rawg.io/api/games/${games[i].id}?key=${process.env.RAWG_API_KEY}`)
            .then((response) => response.json())
            .then((responseData) => {
            const publishersList = responseData.publishers;
            let publishersString = '';
            for(let i = 0 ; i < publishersList.length ; i++) {
                publishersString += publishersList[i].name + ' ';
            }
            // console.log('publishersString', publishersString);

            // Exécuter le mouseover avec toutes les informations récupérées au dessus.
            cardContainer.addEventListener('mouseenter', () => {
                // console.log("mouseover");
                imageCardContainer.innerHTML = `
                                            <div class="mouseover-information">
                                                <ul>
                                                    <li>Release : ${games[i].released}</li>
                                                    <li>Publisher : ${publishersString}</li>
                                                    <li class="game-genre">Genre : ${gameGenres}</li>
                                                    <li>${games[i].rating} / 5 - ${games[i].ratings_count} votes</li>
                                                </ul>
                                            </div>
                                            </a>
                                        `;
                cardContainer.addEventListener('mouseleave', () => {
                    imageCardContainer.innerHTML = toKeep;
                });
            });
        });
    }
}