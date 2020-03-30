import React from 'react';
import AppContext from '../../context'
import ModalInput from './ModalInput'
import Button from '../Button/Button'
import styles from './ModalNewCard.module.scss'
import ModalButtonContainer from './ModalButtonContainer';

class ModalNewList extends React.Component {
    state = {
        listName: '',
        description: ''
    }

    updateValue = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {listName, description} = this.state

        return (
            <>
                <AppContext.Consumer>
                    {context => (
                        <form 
                            className={styles.form}
                            action=""
                            onSubmit={e => {
                                e.preventDefault()
                                context.createList(this.state)
                                context.closeModal(this.props.name)
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
                                        context.closeModal(this.props.name)
                                    }}
                                >
                                    close
                                </Button>
                                <Button 
                                    type='primary'
                                >
                                    add
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