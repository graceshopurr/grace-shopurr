import axios from 'axios'
import history from '../history'

//action types

const ADD_CAT_TO_CART = 'ADD_CAT_TO_CART';
const REMOVE_CAT_FROM_CART = 'REMOVE_CAT_FROM_CART';
const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
const INCREMENT_PRODUCT_QUANTITY = 'INCREMENT_PRODUCT_QUANTITY';
const DECREMENT_PRODUCT_QUANTITY = 'DECREMENT_PRODUCT_QUANTITY';
const REMOVE_PRODUCT_FROM_CART = 'REMOVE_PRODUCT_FROM_CART';
const SUBMIT_ORDER = 'SUBMIT_ORDER';
const CANCEL_ORDER = 'CANCEL_ORDER';

//initial state

const  initialState = {
	addedProductIds: [], //which products are in the order at all
	quantityById: {}, //how many of each product are in the order
	addedCatIds: [],  //which cats are in the order (only one of each cat no need for quantity)
	status: "cart" //all open carts start as 'cart' status
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

//reducer

export default function (state = initialState, action){
	switch(action.type){
		case ADD_CAT_TO_CART:
			return Object.assign({}, state, {addedCatIds: [...state.addedCatIds, action.catId]})
		case REMOVE_CAT_FROM_CART:
			return Object.assign({}, state, {addedCatIds : addedCatIds.filter( cat => cat.id !== action.catId)})
		case ADD_PRODUCT_TO_CART:
			return Object.assign({}, state, {addedProductIds: [...state.addedProductIds, action.productId], quantityById:{...state.quantityById, [action.productId]: 1}})
		case INCREMENT_PRODUCT_QUANTITY:
			return Object.assign({},state, {quantityById: {...state.quantityById, [action.productId]: action.productId++}})
		case DECREMENT_PRODUCT_QUANTITY:
			return Object.assign({},state, {quantityById: {...state.quantityById, [action.productId]: action.productId--}})
		case REMOVE_PRODUCT_FROM_CART:
			return Object.assign({}, state, {addedProductIds : addedProductIds.filter( product => product.id !== action.productId), quantityById: {...state.quantityById, [action.productId]: 0}})
		case SUBMIT_ORDER:
			return Object.assign({}, state, { status: 'processing'})
		case CANCEL_ORDER:
			return Object.assign({}, state, {status: 'canceled'})
		default:
			return state
	}
}
