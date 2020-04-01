import React from 'react';
import AppContext from '../../context'
import ModalInput from './ModalInput'
import Button from '../Button/Button'
import styles from './ModalNewCard.module.scss'
import ModalInfoBar from './ModalInfoBar'
import ModalSelectList from './ModalSelectList'
import ModalButtonContainer from './ModalButtonContainer';
import DeleteConfirmForm from './DeleteConfirmForm';
import Checkbox from './Checkbox';

class ModalNewCard extends React.Component {
    state = {
        listId: this.props.card ? this.props.card.listId : this.props.listId ? this.props.listId : false,
        front: this.props.card ? this.props.card.front : '',
        back: this.props.card ? this.props.card.back : '',
        id: this.props.card ? this.props.card.id : '',
        reset: false,
        count: 0,
        showDeleteConfirmForm: false,
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

    showDeleteConfirmForm = (bool) => {
        this.setState({
            showDeleteConfirmForm: bool
        })
    }

    render() {
        const {front, back, count, listId, id, showDeleteConfirmForm} = this.state
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
                        ) : !context.list.length ? (
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
                                        defaultValue={listId ? listId : 'select list'}
                                        onChangeFn={this.updateValue}
                                    />
                                </div>

                                {name === 'updateCardModal' ? (
                                    <ModalButtonContainer type='bottomSpace'>
                                        <Button 
                                            type='danger'
                                            onClick={e => {
                                                e.preventDefault()
                                                this.showDeleteConfirmForm(true)
                                            }}
                                        >
                                            delete
                                        </Button>
                                    </ModalButtonContainer>
                                ) : ''}

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
                                    <Checkbox 
                                        labelText='reset progress'
                                        changeFn={this.resetProgress}
                                        name='reset'
                                        required={false}
                                    />
                                ) : ''}
                                
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
                                    <Button type='primary'>
                                        {name === 'updateCardModal' ? 'save' : 'add'}
                                    </Button>
                                </ModalButtonContainer>
                            </form>
                        )}
                    </>
                )}
            </AppContext.Consumer>
        )
    }
}

export default ModalNewCard