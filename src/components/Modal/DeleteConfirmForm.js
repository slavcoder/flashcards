import React from 'react'
import styles from './DeleteConfirmForm.module.scss'
import Button from '../Button/Button'
import ModalButtonContainer from './ModalButtonContainer'
import ModalInfoBar from './ModalInfoBar'
import Checkbox from './Checkbox'

const DeleteConfirmForm = ({type, cancelFn, confirmFn, cardsCount}) => {

    return (
        <>
            <h3 className={styles.heading}>Delete {type}</h3>
            <ModalInfoBar type='danger'>
                {type === 'card' ? (
                    'Deleted cards cannot be restored'
                ) : (
                    `All cards (${cardsCount}) of this list will be deleted too, are you sure to continue?`
                )}
            </ModalInfoBar>
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
                <ModalButtonContainer>
                    <Button 
                        type='neutral'
                        onClick={e => {
                            e.preventDefault()
                            cancelFn()
                        }}
                    >
                        close
                    </Button>  
                    <Button 
                        type='danger'
                    >
                        delete
                    </Button>  
                </ModalButtonContainer>
            </form>
        </>
    )
}

export default DeleteConfirmForm