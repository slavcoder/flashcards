import React from 'react';
import AppContext from '../../context'
import Input from './Input'
import Button from '../Button/Button'
import styles from './ModalNewDeck.module.scss'
import ButtonContainer from './ButtonContainer';

class ModalNewDeck extends React.Component {
    state = {
        deckName: this.props.deck ? this.props.deck.name : '',
        description: this.props.deck ? this.props.deck.description : '',
        id: this.props.deck ? this.props.deck.id : false
    }

    updateValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {deckName, description} = this.state
        const {name} = this.props

        return (
            <>
                <AppContext.Consumer>
                    {context => (
                        <form 
                            className={styles.form}
                            action=""
                            onSubmit={e => {
                                e.preventDefault()
                                if(name === 'newDeckModal') {
                                    context.createDeck(this.state)
                                }
                                else {
                                    context.updateDeck(this.state)
                                }
                                context.closeModal(name)
                            }}
                        >
                            <Input 
                                name='deckName'
                                placeholder='deck name'
                                required
                                value={deckName}
                                onChange={this.updateValue}
                            />
                            <Input 
                                type='textarea'
                                name='description'
                                placeholder='description (optional)'
                                value={description}
                                onChange={this.updateValue}
                            />
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
                                <Button 
                                    type='primary'
                                >
                                    {name === 'updateDeckModal' ? 'save' : 'add'}
                                </Button>
                            </ButtonContainer>
                        </form>
                    )}
                </AppContext.Consumer>
            </>
        )
    }
}

export default ModalNewDeck