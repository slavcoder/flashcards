import React from 'react';
import AppContext from '../../context'
import Input from './Input'
import Button from '../Button/Button'
import styles from './ModalNewCard.module.scss'
import InfoBar from './InfoBar'
import SelectDeck from './SelectDeck'
import ButtonContainer from './ButtonContainer';
import DeleteConfirmForm from './DeleteConfirmForm';
import Checkbox from './Checkbox';
import PropTypes from 'prop-types'

class ModalNewCard extends React.Component {
    state = {
        deckId: this.props.card ? this.props.card.deckId : 
                this.props.deckId ? this.props.deckId : false,
        front: this.props.card ? this.props.card.front : '',
        back: this.props.card ? this.props.card.back : '',
        id: this.props.card ? this.props.card.id : '',
        reset: false,
        count: 0,
        showDeleteConfirmForm: false,
    }

    updateValue = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    resetForm = () => {
        this.setState({
            front: '',
            back: ''
        })
    }

    countNewCards = () => {
        this.setState(prevState => ({
            count: prevState.count + 1
        }))
    }

    resetProgress = e => {
        const reset = e.target.checked ? true : false

        this.setState({
            reset: reset
        })
    }

    showDeleteConfirmForm = bool => {
        this.setState({
            showDeleteConfirmForm: bool
        })
    }

    render() {
        const {front, back, count, deckId, id, showDeleteConfirmForm} = this.state
        const {name} = this.props

        return (
            <AppContext.Consumer>
                {context => (
                    <>
                        {showDeleteConfirmForm ? (
                            <DeleteConfirmForm
                                type='card'
                                cancelFn={() => this.showDeleteConfirmForm(false)}
                                confirmFn={() => {
                                    context.deleteCard(id)
                                    context.closeModal(name)
                                }}
                            >
                            </DeleteConfirmForm>
                        ) : !context.deck.length ? (
                            <>
                                <InfoBar type='danger'>
                                    you have no decks, create one before you add new card
                                </InfoBar>
                                <ButtonContainer>
                                    <Button 
                                        type='neutral'
                                        onClick={() => context.closeModal(name)}
                                    >
                                        close
                                    </Button>
                                </ButtonContainer>
                            </>
                        ) : (
                            <form 
                                className={styles.form}
                                action=""
                                onSubmit={e => {
                                    e.preventDefault()
                                    if(name === 'updateCardModal') {
                                        context.updateCard(this.state)
                                        context.closeModal(name)
                                    }
                                    else {
                                        context.createCard(this.state)
                                        this.countNewCards()
                                        this.resetForm()
                                    }
                                }}
                            >
                                {count ? (
                                    <InfoBar type='primary'>
                                        new card created ({count})
                                    </InfoBar>
                                ) : ''}

                                <div className={styles.selectContainer}>
                                    <SelectDeck 
                                        labelText={name === 'updateCardModal' ? 'change deck' : 'choose deck'}
                                        deckArray={context.deck} 
                                        defaultValue={deckId ? deckId : 'select deck'}
                                        onChangeFn={this.updateValue}
                                    />
                                </div>

                                {name === 'updateCardModal' ? (
                                    <ButtonContainer type='bottomSpace'>
                                        <Button 
                                            type='danger'
                                            onClick={e => {
                                                e.preventDefault()
                                                this.showDeleteConfirmForm(true)
                                            }}
                                        >
                                            delete
                                        </Button>
                                    </ButtonContainer>
                                ) : ''}

                                <Input 
                                    type='textarea'
                                    name='front'
                                    placeholder='question (front)'
                                    required
                                    value={front}
                                    onChange={this.updateValue}
                                />
                                <Input 
                                    type='textarea'
                                    name='back'
                                    placeholder='answer (back)'
                                    required
                                    value={back}
                                    onChange={this.updateValue}
                                />

                                {name === 'updateCardModal' ? (
                                    <Checkbox 
                                        labelText='reset progress'
                                        changeFn={this.resetProgress}
                                        name='reset'
                                        required={false}
                                    />
                                ) : ''}
                                
                                <ButtonContainer>
                                    <Button 
                                        type='neutral'
                                        onClick={e => {
                                            e.preventDefault()
                                            context.closeModal(name)
                                        }}
                                    >
                                        close
                                    </Button>
                                    <Button type='primary'>
                                        {name === 'updateCardModal' ? 'save' : 'add'}
                                    </Button>
                                </ButtonContainer>
                            </form>
                        )}
                    </>
                )}
            </AppContext.Consumer>
        )
    }
}

ModalNewCard.propTypes = {
    name: PropTypes.string.isRequired,
}

export default ModalNewCard