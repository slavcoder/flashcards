import React from 'react';

const ModalInput = ({children, type, ...props}) => (
    <>
        {type === 'textarea' ? (
            <textarea
                {...props}           
            >
                {children}
            </textarea>
        ) : (
            <input
                {...props}
            />
        )}
    </>
)

export default ModalInput