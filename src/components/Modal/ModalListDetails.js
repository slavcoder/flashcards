import React from 'react';
import AppContext from '../../context'
import Button from '../Button/Button'
import styles from './ModalListDetails.module.scss'
import ModalSelectList from './ModalSelectList'
import ModalButtonContainer from './ModalButtonContainer';
import DeleteConfirmForm from './DeleteConfirmForm';

class ModalListDetails extends React.Component {

    state = {
        showDeleteConfirmForm: false
    }

    scrollContainer = React.createRef()

    componentDidMount = () => {
        if(!this.props.showMore) this.setTableScroll()
    }

    componentDidUpdate = () => {
        if(!this.props.showMore) this.setTableScroll()
    }

    setTableScroll = () => {
        this.scrollContainer.current.scrollTop = this.props.scrollTop
    }

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

    showDeleteConfirmForm = (bool) => {
        this.setState({
            showDeleteConfirmForm: bool
        })
    }

    getList = (list) => {
        return list.find(el => el.id === this.props.listId)
    }

    render() {
        const {showMore, name, listId} = this.props
        const {showDeleteConfirmForm} = this.state

        return (
            <AppContext.Consumer>
                {context => (
                    <>
                        {showMore ? (
                            <>
                                {showDeleteConfirmForm ? (
                                    <DeleteConfirmForm
                                        type='list'
                                        cancelFn={() => this.showDeleteConfirmForm(false)}
                                        cardsCount={context.card.filter(el => el.listId === listId).length}
                                        confirmFn={() => {
                                            this.showDeleteConfirmForm(false)
                                            context.setModal({
                                                modal: name,
                                                key: 'scrollTop',
                                                value: 0
                                            })
                                            context.setModal({
                                                modal: name,
                                                key: 'showMore',
                                                value: false
                                            })
                                            context.setModal({
                                                modal: name,
                                                key: 'listId',
                                                value: 'all'
                                            })
                                            context.deleteList(listId)
                                        }}
                                    >
                                    </DeleteConfirmForm>
                                ) : (
                                    <>
                                        <ModalButtonContainer type='bottomSpace'>
                                            <Button 
                                                type='danger'
                                                onClick={() => this.showDeleteConfirmForm(true)}
                                            >
                                                delete
                                            </Button>
                                            <Button 
                                                type='secondary'
                                                onClick={() => {
                                                    context.setModal({
                                                        modal: 'updateListModal',
                                                        key: 'list',
                                                        value: this.getList(context.list)
                                                    })
                                                    context.showModal('updateListModal')
                                                }}
                                            >
                                                edit
                                            </Button>
                                        </ModalButtonContainer>
                                        <div className={styles.listDescription}>
                                            <h3 className={styles.listDescriptionTitle}>
                                                {this.getList(context.list).name}
                                            </h3>
                                            <p className={styles.listDescriptionContent}>
                                                {this.getList(context.list).description.length ? (
                                                    this.getList(context.list).description
                                                ) : (
                                                    '(no description)'
                                                )}
                                            </p>
                                        </div>
                                        <ModalButtonContainer>
                                            <Button 
                                                type='neutral'
                                                onClick={() => {
                                                    context.setModal({
                                                        modal: name,
                                                        key: 'showMore',
                                                        value: false
                                                    })
                                                }}
                                            >
                                                close
                                            </Button>
                                        </ModalButtonContainer>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                            <div className={styles.selectContainer}>
                                <ModalSelectList 
                                    labelText='list'
                                    listArray={context.list}
                                    defaultValue={listId}
                                    showAll={true}
                                    onChangeFn={e => {
                                        context.setModal({
                                            modal: name,
                                            key: 'scrollTop',
                                            value: 0
                                        })
                                        context.setModal({
                                            modal: name,
                                            key: 'listId',
                                            value: e.target.value === 'all' ? e.target.value : Number(e.target.value)
                                        })
                                    }}
                                />
                            </div>
                            <div className={styles.countContainer}>
                                <div className={styles.countTitle}>cards</div>
                                <div className={styles.count}>
                                    {listId !== 'all' ? (
                                        context.card.filter(el => el.listId === listId).length
                                    ) : (
                                        context.card.length
                                    )}
                                </div>
                            </div>

                            {listId !== 'all' ? (
                                <ModalButtonContainer type='bottomSpace'>
                                    <Button 
                                        type='primaryLight'
                                        onClick={() => {
                                            context.setModal({
                                                modal: 'newCardModal',
                                                key: 'listId',
                                                value: listId
                                            })
                                            context.showModal('newCardModal')
                                        }}
                                    >
                                        new card
                                    </Button>
                                    <Button 
                                        type='secondary'
                                        onClick={() => {
                                            context.setModal({
                                                modal: name,
                                                key: 'showMore',
                                                value: true
                                            })
                                        }}
                                    >
                                        more
                                    </Button>
                                    
                                </ModalButtonContainer>
                            ) : ''}

                            <div 
                                className={styles.tableContainer} 
                                ref={this.scrollContainer}
                            >
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th className={styles.tableQuestionTitle}>Question (front)</th>
                                            <th className={styles.tableRepetitionTitle}>Next repetition</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {context.card.filter(el => {
                                            if(listId === 'all') {
                                                return el
                                            }
                                            else {
                                                return el.listId === listId
                                            }
                                        }).map((item, index) => (
                                            <tr
                                                key={index}
                                            >
                                                <td className={styles.tableQuestion}>
                                                    <Button
                                                        type='neutralLight'
                                                        onClick={() => {
                                                            context.setModal({
                                                                modal: name,
                                                                key: 'scrollTop',
                                                                value: this.scrollContainer.current.scrollTop
                                                            })
                                                            context.setModal({
                                                                modal: 'updateCardModal',
                                                                key: 'card',
                                                                value: item
                                                            })
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
                                    onClick={() => {
                                        context.setModal({
                                            modal: name,
                                            key: 'scrollTop',
                                            value: 0
                                        })
                                        context.closeModal(name)
                                    }}
                                >
                                    close
                                </Button>

                                <Button 
                                    type='primary'
                                    onClick={() => console.log('TODO: learn')}
                                >
                                    learn
                                </Button>
                            </ModalButtonContainer>
                            </>
                        )}
                    </>
                )}
            </AppContext.Consumer>
        )
    }
}

export default ModalListDetails