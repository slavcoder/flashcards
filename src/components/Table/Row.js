import React from "react";
import styles from "./Row.module.scss";
import Button from '../Button/Button'
import PropTypes from 'prop-types'

const Row = ({learn, count, name, type, showDeckDetailsFn, learnFn}) => {
    const nameButtonType = type === 'userDeck' ? 'secondaryLight' : 'secondary'

    return (
        <tr>
            <td
                className={styles.learn}
            >
            {learn ? (
                <Button
                    type='primary'
                    onClick={learnFn}
                >
                    {learn}
                </Button>
            ) : (
                <span>
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
                    onClick={showDeckDetailsFn}
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
    type: 'userDeck'
}

export default Row;