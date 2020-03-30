import React from 'react'
import styles from './ModalButtonContainer.module.scss'

const ModalButtonContainer = ({children}) => (
    <div className={styles.buttonContainer}>
        {children}
    </div>
)

export default ModalButtonContainer