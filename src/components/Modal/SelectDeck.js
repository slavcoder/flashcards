import React from 'react'
import styles from './SelectDeck.module.scss'
import PropTypes from 'prop-types'

const SelectDeck = ({showAll, labelText, deckArray, defaultValue, onChangeFn}) => (
    <>
        <label 
            htmlFor="deckName"
            className={styles.label}
        >
            {labelText}
        </label>
        <select 
            className={styles.select}
            name="deckId" 
            id="deckName" 
            onChange={onChangeFn}
            defaultValue={defaultValue}
            required
        >
            {showAll ? (
                <option 
                    className={styles.option} 
                    value={0}
                >
                    all
                </option>
            ) : (
                <option 
                    className={styles.option}
                    disabled 
                    value='select deck'
                >
                    - select deck -
                </option>
            )}

            {deckArray.map((deckItem, index) => (
                <option 
                    className={styles.option}
                    key={index}
                    value={deckItem.id}
                >
                    {deckItem.name}
                </option>
            ))}
        </select>
    </>
)

SelectDeck.propTypes = {
    showAll: PropTypes.bool,
    labelText: PropTypes.string.isRequired,
    deckArray: PropTypes.array.isRequired,
    onChangeFn: PropTypes.func.isRequired,
}

SelectDeck.defaultProps = {
    showAll: false,
}

export default SelectDeck