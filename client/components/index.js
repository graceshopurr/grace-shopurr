/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {AdminCatForm} from './AdminCatForm';
export {HOAdminCatForm} from './HOAdminCatForm';
export {default as Main} from './Main';
export {default as Home} from './Home';
export {default as UserHome} from './user-home';
export {Login, Signup} from './auth-form';
export {AddProduct, EditProduct} from './HOAdminProductForm';
export {default as AllCats} from './AllCats';
export {default as AllProducts} from './AllProducts';
export {default as SingleCat} from './SingleCat';
export {default as SingleProduct} from './SingleProduct';
export {default as Cart} from './Cart';
export {default as SearchResults} from './SearchResults';
