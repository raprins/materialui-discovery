import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRoute } from 'wouter'

import { actions as productAction } from '../../data/products/index'
import Form from '../common/Form'
import { TextField, CircularProgress, TextareaAutosize, Button } from '@material-ui/core'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Loading from '../common/Loading'

const useStyle = makeStyles({
    input : {
        width : '100%',
        marginBottom : '1rem'
    },
    form : {
        marginTop : '1rem'
    }
})


export default () => {
    const dispatch = useDispatch()
    const theme = useTheme()
    const {products, application} = useSelector(state => state)
    const style = useStyle()
    const [, params] = useRoute('/:id')
    useEffect(() => {

        const {id} = params
        if(id) {
            dispatch(productAction.loadProductById(id))
        }
    }, [params.id])
    const submit = e => {
        e.preventDefault()

        const data = Array.from(e.target.elements)
            .filter(el => el.name && el.name.length > 0)
            .reduce((d, el) => {
            d[el.name] = el.value
            return d;
        }, {})

        data['id'] = products.selected.id;

        dispatch(productAction.saveProduct(data))
    }

    if(application.loading) {
        return <Loading title="Loading product" />
    }

    return (
        <form className={style.form} onSubmit={submit}>
            <TextField name="name" className={style.input} label="Name" value={products.selected.name}></TextField>
            <TextField name="imageUrl" className={style.input} label="Description" value={products.selected.imageUrl}></TextField>
            <TextareaAutosize name="description" className={style.input} value={products.selected.description}></TextareaAutosize>
            <Button type="submit" variant="contained" color="primary">Save</Button>
        </form>
    )
}
