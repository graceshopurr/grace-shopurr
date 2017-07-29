import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom';


 const NavBarCart = (props) => {

    return (
        <div>
            <Link to="/cart" >Cart <span className="btn">42</span></Link>
        </div>
    )
}

//need to figure out whether to render a certain badge/button depending on what gets added to cart 

// conditional rendering for cart inside of number
// if (cartArray[cat] && cartArray[products]) productAndCat 
// if (cartArray[cat]) cat
// if (cartArray[product]) product 
// if (cartArray[empty]) buy something!

export default NavBarCart;