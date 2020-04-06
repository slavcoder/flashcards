import React from 'react';
import AppContext from '../../context'
import ButtonContainer from './ButtonContainer'
import Button from '../Button/Button'
import styles from './ModalAbout.module.scss'
import PropTypes from 'prop-types'

const ModalAbout = ({name}) => (
    <AppContext.Consumer>
        {context => (
            <>
                <div className={styles.aboutContainer}>
                    <p>This web app is using local storage to store cards and decks (nothing more).</p>
                    <p>I created this app to practice <a href='https://reactjs.org/'>react</a>.</p>
                    <p>Check out my github <a href='https://github.com/slavcoder/flashcards'>repository</a> if you like</p>
                    <p><a href='https://github.com/slavcoder'>slavcoder</a></p>
                </div>
                <ButtonContainer>
                    <Button 
                        type='neutral'
                        onClick={_ => context.closeModal(name)}
                    >
                        close
                    </Button>
                </ButtonContainer>
            </>
        )}
    </AppContext.Consumer>
)

ModalAbout.propTypes = {
    name: PropTypes.string.isRequired
}

export default ModalAbout