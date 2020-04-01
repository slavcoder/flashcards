import React from 'react'
import styles from './Footer.module.scss'

const Footer = ({testMode, toggleTestModeFn}) => {
    return (
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
                {testMode ? 'stop test mode' : 'run test mode'}
            </button>
        </footer>
    )
}

export default Footer