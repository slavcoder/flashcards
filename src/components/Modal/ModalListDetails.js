import React from 'react';
import AppContext from '../../context'
import Button from '../Button/Button'
import styles from './ModalListDetails.module.scss'
import ModalSelectList from './ModalSelectList'
import ModalButtonContainer from './ModalButtonContainer';

class ModalListDetails extends React.Component {
    nextRepetition = (days, getColor) => {
        let text = ''
        let classColor = ''

        if (days <= 0) {
            text = 'today'
            classColor = 'repetitionPrimary'
        } else if (days === 1) {
            text = 'tomorrow'
            classColor = 'repetitionPrimaryLight'
        } else if (days > 1 && days < 8) {
            text = 'in 7 days'
            classColor = 'repetitionPrimaryLighter'
        } else if (days >= 8 && days < 30) {
            text = 'in 30 days'
            classColor = 'repetitionPrimaryDeepLight'
        } else if (days >= 30 && days < 90) {
            text = 'in 3 months'
            classColor = 'repetitionPrimaryDeepLighter'
        } else if (days >= 90 && days < 180) {
            text = 'in 6 months'
            classColor = 'repetitionNeutral'
        } else if (days >= 180 && days < 365) {
            text = 'in 1 year'
            classColor = 'repetitionNeutralLight'
        } else {
            text = 'in far future'
            classColor = 'repetitionNeutralLighter'
        }

        return getColor ? classColor : text
    }

    render() {
        return (
            <>
                <AppContext.Consumer>
                    {context => (
                        <>
                            {context.listDetailsModal.listId !== 'all' ? (
                                <ModalButtonContainer>
                                    <Button 
                                        type='neutral'
                                        onClick={() => console.log('TODO: show description')}
                                    >
                                        description
                                    </Button>
                                    <Button 
                                        type='danger'
                                        onClick={() => console.log('TODO: delete list')}
                                    >
                                        delete
                                    </Button>
                                    <Button 
                                        type='secondary'
                                        onClick={() => console.log('TODO: edit list')}
                                    >
                                        edit
                                    </Button>
                                </ModalButtonContainer>
                            ) : ''}

                            <div className={styles.selectContainer}>
                                <ModalSelectList 
                                    labelText='list'
                                    listArray={context.list}
                                    defaultValue={
                                        context.listDetailsModal.listId !== 'all' ? (
                                            context.list.find(el => el.id === context.listDetailsModal.listId).id
                                        ) : (
                                            'all'
                                        )
                                    }
                                    showAll={true}
                                    onChangeFn={(e) => {context.setListDetails(e.target.value)}}
                                />
                            </div>
                            <div className={styles.countContainer}>
                                <div className={styles.countTitle}>cards</div>
                                <div className={styles.count}>
                                    {context.listDetailsModal.listId !== 'all' ? (
                                        context.card.filter(el => el.listId === context.listDetailsModal.listId).length
                                    ) : (
                                        context.card.length
                                    )}
                                </div>
                            </div>

                            <div className={styles.tableContainer}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th className={styles.tableQuestionTitle}>Question (front)</th>
                                            <th className={styles.tableRepetitionTitle}>Next repetition</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {context.card.filter(el => {
                                            if(context.listDetailsModal.listId === 'all') {
                                                return el
                                            }
                                            else {
                                                return el.listId === context.listDetailsModal.listId
                                            }
                                        }).map((item, index) => (
                                            <tr
                                                key={index}
                                            >
                                                <td className={styles.tableQuestion}>
                                                    <Button
                                                        type='neutralLight'
                                                        onClick={() => {
                                                            context.setUpdateCard(item)
                                                            context.showModal('updateCardModal')
                                                        }}
                                                    >
                                                        {item.front}
                                                    </Button>
                                                </td>
                                                <td 
                                                    className={
                                                        styles[this.nextRepetition(context.nextRepetitionInDays(item.nextRepetition), true)]
                                                    }
                                                >
                                                    {this.nextRepetition(context.nextRepetitionInDays(item.nextRepetition), false)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <ModalButtonContainer>
                                <Button 
                                    type='neutral'
                                    onClick={() => context.closeModal(this.props.name)}
                                >
                                    close
                                </Button>

                                {context.listDetailsModal.listId !== 'all' ? (
                                    <Button 
                                        type='primaryLight'
                                        onClick={() => console.log('TODO: new card')}
                                    >
                                        new card
                                    </Button>
                                ) : ''}

                                <Button 
                                    type='primary'
                                    onClick={() => console.log('TODO: learn')}
                                >
                                    learn
                                </Button>
                            </ModalButtonContainer>                            
                        </>
                    )}
                </AppContext.Consumer>
            </>
        )
    }
}

export default ModalListDetails