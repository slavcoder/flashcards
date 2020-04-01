import React from "react";
import styles from "./Modal.module.scss";
import PropTypes from 'prop-types'
import ModalLearning from './ModalLearning'
import ModalListDetails from './ModalListDetails'
import ModalNewCard from './ModalNewCard'
import ModalNewList from './ModalNewList'

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
                    ) : name === 'listDetailsModal' ? (
                        <ModalListDetails name={name} {...props} />
                    ) : name === 'newCardModal' || name === 'updateCardModal' ? (
                        <ModalNewCard name={name} {...props} />
                    ) : name === 'newListModal' || name === 'updateListModal' ? (
                        <ModalNewList name={name} {...props} />
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