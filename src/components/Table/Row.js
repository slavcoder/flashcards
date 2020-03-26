import React from "react";
import styles from "./Row.module.scss";
import Button from '../Button/Button'
import PropTypes from 'prop-types'

const Row = ({learn, count, name, type, showListDetailsFn, learnFn}) => {
    const nameButtonType = type === 'userList' ? 'secondaryLight' : 'secondary'
    const userList = type === 'userList' ? name : false

    return (
        <tr>
            <td
                className={styles.learn}
            >
            {learn ? (
                <Button
                    type='primary'
                    onClick={() => learnFn(learn)}
                >
                    {learn}
                </Button>
            ) : (
                <span
                    className={styles.zeroToLearn}
                >
                    {learn}
                </span>
            )}
                
            </td>

            <td
                className={styles.count}
            >
                {count}
            </td>

            <td
                className={styles.name} 
            >
                <Button
                    type={nameButtonType}
                    onClick={() => showListDetailsFn(userList)}
                >
                    {name}
                </Button>
            </td>
        </tr>
    );
}


Row.propTypes = {
    learn: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string
}

Row.defaultProps = {
    type: 'userList'
}

export default Row;