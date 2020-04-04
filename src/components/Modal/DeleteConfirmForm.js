import React from 'react'
import styles from './DeleteConfirmForm.module.scss'
import Button from '../Button/Button'
import ButtonContainer from './ButtonContainer'
import InfoBar from './InfoBar'
import Checkbox from './Checkbox'
import PropTypes from 'prop-types'

const DeleteConfirmForm = ({type, cancelFn, confirmFn, cardsCount}) => (
    <>
        <h3 className={styles.heading}>Delete {type}</h3>
        <InfoBar type='danger'>
            {type === 'card' ? (
                'Deleted cards cannot be restored'
            ) : (
                `All cards (${cardsCount}) of this deck will be deleted too, are you sure to continue?`
            )}
        </InfoBar>
        <form
            onSubmit={e => {
                e.preventDefault()
                confirmFn()
            }}
        >
            <Checkbox 
                labelText={`confirm delete ${type}`}
                name='delete'
                required={true}
            />
            <ButtonContainer>
                <Button 
                    type='neutral'
                    onClick={e => {
                        e.preventDefault()
                        cancelFn()
                    }}
                >
                    close
                </Button>  
                <Button type='danger'>
                    delete
                </Button>  
            </ButtonContainer>
        </form>
    </>
)

DeleteConfirmForm.propTypes = {
    type: PropTypes.string.isRequired,
    cancelFn: PropTypes.func.isRequired,
    confirmFn: PropTypes.func.isRequired,
    cardsCount: PropTypes.number
}

export default DeleteConfirmForm