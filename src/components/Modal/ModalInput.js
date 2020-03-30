import React from 'react';
import styles from './ModalInput.module.scss'

const ModalInput = ({children, type, ...props}) => {
    const inputClass = type === 'textarea' ? 'textarea' : 'input'

    return (
        <>
            {type === 'textarea' ? (
                <textarea
                    {...props}           
                    className={styles[inputClass]}
                >
                    {children}
                </textarea>
            ) : (
                <input
                    {...props}
                    className={styles[inputClass]}
                />
            )}
        </>
    )
}

export default ModalInput