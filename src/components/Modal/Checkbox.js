import React from 'react'
import styles from './Checkbox.module.scss'

class Checkbox extends React.Component {
    state = {
        active: false
    }

    toggleActive(e) {
        const bool = e.target.checked ? true : false

        this.setState({
            active: bool
        })
    }

    render() {
        const {name, labelText, changeFn, required} = this.props

        return (
            <label 
                className={styles[this.state.active ? 'labelDanger' : 'label']}
            >
                <input 
                    className={styles.checkbox}
                    type='checkbox' 
                    name={name} 
                    onChange={e => {
                        this.toggleActive(e)
                        if(changeFn) changeFn(e)
                    }}
                    required={required}
                />
                {labelText}
            </label>
        )
    }
}

export default Checkbox


// className={styles[this.state.reset ? 'resetLabelDanger' : 'resetLabel']}