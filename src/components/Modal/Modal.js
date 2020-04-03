import React from "react";
import styles from "./Modal.module.scss";
import PropTypes from 'prop-types'
import ModalLearning from './ModalLearning'
import ModalDeckDetails from './ModalDeckDetails'
import ModalNewCard from './ModalNewCard'
import ModalNewDeck from './ModalNewDeck'

const Modal = ({title, name, ...props}) => {
    const primaryModals = ['learningModal', 'newCardModal', 'updateCardModal']
    const titleClass = primaryModals.includes(name) ? 'titlePrimary' : 'titleSecondary'

    return (
        <>
            <div className={styles.modal}>
                <h2  className={styles[titleClass]}>
                    {title}
                </h2>
                
                <div className={styles.box}>
                    {name === 'learningModal' ? (
                        <ModalLearning name={name} {...props} />
                    ) : name === 'deckDetailsModal' ? (
                        <ModalDeckDetails name={name} {...props} />
                    ) : name === 'newCardModal' || name === 'updateCardModal' ? (
                        <ModalNewCard name={name} {...props} />
                    ) : name === 'newDeckModal' || name === 'updateDeckModal' ? (
                        <ModalNewDeck name={name} {...props} />
                    ) : ''}
                </div>
            </div>
        </>
    )
};

Modal.propTypes = {
    title: PropTypes.string.isRequired
}

export default Modal;