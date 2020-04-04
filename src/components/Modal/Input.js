import React from 'react';
import styles from './Input.module.scss'
import PropTypes from 'prop-types'

const Input = ({children, type, ...props}) => (
    <>
        {type === 'textarea' ? (
            <textarea
                {...props}           
                className={styles[type]}
            >
                {children}
            </textarea>
        ) : (
            <input
                {...props}
                className={styles[type]}
            />
        )}
    </>
)

Input.propTypes = {
    type: PropTypes.string
}

Input.defaultProps = {
    type: 'input'
}

export default Input