import anime from 'animejs/lib/anime.es.js';

export { cardsMouseover };


const cardsMouseover = (games) => {
    // console.log('On est dans cardsMouseover.');
    for(let i = 0 ; i < games.length ; i++) {
        const cardContainer = document.getElementById(`game-${games[i].id}-card`);
        const imageCardContainer = document.getElementById(`game-${games[i].id}-image-container`);
        const imageCard = document.getElementById(`game-${games[i].id}-image`);

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

                anime({
                    targets: imageCard,
                    keyframes: [
                      {scale: 1.2},
                      {rotate : 360,
                        scale: 0},
                    ],
                    duration: 1500,
                    easing: 'easeOutElastic(1, 1)',
                    // loop: true
                });

                setTimeout( () => {
                    console.log('overDisplay');
                    imageCardContainer.innerHTML = `
                                                <div id ="mouseover-container">
                                                    <ul>
                                                        <li>Release : ${games[i].released}</li>
                                                        <li>Publisher : ${publishersString}</li>
                                                        <li class="game-genre">Genre : ${gameGenres}</li>
                                                        <li>Rating : ${games[i].rating} / 5 - ${games[i].ratings_count} votes</li>
                                                    </ul>
                                                </div>
                                                </a>
                                            `;

                    imageCardContainer.style.backgroundSize ="100% 100%";
                    imageCardContainer.style.backgroundRepeat = "no-repeat";
                    imageCardContainer.style.backgroundImage = `url(${games[i].background_image})`;
                    imageCardContainer.style.backgroundColor = "rgba(255, 255, 255, 0.600)";
                    imageCardContainer.style.backgroundBlendMode = "overlay";
                    imageCardContainer.style.borderRadius = "30px";
                    imageCardContainer.style.padding = "20px";
                

                    cardContainer.addEventListener('mouseleave', () => {
                        // imageCardContainer.innerHTML = toKeep;
                        // imageCardContainer.style.padding = "0";
                        
                    });
                 }, 1000);

               
            });
        });
    }
}