import React from 'react'
import styles from './ButtonContainer.module.scss'
import PropTypes from 'prop-types'

const ButtonContainer = ({children, type}) => (
    <div className={styles[type]}>
        {children}
    </div>
)

ButtonContainer.propTypes = {
    type: PropTypes.string
}

ButtonContainer.defaultProps = {
    type: 'buttonContainer'
}

export default ButtonContainer