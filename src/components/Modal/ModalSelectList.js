import React from 'react'
import styles from './ModalSelectList.module.scss'

const ModalSelectList = ({showAll, labelText, listArray, defaultValue, onChangeFn}) => {

    return (
        <>
            <label 
                htmlFor="listName"
                className={styles.label}
            >
                {labelText}
            </label>
            <select 
                className={styles.select}
                name="listId" 
                id="listName" 
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
                        value='select list'
                    >
                        - select list -
                    </option>
                )}
                {listArray.map((listItem, index) => (
                    <option 
                        className={styles.option}
                        key={index}
                        value={listItem.id}
                    >
                        {listItem.name}
                    </option>
                ))}
            </select>
        </>
    )
}

export default ModalSelectList