import React from "react";
import Button from '../Button/Button'
import styles from "./ModalContent.module.scss";
import AppContext from '../../context'
import Learning from './Learning'
import Table from './Table'
import Form from './Form'

const ModalContent = ({name, topButtons, bottomButtons, ...props}) => {

    return (
        <>
            <AppContext.Consumer>
            {context => (
                <div className={styles.content}>
                    <div className={styles.topButtons}>
                        {topButtons.filter(btn => btn.active).map((btn, index) => (
                            <Button 
                                key={index}
                                type={btn.type}
                                onClick={btn.action}
                            >
                                {btn.value}
                            </Button>
                        ))}
                    </div>

                    <div className={styles.customBlockContainer}>
                        {name === 'learningModal' ? (
                            <Learning 
                                {...props}
                            />
                        ) : name === 'listDetailsModal' ? (
                            <Table />
                        ) : (
                            <Form />
                        )}
                    </div>

                    <div className={styles.bottomButtons}>
                        {bottomButtons.filter(btn => btn.active).map((btn, index) => (
                            <Button 
                                key={index}
                                type={btn.type}
                                onClick={btn.action}
                            >
                                {btn.value}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
            </AppContext.Consumer>
        </>
    );
}

// onClick={() => context[btn.action](name)}

export default ModalContent;