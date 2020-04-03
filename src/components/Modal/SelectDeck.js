import React from 'react'
import styles from './SelectDeck.module.scss'

const SelectDeck = ({showAll, labelText, deckArray, defaultValue, onChangeFn}) => {

    return (
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
                        value='all'
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
}

export default SelectDeck