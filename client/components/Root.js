import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from './Sidebar';
import Main from './Main';

const Root = ({ children }) => (
  <div id = "main" className="container-fluid">
      <div className="container">
      <div className="row-offcanvas row-offcanvas-left">
      <Main />
    <Sidebar />
    { children }
    </div>
    </div>
  </div>
);

export default Root;

Root.propTypes = {
  children: PropTypes.object
}
