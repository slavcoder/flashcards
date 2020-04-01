import React from 'react'
import styles from './ModalButtonContainer.module.scss'
import PropTypes from 'prop-types'

const ModalButtonContainer = ({children, type}) => (
    <div className={styles[type]}>
        {children}
    </div>
)

ModalButtonContainer.propTypes = {
    type: PropTypes.string
}

ModalButtonContainer.defaultProps = {
    type: 'buttonContainer'
}

export default ModalButtonContainer