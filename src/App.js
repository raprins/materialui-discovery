import React, { useEffect, useState, useRef } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Fab, Container, IconButton
} from '@material-ui/core'

import { Route, useLocation, Router, Redirect } from 'wouter'
import { useSelector, useDispatch } from 'react-redux'

import { actions as productsAction } from './data/products/index'
import Products from './components/Products'
import ProductForm from './components/ProductForm';


const App = () => {
  const [location, navigate] = useLocation()
  const dispatch = useDispatch()
  const products = useSelector(state => state.products)

  useEffect(() => {
    dispatch(productsAction.loadProduct())
  }, [])

  return (
    <>
      <AppBar>
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5" >Dashboard</Typography>

          <nav>
            <Button variant="contained" color="primary" disableElevation
              onClick={e => navigate('/products/form')}
            >New</Button>
          </nav>
        </Toolbar>
      </AppBar>
      <Container className="content">
        <Route path="/">
          <Redirect to="/products" />
        </Route>
        <Router base="/products">
          <Route path="/">
            <Products products={products} />
          </Route>
          <Route path="/form">
            <ProductForm />
          </Route>
        </Router>
      </Container>
    </>
  )
}

export default App;


