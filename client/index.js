import './index.scss'
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './store'
import Routes from './routes'

// establishes socket connection
import socket from './socket'

ReactDOM.render(
  <Provider store={store}>
  <Router>
    <Routes />
    <Route exact path="/" component={Main} />    
    <Route exact path="/cats" component={AllCats} />        
    <Route exact path="/cats" component={AllProducts} /> 
    </Router>
  </Provider>,
  document.getElementById('app')
)
