import React from "react";
import styles from "./Modal.module.scss";
import ModalContent from "./ModalContent";
import PropTypes from 'prop-types'
import ModalLearning from './ModalLearning'


const Modal = ({title, name, content, ...props}) => (
    <>
        <div className={styles.modal}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.box}>
                <ModalLearning />
            </div>
        </div>
    </>
);

Modal.propTypes = {

}

export default Modal;