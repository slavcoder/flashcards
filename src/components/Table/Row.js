import React from "react";
import styles from "./Row.module.scss";
import Button from '../Button/Button'
import PropTypes from 'prop-types'

const Row = ({review, count, name, type, showDeckDetailsFn, reviewFn}) => {
    const nameButtonType = type === 'userDeck' ? 'secondaryLight' : 'secondary'

    return (
        <tr>
            <td className={styles.review}>
            {review ? (
                <Button
                    type='primary'
                    onClick={reviewFn}
                >
                    {review}
                </Button>
            ) : (
                <span>{review}</span>
            )}
            </td>

            <td className={styles.count}>
                {count}
            </td>
            
            <td className={styles.name}>
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
    review: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    showDeckDetailsFn: PropTypes.func.isRequired, 
    reviewFn: PropTypes.func.isRequired
}

Row.defaultProps = {
    type: 'userDeck'
}

export default Row;