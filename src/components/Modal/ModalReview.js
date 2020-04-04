import React from 'react';
import AppContext from '../../context'
import SelectDeck from './SelectDeck'
import ButtonContainer from './ButtonContainer'
import Button from '../Button/Button'
import styles from './ModalReview.module.scss'
import PropTypes from 'prop-types'

class ModalReview extends React.Component {
    state = {
        front: true
    }

    flipCard = () => {
        this.setState(prevState => ({
            front: !prevState.front
        }))
    }

    render() {
        const { card, name, deckId } = this.props
        const { front } = this.state
        const cardStack = card

        return (
            <AppContext.Consumer>
                {context => (
                    <>
                        <div className={styles.selectContainer}>
                            <SelectDeck 
                                labelText='deck'
                                deckArray={context.deck}
                                defaultValue={deckId}
                                showAll={true}
                                onChangeFn={e => {
                                    const newDeckId = e.target.value === 'all' ? e.target.value : 
                                                      Number(e.target.value)
                                    context.startReview(newDeckId)
                                }}
                            />
                        </div>
                        <div className={styles.countCards}>
                            <span className={styles.countText}>left</span>
                            <span className={styles.countNumber}>
                                {cardStack.length}
                            </span>
                        </div>
                        <div>
                            {cardStack.length ? (
                                <>
                                    {front ? (
                                        <>
                                            <h2 className={styles.heading}>
                                                - front -
                                                <button 
                                                    className={styles.flipButton}
                                                    onClick={this.flipCard}
                                                >
                                                    flip card
                                                </button>
                                            </h2>
                                            <div className={styles.front}>
                                                {cardStack[0].front}
                                            </div>
                                            <div className={styles.buttonContainer}>
                                                <Button 
                                                    type='primary'
                                                    onClick={this.flipCard}
                                                >
                                                    check
                                                </Button>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <h2 className={styles.headingNeutral}>
                                                - back -
                                                <button 
                                                    className={styles.flipButton}
                                                    onClick={this.flipCard}
                                                >
                                                    flip card
                                                </button>
                                            </h2>
                                            <div className={styles.back}>
                                                {cardStack[0].back}
                                            </div>
                                            <div className={styles.buttonContainer}>
                                                <Button 
                                                    type='danger'
                                                    onClick={_ => {
                                                        this.flipCard()
                                                        context.handleCard('hard', cardStack[0])
                                                    }}
                                                >
                                                    hard
                                                </Button>
                                                <Button 
                                                    type='neutral'
                                                    onClick={_ => {
                                                        this.flipCard()
                                                        context.handleCard('medium', cardStack[0])
                                                    }}
                                                >
                                                    medium
                                                </Button>
                                                <Button 
                                                    type='primary'
                                                    onClick={_ => {
                                                        this.flipCard()
                                                        context.handleCard('easy', cardStack[0])
                                                    }}
                                                >
                                                    easy
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <h2 className={styles.noCardsInfo}>no cards to learn in this deck</h2>
                            )}
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
    }
}

ModalReview.propTypes = {
    name: PropTypes.string.isRequired,
}


export default ModalReview