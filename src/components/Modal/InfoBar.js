import React from 'react'
import styles from './InfoBar.module.scss'
import PropTypes from 'prop-types'

const InfoBar = ({children, type}) => (
    <p className={styles[type]}>
        {children}
    </p>
)

InfoBar.propTypes = {
    type: PropTypes.string.isRequired
}

export default InfoBar