import React from "react";
import styles from "./Modal.module.scss";
import PropTypes from 'prop-types'
import ModalLearning from './ModalLearning'
import ModalListDetails from './ModalListDetails'
import ModalNewCard from './ModalNewCard'
import ModalNewList from './ModalNewList'
import ModalUpdateCard from './ModalUpdateCard'
import ModalUpdateList from './ModalUpdateList'

const Modal = ({title, name}) => {
    const primaryModals = ['learningModal', 'newCardModal', 'updateCardModal']
    const titleClass = primaryModals.includes(name) ? 'titlePrimary' : 'titleSecondary'

    return (
        <>
            <div className={styles.modal}>
                <h2 
                    className={styles[titleClass]}
                >
                    {title}
                </h2>
                
                <div className={styles.box}>
                    {name === 'learningModal' ? (
                        <ModalLearning name={name} />
                    ) : name === 'listDetailsModal' ? (
                        <ModalListDetails name={name} />
                    ) : name === 'newCardModal' ? (
                        <ModalNewCard name={name} />
                    ) : name === 'newListModal' ? (
                        <ModalNewList name={name} />
                    ) : name === 'updateCardModal' ? (
                        <ModalUpdateCard name={name} />
                    ) : (
                        <ModalUpdateList name={name} />
                    )}
                </div>
            </div>
        </>
    )
};

Modal.propTypes = {
    title: PropTypes.string.isRequired
}

export default Modal;