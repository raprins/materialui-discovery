import React from 'react';
import {
  AppBar, Toolbar, Typography, Button, Fab, Container, Input
} from '@material-ui/core'

import { Route, useLocation, Router, Redirect } from 'wouter'
import { useSelector, useDispatch } from 'react-redux'

import Products from './components/products/Products'
import ProductForm from './components/products/ProductForm';

const App = () => {

  return (
    <>
      <AppBar>
        <Toolbar className="main-toolbar">
          <Typography variant="h5" >Dashboard</Typography>
          <nav>
            <Button variant="contained" color="primary" disableElevation>New</Button>
          </nav>
        </Toolbar>
      </AppBar>
      <Container className="content">
        <Route path="/">
          <Redirect to="/products" />
        </Route>
        <Router base="/products">
          <Route path="/">
            <Products />
          </Route>
          <Route path="/:id">
            <ProductForm />
          </Route>
        </Router>
      </Container>
    </>
  )
}

export default App;


