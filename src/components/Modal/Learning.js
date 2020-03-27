import React from 'react'
import styles from './Learning.module.scss'
import AppContext from '../../context'

const Learning = ({list}) => (
    <>
        <AppContext.Consumer>
            {context => (
                <h1>list: {list}</h1>
            )}
        </AppContext.Consumer>
    </>
)

export default Learning