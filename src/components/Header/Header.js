import React from 'react'
import styles from './Header.module.scss'

const Header = () => (
    <header className={styles.header}>
        <h1 className={styles.heading}>
            <a className={styles.link} href="https://slavcoder.github.io/flashcards">flashcards</a>
        </h1>            
    </header>
)

export default Header