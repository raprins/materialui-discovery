import React from 'react'
import { CircularProgress } from '@material-ui/core'
import PropTypes from 'prop-types'


export default function Loading({title}) {
    return (
        <div style={{
            width : '100%',
            height : '300px',
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center'
        }}>
            <CircularProgress title={title}/>
        </div>
    )
}


Loading.propTypes = {
    title : PropTypes.string.isRequired
}

