import React from 'react';
import AppContext from '../../context'
import Button from '../Button/Button'
import styles from './ModalDeckDetails.module.scss'
import SelectDeck from './SelectDeck'
import ButtonContainer from './ButtonContainer';
import DeleteConfirmForm from './DeleteConfirmForm';

class ModalDeckDetails extends React.Component {

    state = {
        showDeleteConfirmForm: false
    }

    scrollContainer = React.createRef()

    componentDidMount = () => {
        if(!this.props.showMore) this.setTableScroll()
    }

    componentDidUpdate = () => {
        if(!this.props.showMore) this.setTableScroll()
    }

    setTableScroll = () => {
        this.scrollContainer.current.scrollTop = this.props.scrollTop
    }

    nextRepetition = (days, getColor) => {
        let text = ''
        let classColor = ''

        if (days <= 0) {
            text = 'today'
            classColor = 'repetitionPrimary'
        } else if (days === 1) {
            text = 'tomorrow'
            classColor = 'repetitionPrimaryLight'
        } else if (days > 1 && days < 8) {
            text = 'in 7 days'
            classColor = 'repetitionPrimaryLighter'
        } else if (days >= 8 && days < 30) {
            text = 'in 30 days'
            classColor = 'repetitionPrimaryDeepLight'
        } else if (days >= 30 && days < 90) {
            text = 'in 3 months'
            classColor = 'repetitionPrimaryDeepLighter'
        } else if (days >= 90 && days < 180) {
            text = 'in 6 months'
            classColor = 'repetitionNeutral'
        } else if (days >= 180 && days < 365) {
            text = 'in 1 year'
            classColor = 'repetitionNeutralLight'
        } else {
            text = 'in far future'
            classColor = 'repetitionNeutralLighter'
        }

        return getColor ? classColor : text
    }

    showDeleteConfirmForm = (bool) => {
        this.setState({
            showDeleteConfirmForm: bool
        })
    }

    getDeck = (deck) => {
        return deck.find(el => el.id === this.props.deckId)
    }

    render() {
        const {showMore, name, deckId} = this.props
        const {showDeleteConfirmForm} = this.state

        return (
            <AppContext.Consumer>
                {context => (
                    <>
                        {showMore ? (
                            <>
                                {showDeleteConfirmForm ? (
                                    <DeleteConfirmForm
                                        type='deck'
                                        cancelFn={() => this.showDeleteConfirmForm(false)}
                                        cardsCount={context.card.filter(el => el.deckId === deckId).length}
                                        confirmFn={() => {
                                            this.showDeleteConfirmForm(false)
                                            context.setModal({
                                                modal: name,
                                                key: 'scrollTop',
                                                value: 0
                                            })
                                            context.setModal({
                                                modal: name,
                                                key: 'showMore',
                                                value: false
                                            })
                                            context.setModal({
                                                modal: name,
                                                key: 'deckId',
                                                value: 'all'
                                            })
                                            context.deleteDeck(deckId)
                                        }}
                                    >
                                    </DeleteConfirmForm>
                                ) : (
                                    <>
                                        <ButtonContainer type='bottomSpace'>
                                            <Button 
                                                type='danger'
                                                onClick={() => this.showDeleteConfirmForm(true)}
                                            >
                                                delete
                                            </Button>
                                            <Button 
                                                type='secondary'
                                                onClick={() => {
                                                    context.setModal({
                                                        modal: 'updateDeckModal',
                                                        key: 'deck',
                                                        value: this.getDeck(context.deck)
                                                    })
                                                    context.showModal('updateDeckModal')
                                                }}
                                            >
                                                edit
                                            </Button>
                                        </ButtonContainer>
                                        <div className={styles.deckDescription}>
                                            <h3 className={styles.deckDescriptionTitle}>
                                                {this.getDeck(context.deck).name}
                                            </h3>
                                            <p className={styles.deckDescriptionContent}>
                                                {this.getDeck(context.deck).description.length ? (
                                                    this.getDeck(context.deck).description
                                                ) : (
                                                    '(no description)'
                                                )}
                                            </p>
                                        </div>
                                        <ButtonContainer>
                                            <Button 
                                                type='neutral'
                                                onClick={() => {
                                                    context.setModal({
                                                        modal: name,
                                                        key: 'showMore',
                                                        value: false
                                                    })
                                                }}
                                            >
                                                close
                                            </Button>
                                        </ButtonContainer>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                            <div className={styles.selectContainer}>
                                <SelectDeck 
                                    labelText='deck'
                                    deckArray={context.deck}
                                    defaultValue={deckId}
                                    showAll={true}
                                    onChangeFn={e => {
                                        context.setModal({
                                            modal: name,
                                            key: 'scrollTop',
                                            value: 0
                                        })
                                        context.setModal({
                                            modal: name,
                                            key: 'deckId',
                                            value: e.target.value === 'all' ? e.target.value : Number(e.target.value)
                                        })
                                    }}
                                />
                            </div>
                            <div className={styles.countContainer}>
                                <div className={styles.countTitle}>cards</div>
                                <div className={styles.count}>
                                    {deckId !== 'all' ? (
                                        context.card.filter(el => el.deckId === deckId).length
                                    ) : (
                                        context.card.length
                                    )}
                                </div>
                            </div>

                            {deckId !== 'all' ? (
                                <ButtonContainer type='bottomSpace'>
                                    <Button 
                                        type='primaryLight'
                                        onClick={() => {
                                            context.setModal({
                                                modal: 'newCardModal',
                                                key: 'deckId',
                                                value: deckId
                                            })
                                            context.showModal('newCardModal')
                                        }}
                                    >
                                        new card
                                    </Button>
                                    <Button 
                                        type='secondary'
                                        onClick={() => {
                                            context.setModal({
                                                modal: name,
                                                key: 'showMore',
                                                value: true
                                            })
                                        }}
                                    >
                                        more
                                    </Button>
                                    
                                </ButtonContainer>
                            ) : ''}

                            <div 
                                className={styles.tableContainer} 
                                ref={this.scrollContainer}
                            >
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th className={styles.tableQuestionTitle}>Question (front)</th>
                                            <th className={styles.tableRepetitionTitle}>Next repetition</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {context.card.filter(el => {
                                            if(deckId === 'all') {
                                                return el
                                            }
                                            else {
                                                return el.deckId === deckId
                                            }
                                        }).map((item, index) => (
                                            <tr
                                                key={index}
                                            >
                                                <td className={styles.tableQuestion}>
                                                    <Button
                                                        type='neutralLight'
                                                        onClick={() => {
                                                            context.setModal({
                                                                modal: name,
                                                                key: 'scrollTop',
                                                                value: this.scrollContainer.current.scrollTop
                                                            })
                                                            context.setModal({
                                                                modal: 'updateCardModal',
                                                                key: 'card',
                                                                value: item
                                                            })
                                                            context.showModal('updateCardModal')
                                                        }}
                                                    >
                                                        {item.front}
                                                    </Button>
                                                </td>
                                                <td 
                                                    className={
                                                        styles[this.nextRepetition(context.nextRepetitionInDays(item.nextRepetition), true)]
                                                    }
                                                >
                                                    {this.nextRepetition(context.nextRepetitionInDays(item.nextRepetition), false)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <ButtonContainer>
                                <Button 
                                    type='neutral'
                                    onClick={() => {
                                        context.setModal({
                                            modal: name,
                                            key: 'scrollTop',
                                            value: 0
                                        })
                                        context.closeModal(name)
                                    }}
                                >
                                    close
                                </Button>

                                <Button 
                                    type='primary'
                                    onClick={() => console.log('TODO: learn')}
                                >
                                    learn
                                </Button>
                            </ButtonContainer>
                            </>
                        )}
                    </>
                )}
            </AppContext.Consumer>
        )
    }
}

export default ModalDeckDetails