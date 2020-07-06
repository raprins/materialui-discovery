import React from 'react'
import Form from './common/Form'


export default  () => {

    const elements = {
        name : {
            label : 'Product Name'
        }
    }

    return (
        <Form elements={elements}/>
    )
}
