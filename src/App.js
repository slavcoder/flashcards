import React from "react";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import Button from "./components/Button/Button";
import Table from "./components/Table/Table";
import Modal from "./components/Modal/Modal";
import AppContext from './context';
import data from './data/data'
// import modals from './data/modals'


// const modals = [
//     'learningModal',
//     'newCardModal',
//     'updateCardModal',
//     'newListModal',
//     'updateListModal',
//     'listDetailsModal'
// ]

class App extends React.Component {
    state = {
        list: data,
        learningModal: {
            open: false,
            title: 'learning mode',
            name: 'learningModal',
            list: 'all',
            content: {
                topButtons: [],
                bottomButtons: [
                    {
                        active: true,
                        value: 'close',
                        type: 'neutral',
                        action: () => this.closeModal(this.state.learningModal.name)
                    }
                ]
            }
        },
        newCardModal: {
            name: 'newCardModal',
            open: false,
            title: 'new card',
            content: {
                topButtons: [],
                bottomButtons: [
                    {
                        active: true,
                        value: 'close',
                        type: 'neutral',
                        action: () => this.closeModal(this.state.newCardModal.name)
                    },
                    {
                        active: true,
                        value: 'add',
                        type: 'primary',
                        action: () => {console.log('todo action')}
                    }
                ]
            }
        },
        updateCardModal: {
            name: 'updateCardModal',
            open: false,
            title: 'update card',
            content: {
                topButtons: [],
                bottomButtons: [
                    {
                        active: true,
                        value: 'close',
                        type: 'neutral',
                        action: () => this.closeModal(this.state.updateCardModal.name)
                    },
                    {
                        active: true,
                        value: 'delete',
                        type: 'danger',
                        action: () => {console.log('todo action')}
                    },
                    {
                        active: true,
                        value: 'reset progress',
                        type: 'secondaryLight',
                        action: () => {console.log('todo action')}
                    },
                    {
                        active: true,
                        value: 'save',
                        type: 'primary',
                        action: () => {console.log('todo action')}
                    },
                ]
            }
        },
        newListModal: {
            name: 'newListModal',
            open: false,
            title: 'new list',
            content: {
                topButtons: [],
                bottomButtons: [
                    {
                        active: true,
                        value: 'close',
                        type: 'neutral',
                        action: () => this.closeModal(this.state.newListModal.name)
                    },
                    {
                        active: true,
                        value: 'add',
                        type: 'primary',
                        action: () => {console.log('todo action')}
                    },
                ]
            }
        },
        updateListModal: {
            name: 'updateListModal',
            open: false,
            title: 'update list',
            content: {
                topButtons: [],
                bottomButtons: [
                    {
                        active: true,
                        value: 'close',
                        type: 'neutral',
                        action: () => this.closeModal(this.state.updateListModal.name)
                    },
                    {
                        active: true,
                        value: 'save',
                        type: 'primary',
                        action: () => {console.log('todo action')}
                    },
                ]
            }
        },
        listDetailsModal: {
            name: 'listDetailsModal',
            open: false,
            title: 'list details',
            content: {
                topButtons: [
                    {
                        active: true,
                        value: 'description',
                        type: 'neutral',
                        action: () => {console.log('todo action')}
                    },
                    {
                        active: true,
                        value: 'delete',
                        type: 'danger',
                        action: () => {console.log('todo action')}
                    },
                    {
                        active: true,
                        value: 'edit',
                        type: 'secondary',
                        action: () => {console.log('todo action')}
                    },
                ],
                bottomButtons: [
                    {
                        active: true,
                        value: 'close',
                        type: 'neutral',
                        action: () =>  this.closeModal(this.state.listDetailsModal.name)
                    },
                    {
                        active: true,
                        value: 'new card',
                        type: 'primaryLight',
                        action: () => this.showModal(this.state.updateListModal.name),
                    },
                    {
                        active: true,
                        value: 'learn',
                        type: 'primary',
                        action: () => {console.log('todo action')}
                    },
                ]
            }
        }
    }

    showModal = (modalName) => {
        console.log('show modal: ' + modalName)

        this.setState(prevState => {
            const modal = {...prevState[modalName]}
            modal.open = true

            return ({
                [modalName]: modal
            })
        })
    }

    closeModal = (modalName) => {
        console.log('close modal: ' + modalName)
        
        this.setState(prevState => {
            const modal = {...prevState[modalName]}
            modal.open = false
            
            return ({
                [modalName]: modal
            })
        })
    }
    
    createCard = (newCard) => {
        // newCard: {
        //     list: '',
        //     front: '',
        //     back: ''
        // }
        console.log('create card')
    }

    setLearningModal = (listName) => {
        console.log('learning :' + listName)
        
        this.setState(prevState => {
            const modal = {...prevState.learningModal}
            modal.list = listName
            
            return ({
                learningModal: modal
            })
        })
    }

    render() {
        const date = new Date()

        const contextElement = {
            showModal: this.showModal,
            closeModal: this.closeModal,
            createCard: this.createCard,
            createList: this.createList,
            setLearningModal: this.setLearningModal,
            
            list: this.state.list,
            today: date.toISOString().split('T')[0]
        }

        const allModals = [
            this.state.learningModal,
            this.state.newCardModal,
            this.state.updateCardModal,
            this.state.newListModal,
            this.state.updateListModal,
            this.state.listDetailsModal
        ]

        const openModal = allModals.find(el => el.open)

        return (
            <>
                <AppContext.Provider value={contextElement}>
                    <Header />
                    <main className={styles.main}>
                        <div className={styles.buttonsContainer}>
                            <Button
                                type='primary'
                                onClick={() => this.showModal('newCardModal')}
                            >
                                new card
                            </Button>
                            <Button
                                type='secondary'
                                onClick={() => this.showModal('newListModal')}
                            >
                                new list
                            </Button>
                        </div>
                        <Table />
                        {openModal &&
                            <Modal 
                                {... openModal}
                            />
                        }
                        
                    </main>
                    <footer className={styles.footer}></footer>
                </AppContext.Provider>
            </>
        );
    }
}

export default App;
