import React from "react";
import styles from "./Button.module.scss";
import PropTypes from 'prop-types'

const Button = ({type, children, ...props}) => (
    <>
        <button
            className={styles[type]}
            {...props}
        >
            {children}
        </button>
    </>
);

Button.propTypes = {
    type: PropTypes.string.isRequired
}

export default Button;
