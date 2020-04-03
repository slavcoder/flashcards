import React from 'react'
import styles from './InfoBar.module.scss'

const InfoBar = ({children, type}) => {
    return (
        <p className={styles[type]}>
            {children}
        </p>
    )
}

export default InfoBar