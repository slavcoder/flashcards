import React from 'react';
import AppContext from '../../context'
import ModalInput from './ModalInput'
import Button from '../Button/Button'
import styles from './ModalNewCard.module.scss'
import ModalInfoBar from './ModalInfoBar'

class ModalNewCard extends React.Component {
    state = {
        listName: '',
        front: '',
        back: '',
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

    render() {
        const {front, back, count} = this.state

        return (
            <>
                <AppContext.Consumer>
                    {context => (
                        <form 
                            className={styles.form}
                            action=""
                            onSubmit={e => {
                                e.preventDefault()
                                context.createCard(this.state)
                                this.countNewCards()
                                this.resetForm()
                            }}
                        >

                            {count ? (
                                <ModalInfoBar type='primary'>
                                    new card created ({count})
                                </ModalInfoBar>
                            ) : ''}

                            {!context.list.length ? (
                                <ModalInfoBar type='danger'>
                                    you have no lists, create one before you add new card
                                </ModalInfoBar>
                            ) : (
                                <>
                                    <div className={styles.selectContainer}>
                                        <label 
                                            htmlFor="listName"
                                            className={styles.label}
                                        >
                                            choose list
                                        </label>
                                        <select 
                                            className={styles.select}
                                            name="listName" 
                                            id="listName" 
                                            onChange={this.updateValue}
                                            defaultValue='select list'
                                            required
                                        >
                                            <option 
                                                className={styles.option}
                                                disabled 
                                                value='select list'
                                            >
                                                - select list -
                                            </option>
                                            {context.list.map((listItem, index) => (
                                                <option 
                                                    className={styles.option}
                                                    key={index}
                                                    value={listItem.name}
                                                >
                                                    {listItem.name}
                                                </option>
                                            ))}
                                        </select>
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
                                </>
                            )}
                            
                            <div className={styles.buttonContainer}>
                                <Button 
                                    type='neutral'
                                    onClick={e => {
                                        e.preventDefault()
                                        context.closeModal(this.props.name)
                                    }}
                                >
                                    close
                                </Button>
                                {context.list.length ? (
                                    <Button 
                                        type='primary'
                                    >
                                        add
                                    </Button>
                                ) : ''}
                            </div>
                        </form>
                    )}
                </AppContext.Consumer>
            </>
        )
    }
}

export default ModalNewCard