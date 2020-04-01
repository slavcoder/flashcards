import React from 'react';
import AppContext from '../../context'
import ModalInput from './ModalInput'
import Button from '../Button/Button'
import styles from './ModalNewCard.module.scss'
import ModalButtonContainer from './ModalButtonContainer';

class ModalNewList extends React.Component {
    state = {
        listName: this.props.list ? this.props.list.name : '',
        description: this.props.list ? this.props.list.description : '',
        id: this.props.list ? this.props.list.id : false
    }

    updateValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {listName, description} = this.state
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
                                if(name === 'newListModal') {
                                    context.createList(this.state)
                                }
                                else {
                                    context.updateList(this.state)
                                }
                                context.closeModal(name)
                            }}
                        >
                            <ModalInput 
                                name='listName'
                                placeholder='list name'
                                required
                                value={listName}
                                onChange={this.updateValue}
                            />
                            <ModalInput 
                                type='textarea'
                                name='description'
                                placeholder='description (optional)'
                                value={description}
                                onChange={this.updateValue}
                            />
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
                                <Button 
                                    type='primary'
                                >
                                    {name === 'updateListModal' ? 'save' : 'add'}
                                </Button>
                            </ModalButtonContainer>
                        </form>
                    )}
                </AppContext.Consumer>
            </>
        )
    }
}

export default ModalNewList