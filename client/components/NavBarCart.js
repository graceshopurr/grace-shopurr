import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';


export default class NavBarCart extends Component{
    constructor(props){
        super(props);
    }

    render(){

    let itemsInCart = null  //products.length > 0;

	// if (localStorage.cart){
    //     let theCart = JSON.parse(localStorage.cart);
    //     let product =  <img src ='/public/assets/images/package.png' />
    //     let cat = <img src = '/public/assets/images/smiling-cat-face-with-heart-shaped-eyes.png' />

	// 	if (theCart.addedCatIds.length > 0){
	// 		itemsInCart = <div> {cat} </div>
    //     }

    //     if (theCart.addedProductIds.length > 0){
    //         itemsInCart = <div>{product}</div>
    //     }

    //     if (theCart.addedProductIds.length > 0 && theCart.addedCatIds.length > 0 ){
    //         itemsInCart = <div>{product}{cat}</div>
    //     }
    //     return itemsInCart;
    // }

    let numberItems = 0
        return (
            <div>
                <Link to="/cart"> Cart </Link>
                <span className="btn">{numberItems}</span>
            </div>
        )
    }
}

