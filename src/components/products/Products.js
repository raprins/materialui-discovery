import React, {useEffect} from 'react'
import { List, Fab, IconButton, Input } from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add'
import { useLocation } from 'wouter'
import { useSelector, useDispatch } from 'react-redux'
import { actions as productActions } from '../../data/products'
import ProductListItem from './ProductListItem'

export default () => {

    const dispatch = useDispatch()
    const {products} = useSelector(state => state)
    const [, setLocation] = useLocation()
    const handleCreate = e => {
        e.preventDefault()
        setLocation('/new')
    }

    const handleSelect = product => {
        setLocation(`/${product.id}`)
    }

    useEffect(() => {
        dispatch(productActions.loadProduct())
    }, [])

    return (
        <>
            <form>
                <Input placeholder="Search a product" 
                    style={{
                width : '100%'
            }}/>
            </form>
            <List>
                {products.list.map(p => <ProductListItem key={p.id} product={p} onSelect={handleSelect}/>)}
            </List>

            <Fab color="secondary"
                onClick={handleCreate}
                style={{
                    position: 'fixed',
                    bottom: '1.5rem',
                    right: '1.5rem',
                }}>
                <AddIcon />
            </Fab>
        </>
    )
}

