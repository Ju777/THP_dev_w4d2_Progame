import './style/index.scss'; // Attention ici, il faut bien mettre l'extension `.scss`
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';
import { Home } from './Home';
import { PageList } from './PageList';
import { PageDetail } from './PageDetail';
import { routes } from './routes';

// Home();
// PageList();
// PageDetail();
console.log(process.env.RAWG_API_KEY);
console.log( routes);

const callRoute = () => {
    const { hash } = window.location;
    const pathParts = hash.substring(1).split('/');
  
    const pageName = pathParts[0];
    const pageArgument = pathParts[1] || '';
    const pageFunction = routes[pageName];
  
    if (pageFunction !== undefined) {
      pageFunction(pageArgument);
    }
  };
  
  window.addEventListener('hashchange', () => callRoute());
  window.addEventListener('DOMContentLoaded', () => callRoute());
