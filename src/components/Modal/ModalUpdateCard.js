import React from 'react';
import ModalNewCard from './ModalNewCard'
import AppContext from '../../context'

const ModalUpdateCard = ({name}) => (
    <AppContext.Consumer>
        {(context => (
            <ModalNewCard 
                name={name} 
                card={context.updateCardModal.card}
            />
        ))}
    </AppContext.Consumer>
)

export default ModalUpdateCard