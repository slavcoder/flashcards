import React from "react";
import styles from "./Modal.module.scss";
import PropTypes from 'prop-types'
import ModalLearning from './ModalLearning'
import ModalListDetails from './ModalListDetails'
import ModalNewCard from './ModalNewCard'
import ModalNewList from './ModalNewList'
import ModalUpdateCard from './ModalUpdateCard'
import ModalUpdateList from './ModalUpdateList'

const Modal = ({title, name}) => (
    <>
        <div className={styles.modal}>
            <h2 className={styles.title}>{title}</h2>
            
            <div className={styles.box}>
                {name === 'learningModal' ? (
                    <ModalLearning />
                ) : name === 'listDetailsModal' ? (
                    <ModalListDetails />
                ) : name === 'newCardModal' ? (
                    <ModalNewCard name={name} />
                ) : name === 'newListModal' ? (
                    <ModalNewList />
                ) : name === 'updateCardModal' ? (
                    <ModalUpdateCard />
                ) : (
                    <ModalUpdateList />
                )}
            </div>
        </div>
    </>
);

Modal.propTypes = {
    title: PropTypes.string.isRequired
}

export default Modal;