import React from 'react'
import PropTypes from 'prop-types'
import { ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, Button, IconButton } from '@material-ui/core'
import MoreIcon from '@material-ui/icons/More'
import { makeStyles } from '@material-ui/core/styles'

const useStyle = makeStyles({
    action: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        transform: 'none',
    }
})


export default function ProductListItem({ product, onSelect }) {

    const styles = useStyle()
    const { name, description, imageUrl } = product
    const handleClick = e => {
        e.preventDefault()
        onSelect && onSelect(product)
    }

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar src={imageUrl}></Avatar>
            </ListItemAvatar>
            <ListItemText primary={name} secondary={description}>
                <h2>Hello</h2>
            </ListItemText>
            <ListItemSecondaryAction className={styles.action}>
                <Button disableElevation color="secondary" onClick={handleClick}>See it</Button>
            </ListItemSecondaryAction>
        </ListItem>

    )
}

ProductListItem.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        imageUrl: PropTypes.string
    }),
    onSelect: PropTypes.func
} 
