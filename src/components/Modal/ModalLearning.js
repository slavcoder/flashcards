import React from 'react';
import AppContext from '../../context'
import ModalSelectList from './ModalSelectList'
import ModalButtonContainer from './ModalButtonContainer'
import Button from '../Button/Button'
import styles from './ModalLearning.module.scss'

class ModalLearning extends React.Component {
    state = {
        // card: this.props.card
        front: true
    }

    flipCard = () => {
        console.log('flip card')
        this.setState(prevState => ({
            front: !prevState.front
        }))
    }

    render() {
        const { card, name, listId } = this.props
        const { front } = this.state
        // const cardStack = card.sort((a,b) => a.hardCount - b.hardCount)
        const cardStack = card

        return (
            <AppContext.Consumer>
                {context => (
                    <>
                        <div className={styles.selectContainer}>
                            <ModalSelectList 
                                labelText='list'
                                listArray={context.list}
                                defaultValue={listId}
                                showAll={true}
                                onChangeFn={e => {
                                    const newListId = e.target.value === 'all' ? e.target.value : Number(e.target.value)
                                    context.startLearning(newListId)
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
                                                Question (front)
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
                                                Answer (back)
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
                                <h2 className={styles.noCardsInfo}>no cards to learn on this list</h2>
                            )}
                            <div>
                            </div>
                        </div>
                        <ModalButtonContainer>
                            <Button 
                                type='neutral'
                                onClick={e => {
                                    e.preventDefault()
                                    context.closeModal(name)
                                }}
                            >
                                close
                            </Button>
                        </ModalButtonContainer>
                    </>
                )}
            </AppContext.Consumer>
        )
    }
}

export default ModalLearning


// {this.getCardsToLearn(context.card, context.nextRepetitionInDays).length}