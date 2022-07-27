import { PageList } from "./PageList";
import { platformSelection } from "./platformSelection";
import { showMore } from "./showMore";
export { Home };

const Home = (argument = '') => {
  // console.log("On est dans Home");

  // Capture d'une saisie de l'utilisateur
  getInput();

  // Filrer les jeux par plateformes
  platformSelection();

  // Cacher les éléments de pageDetail pour laisser place à la liste de jeux de PageList
  const gameDetailsContainer = document.getElementById('game-details-container');
  gameDetailsContainer.style.display = 'none';

  // Afficher la structure de PageList, qui sera rempli avec les datas fetchées dans par PageList()
  const informationContainer = document.getElementById('information-container');
  informationContainer.style.display = "block";
  PageList();

  // Fonctionnalité du bouton "Show more"

  showMore();
  };

const getInput = () => {
  let searchInput = document.getElementById('search-input');
  searchInput.addEventListener('change', () => {
    // console.log(searchInput.value);
    PageList(searchInput.value);

    // Pour réafficher le placeholder après une recherche
    searchInput.value = '';
  });
}
