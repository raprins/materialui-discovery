import React, { useEffect, useState } from 'react'
import {TextField} from '@material-ui/core'

const Form = ({ elements = {} }) => {

    const [formElements, setFormElements] = useState([])
    
    useEffect(() => {
        const e = Object.keys(elements).map(name => {
            return {
                name,
                ...elements[name]
            }
        })
        setFormElements(e)
    }, [elements])

    return (
        <form>
            {formElements.map(f => (<FormElement key={f.name} element={f} />))}
        </form>
    )
}


const FormElement = ({element}) => {

    const {name, label} = element
    return (
        <TextField name={name} label={label} />
    )
}

export default Form