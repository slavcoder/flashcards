import React from 'react'
import styles from './ModalInfoBar.module.scss'

const ModalInfoBar = ({children, type}) => {
    return (
        <p className={styles[type]}>
            {children}
        </p>
    )
}

export default ModalInfoBar