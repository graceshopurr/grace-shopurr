import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';


const Home = (props) => {

  console.log('j');
  return (
    <div>
      <h3>Welcome to Grace Shopurr!</h3>
      <p>At Grace Shopurr our mission is to help cats find new homes. Here on our website, you can search for cats to adopt, or donate cat care products to our shelter. Your contributions are appreciated!</p>
      <img className="large-img" src="http://www.toledoblade.com/image/2014/08/14/800x_b1_cCM_z/n6cats-1.jpg" />
      <img className="large-img" src="https://i.imgur.com/qYhADv5.jpg" />

    </div>
  );
};

export default Home;
