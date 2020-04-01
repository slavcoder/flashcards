import React from 'react'
import Button from '../Button/Button'
import styles from './TestMode.module.scss'

const TestMode = ({testCardsFn, testListFn, toggleTestModeFn}) => (
    <>
        <p className={styles.bar}>
            test mode
            <button
                onClick={toggleTestModeFn}
                className={styles.barButton}
            >
                stop
            </button> 
        </p>

        <h2 className={styles.heading}>Test mode actions</h2>
        <div className={styles.testModeInfoBox}>
            <Button
                type='primary'
                onClick={() => testCardsFn(20)}
            >
                add 20 test cards
            </Button>
            <Button
                type='secondary'
                onClick={() => testListFn()}
            >
                add test list
            </Button>

            <p>
                In test mode you can add some random data to see how 
                this app works when you have more cards or lists before 
                you spend time to create them by your own
            </p>
            <p>
                Any cards and lists created or modified under test mode are temporary changes
                (not saved). You can experiment: add/delete/edit cards and 
                lists, reset card progress etc.
            </p>
            <p>
                You need at least one list before you can add cards.
            </p>
            <p>
                To stop test mode, click again on button in footer or bottom bar. 
                You can also just refresh the page.
            </p>
        </div>
    </>
)

export default TestMode