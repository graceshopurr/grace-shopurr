import axios from 'axios'
import history from '../history'
import Promise from 'bluebird';

//action types

const ADD_CAT_TO_CART = 'ADD_CAT_TO_CART';
const REMOVE_CAT_FROM_CART = 'REMOVE_CAT_FROM_CART';
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
const INCREMENT_PRODUCT_QUANTITY = 'INCREMENT_PRODUCT_QUANTITY';
const DECREMENT_PRODUCT_QUANTITY = 'DECREMENT_PRODUCT_QUANTITY';
const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
const SUBMIT_ORDER = 'SUBMIT_ORDER';
const CANCEL_ORDER = 'CANCEL_ORDER';

//other possibly unnecessary action types

const FETCH_CART_PRODUCT = 'FETCH_CART_PRODUCT';
const FETCH_CART_CAT = 'FETCH_CART_CAT';
const FETCH_ORDERS = 'FETCH_ORDERS';

//initial state

const  initialState = {
	addedProductIds: [], //which products are in the order at all
	quantityById: {}, //how many of each product are in the order
	addedCatIds: [],  //which cats are in the order (only one of each cat no need for quantity)
	status: "cart", //all open carts start as 'cart' status
	dataCats: [],
	dataProducts: [],
	orders: []
}

//action creators 

const addCatToCart = (catId) => ({type: ADD_CAT_TO_CART, catId})
const removeCatFromCart = (catId) => ({type: REMOVE_CAT_FROM_CART, catId})
const addProductToCart = (productId) => ({type: ADD_PRODUCT_TO_CART, productId})
const incrementProductQuantity = (productId) => ({type: INCREMENT_PRODUCT_QUANTITY, productId})
const decrementProductQuantity = (productId) => ({type: DECREMENT_PRODUCT_QUANTITY, productId})
const removeProductFromCart = (productId) => ({type: REMOVE_PRODUCT_FROM_CART, productId})
const submitOrder = () => ({type:SUBMIT_ORDER})
const cancelOrder = () => ({type: CANCEL_ORDER})

//other possibly unnecessary action creators

const gotCartProduct = (things) => ({type: FETCH_CART_PRODUCT, things});
const gotCartCat = (cats) => ({type: FETCH_CART_CAT, cats});
const gotOrders = (orders) => ({type: FETCH_ORDERS, orders});


//start cart function sets a cart on local storage find or create
export function makeCartOnLocalStorage(){
	if(!localStorage.cart){
		let localCart = initialState;
		localCart = stringifyCart(localCart)
		
		localStorage.setItem('cart', localCart);
		console.log("your new cart: " ,localStorage.cart);
	
	}else{
		console.log("Your cart contains: ", localStorage.cart);
	}
}



function unstringifyCart(){
	if (localStorage.cart){
	 return	JSON.parse(localStorage.cart);
	}else{
	  return "There is no cart";
	}
}
function stringifyCart(cart){
	return JSON.stringify(cart);
}

export function clearCart(){
	if(localStorage.cart){
		localStorage.removeItem('cart');
	}else{
		console.log("there is no cart to clear");
	}
}

export function incrementProduct(productId){
	cartObj = unstringifyCart();
	if (cartObj.addedProductIds.includes(productId)){
		cartObj.quantityById[productId]++
	}else{
		cartObj.addedProductIds.push(productId);
		cartObj.quantityById[productId] = 1;
	}
	cartObj = stringifyCart(cartObj);
	localStorage.setItem('cart', cartObj);
	console.log(localStorage.cart);
}

export function decrementProduct(productId){
	cartObj = unstringifyCart();
	if (cartObj.quantityById[productId] > 0){
		cartObj.quantityById[productId] --
		if (cartObj.quantityById[productId] == 0){
			cartObj.addedProductIds = cartObj.addedProductIds.filter( elem => elem != productId);
		}
	}else{
		console.log('You cannot remove products that are not in your cart');
	}


	cartObj = stringifyCart(cartObj);
	localStorage.setItem('cart', cartObj);
	console.log(localStorage.cart);
}

export function incrementCat(catId){
	cartObj = unstringifyCart();

	cartObj.addedCatIds.push(catId);

	cartObj = stringifyCart(cartObj);
	localStorage.setItem('cart', cartObj);
	console.log(localStorage.cart);
}

export function decrementCat(catId){
	cartObj = unstringifyCart();

	cartObj.addedCatIds = cartObj.addedCatIds.filter( elem => elem != catId);

	cartObj = stringifyCart(cartObj);
	localStorage.setItem('cart', cartObj);
	console.log(localStorage.cart);
}

//thunk creator: fetch cart  

export const fetchCartProduct = () => 
	dispatch => {
		const thisCart = unstringifyCart();
		const productArr = thisCart.addedProductIds || [];
		//do something about the quantities set them on state somehow?
		Promise.map(productArr, elem => { //get products from DB based on ID
			return axios.get(`/api/products/${elem}`)
		})
			.then( products => { //create dataFul products
				return products.map(product => product.data);
			})
			.then(products => {//make products into dataful array of objects, WITH QUANTITIES 
				return products.map(product => ({quantity: thisCart.quantityById[product.id], product}))
			})
			.then( productCart => {
				dispatch(gotCartProduct(productCart));
			})
		
	} 

export const fetchCartCat = () => 
	dispatch => {
		const thisCart = unstringifyCart();
		const catArr = thisCart.addedCatIds || []; 

		Promise.map(catArr, elem => { //get cats from DB based on ID
			return axios.get(`/api/cats/${elem}`)
		})
			.then( cats => { //create dataFul cats!
				return cats.map(cat => cat.data);
			})
			.then( cats => { //make cats into dataful object instead of boring old array of numbers
				return cats.map( cat => ({[cat.id]: cat}))
			})
			.then(catCart => { // dispatch wonderful cart with all the database-found cats
				dispatch(gotCartCat(catCart));
			})

	}

	export const fetchOrder = (userId) =>
		dispatch => {
			axios.get(`/api/users/${userId}`)
				.then(orders => orders.filter( elem => elem.status === 'cart'))
				.then(orderCollection => dispatch(gotOrders(orderCollection)));
		} 
//reducer

export default function (state = initialState, action){
	switch(action.type){
		case ADD_CAT_TO_CART:
			return Object.assign({}, state, {addedCatIds: [...state.addedCatIds, action.catId]})
		case REMOVE_CAT_FROM_CART:
			return Object.assign({}, state, {addedCatIds : addedCatIds.filter( cat => cat.id !== action.catId)})
		case ADD_PRODUCT_TO_CART: 
			return Object.assign({}, state, {addedProductIds: [...state.addedProductIds, action.productId], quantityById : Object.assign({}, state.quantityById, {[action.productId] :1})})
		case INCREMENT_PRODUCT_QUANTITY:
			return Object.assign({},state, {quantityById: Object.assign({}, state.quantityById, {[action.productId]: [action.productId] + 1})})
		case DECREMENT_PRODUCT_QUANTITY:
			return Object.assign({},state, {quantityById: Object.assign({}, state.quantityById, {[action.productId]: [action.productId] - 1})})
		case REMOVE_PRODUCT_FROM_CART:
			return Object.assign({}, state, {addedProductIds : addedProductIds.filter( product => product.id !== action.productId)}, {quantityById: Object.assign({}, state.quantityById, {[action.productId]: 0})})
		case SUBMIT_ORDER:
			return Object.assign({}, state, { status: 'processing'})
		case CANCEL_ORDER:
			return Object.assign({}, state, {status: 'canceled'})
		case FETCH_CART_CAT:
			return Object.assign({}, state, {dataCats : action.cats});
		case FETCH_CART_PRODUCT:
			return Object.assign({}, state, {dataProducts: action.things});
		case FETCH_ORDERS:
			return Object.assign({}, state, {orders: action.orders});
		default:
			return state
	}
}


