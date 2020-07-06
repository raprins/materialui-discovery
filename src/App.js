import React, { useEffect, useState, useCallback } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Fab, Container
} from '@material-ui/core'
import { Link, Route, Redirect, useLocation, Router, useRouter } from 'wouter'
import { fetchData } from './firebase.configuration'
import Products from './components/Products'
import ProductForm from './components/ProductForm';


const App = () => {

  const [products, setProducts] = useState([])
  const router = useRouter()

  useEffect(() => {
    fetchData('/products').then(p => {
      setProducts(p)
    })
  }, [])

  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h5">Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Container className="content">
        <Router>
          <Route path="/">
            <Redirect to="/products" />
          </Route>
          <Route path="/products">
            <Products products={products} />
          </Route>
          <Route path="/products/create">
            <ProductForm />
          </Route>
        </Router>
      </Container>
    </>
  )
}

export default App;
