import React from 'react';
import AppContext from '../../context'
import ModalInput from './ModalInput'
import Button from '../Button/Button'
import styles from './ModalNewCard.module.scss'
import ModalInfoBar from './ModalInfoBar'
import ModalSelectList from './ModalSelectList'
import ModalButtonContainer from './ModalButtonContainer';

class ModalNewCard extends React.Component {
    state = {
        listId: this.props.card ? this.props.card.listId : '',
        front: this.props.card ? this.props.card.front : '',
        back: this.props.card ? this.props.card.back : '',
        id: this.props.card ? this.props.card.id : '',
        reset: false,
        count: 0
    }

    updateValue = (e) => {
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
            count: prevState.count++
        }))
    }

    resetProgress = (e) => {
        const reset = e.target.checked ? true : false

        this.setState({
            reset: reset
        })
    }

    render() {
        const {front, back, count} = this.state
        const {name} = this.props

        return (
            <>
                <AppContext.Consumer>
                    {context => (
                        <>
                            {!context.list.length ? (
                                <>
                                    <ModalInfoBar type='danger'>
                                        you have no lists, create one before you add new card
                                    </ModalInfoBar>
                                    <ModalButtonContainer>
                                        <Button 
                                            type='neutral'
                                            onClick={() => context.closeModal(name)}
                                        >
                                            close
                                        </Button>
                                    </ModalButtonContainer>
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
                                        <ModalInfoBar type='primary'>
                                            new card created ({count})
                                        </ModalInfoBar>
                                    ) : ''}

                                    <div className={styles.selectContainer}>
                                        <ModalSelectList 
                                            labelText={name === 'updateCardModal' ? 'change list' : 'choose list'}
                                            listArray={context.list}
                                            defaultValue={name === 'updateCardModal' ? (
                                                context.updateCardModal.card.listId
                                            ) : 'select list'}
                                            onChangeFn={this.updateValue}
                                        />                  
                                    </div>
                                    <ModalInput 
                                        type='textarea'
                                        name='front'
                                        placeholder='question (front)'
                                        required
                                        value={front}
                                        onChange={this.updateValue}
                                    />
                                    <ModalInput 
                                        type='textarea'
                                        name='back'
                                        placeholder='answer (back)'
                                        required
                                        value={back}
                                        onChange={this.updateValue}
                                    />

                                    {name === 'updateCardModal' ? (
                                        <label className={styles[this.state.reset ? 'resetLabelDanger' : 'resetLabel']}>
                                            <input 
                                                className={styles.resetCheckbox}
                                                type='checkbox' 
                                                name='reset' 
                                                onChange={this.resetProgress}
                                            />
                                            reset progress
                                        </label>
                                    ) : ''}
                                    
                                    <ModalButtonContainer>
                                        {name === 'updateCardModal' ? (
                                        <Button 
                                            type='danger'
                                            onClick={e => {
                                                e.preventDefault()
                                                console.log('TODO delete card')
                                                context.closeModal(name)
                                            }}
                                        >
                                            delete
                                        </Button>    
                                        ) : ''}
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
                                    </ModalButtonContainer>
                                </form>
                            )}
                        </>
                    )}
                </AppContext.Consumer>
            </>
        )
    }
}

export default ModalNewCard