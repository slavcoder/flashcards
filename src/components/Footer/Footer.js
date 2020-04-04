import React from 'react'
import styles from './Footer.module.scss'
import PropTypes from 'prop-types'

const Footer = ({testMode, toggleTestModeFn, showAboutFn}) => (
    <footer className={styles.footer}>
        <a
            href='https://github.com/slavcoder'
            className={styles.link}
        >
            &copy; slavcoder
        </a>
        <button
            onClick={toggleTestModeFn}
            className={styles[testMode ? 'testButtonActive' : 'testButton']}
        >
            {testMode ? 'stop test mode' : 'test mode'}
        </button>
        <button
            onClick={showAboutFn}
            className={styles.aboutButton}
        >
            about
        </button>
    </footer>
)

Footer.propTypes = {
    testMode: PropTypes.bool.isRequired,
    toggleTestModeFn: PropTypes.func.isRequired,
    showAboutFn: PropTypes.func.isRequired
}

export default Footer