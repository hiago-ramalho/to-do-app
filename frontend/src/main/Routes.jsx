import React from 'react'
import { Router, Route, Redirect, hashHistory } from 'react-router'

import Todo from '../todo/ToDo'
import About from '../about/About'

export default props => (
  <Router history={hashHistory}>
    <Route path="/todos" component={Todo}/>
    <Redirect from="*" to="/todos" />
  </Router>
)