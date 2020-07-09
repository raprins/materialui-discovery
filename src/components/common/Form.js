import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, Button, Grid, TextareaAutosize, useTheme, Typography } from '@material-ui/core'
import { saveData } from '../../data/firebase.configuration'

const Form = ({ elements = {}, onSubmit }) => {

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


    const handleSubmit = e => {
        e.preventDefault()

        if (onSubmit) {
            const names = Object.keys(elements);
            const data = Array.from(e.target.elements)
                .filter(formElement => names.includes(formElement.name))
                .reduce((aggr, current) => {
                    const result = { ...aggr }
                    result[current.name] = current.value
                    return result
                }, {})

            onSubmit(data)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container style={{
                width: '100%'
            }} spacing={3}>
                {formElements.map(f => (
                    <Grid item key={f.name} xs={12}>
                        <FormElement element={f} />
                    </Grid>

                ))}
                <Grid item xs={12}>
                    <Button type="submit" color="primary" variant="contained">Save</Button>
                </Grid>

            </Grid>
        </form>
    )
}

const inputStyle = {
    width: '100%'
}
const FormElement = ({ element }) => {
    const theme = useTheme()
    const { name, label, defaultValue, type } = element

    switch (type) {
        case 'textarea' : 
            return (
                <>
                <Typography>{label}</Typography>
                <TextareaAutosize style={{
                    ...inputStyle,
                    fontFamily : theme.typography.fontFamily
                }}  
                defaultValue={defaultValue}></TextareaAutosize>
                </>
            )
        default:
            return (
                <TextField style={inputStyle} name={name} label={label} defaultValue={defaultValue} />
            )
    }


}

FormElement.propTypes = {
    element: PropTypes.object
};

export default Form