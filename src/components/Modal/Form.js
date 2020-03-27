import React from 'react'
import styles from './Form.module.scss'
import AppContext from '../../context'

class Form extends React.Component {
    state = {
        newCard: {
            list: '',
            front: '',
            back: ''
        }
    }

    render() {
        return (
            <>
                <AppContext.Consumer>
                    {context => (
                        <form action="">
                            <label htmlFor="list">choose list</label>
                            <select name="" id="list">
                                {context.list.map((item, index) => (
                                    <option 
                                        key={index}
                                        value={item.name}
                                    >
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                            <textarea 
                                name="cardFront" 
                                id="" 
                                cols="30" 
                                rows="5"
                                placeholder="question (front)"
                            >
                            </textarea>
                            <textarea 
                                name="cardBack" 
                                id="" 
                                cols="30" 
                                rows="5"
                                placeholder="answer (back)"
                            >
                            </textarea>
                        </form>
                    )}
                </AppContext.Consumer>
            </>
        )
    }
}


export default Form