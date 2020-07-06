import React from 'react'
import { List, ListItem, ListItemText, ListItemIcon, Fab, IconButton } from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import { useLocation } from 'wouter'

export default ({ products = [] }) => {

    const [location, setLocation] = useLocation()
    const handleCreate = e => {
        setLocation('/products/create')
    }

    return (
        <>
            <List>
                {products.map(p => <ProductListItem key={p.id} product={p} />)}
            </List>

            <Fab
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

const ProductListItem = ({ product }) => {
    const { name } = product;
    return (
        <>
            <ListItem>
                <ListItemText primary={name} />
                <ListItemIcon>
                    <EditIcon />
                </ListItemIcon>
            </ListItem>

        </>
    )
}
