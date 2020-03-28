import React from 'react';
import AppContext from '../../context'
import ModalInput from './ModalInput'
import Button from '../Button/Button'

class ModalNewCard extends React.Component {
    state = {
        listName: '',
        front: '',
        back: ''
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

    render() {
        const {front, back} = this.state

        return (
            <>
                <AppContext.Consumer>
                    {context => (
                        <form 
                            action=""
                            onSubmit={e => {
                                e.preventDefault()
                                context.createCard(this.state)
                                this.resetForm()
                            }}
                        >
                            <label htmlFor="">choose list</label>
                            <select 
                                name="listName" 
                                id="" 
                                onChange={this.updateValue}
                                defaultValue='select list'
                                required
                            >
                                <option disabled value='select list'>select list</option>
                                {context.list.map((listItem, index) => (
                                    <option 
                                        key={index}
                                        value={listItem.name}
                                    >
                                        {listItem.name}
                                    </option>
                                ))}
                            </select>
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
                            <div>
                                <Button 
                                    type='primary'
                                >
                                    add
                                </Button>
                                <Button 
                                    type='neutral'
                                    onClick={e => {
                                        e.preventDefault()
                                        context.closeModal(this.props.name)
                                    }}
                                >
                                    close
                                </Button>
                            </div>
                        </form>
                    )}
                </AppContext.Consumer>
            </>
        )
    }
}

export default ModalNewCard