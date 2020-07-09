import React, { useState, useEffect, Component } from 'react'

function NotFound() {
    return (
        <h1>Not Found</h1>
    )
}


/**
 * @typedef {object} route
 * @property {string} path
 * @property {Component} component
 */

/**
 * 
 * @param {Array<route>} routes 
 */
export function useNavigation(routes) {
    const [actualRoute, setActualRoute] = useState({
        path : '/',
        component : () => <></>
    })

    const navigate = (path) => {
        const r = routes.filter(r => r.path === path)[0];
        
        if(r) {
            setActualRoute(r)
        }else{
            setActualRoute({
                path : '/not-found',
                component : () => <NotFound />
            })
        }
    }

    useEffect(() => {
        navigate('/')
    }, [])

    const component = actualRoute.component

    return [
        component,
        navigate
    ]
}
