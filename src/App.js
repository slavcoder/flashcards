import React from "react";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import Button from "./components/Button/Button";
import Table from "./components/Table/Table";
import Modal from "./components/Modal/Modal";
import AppContext from './context';
import card from './data/card'
import list from './data/list'
import modals from './data/modals'

class App extends React.Component {
    state = {
        list: list,
        card: card,
        ...modals
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
    
    createCard = ({listId, front, back}) => {
        const today = new Date()

        this.setState(prevState => ({
            card: [...prevState.card, {
                id: prevState.card[prevState.card.length-1].id + 1,
                listId: Number(listId),
                front: front,
                back: back,
                nextRepetition: today.toISOString(),
                knowledgeLevel: 0
            }]
        }))
    }

    createList = ({listName, description}) => {
        this.setState(prevState => ({
            list: [...prevState.list, {
                id: prevState.list[prevState.list.length-1].id + 1,
                name: listName,
                description: description
            }]
        }))
    }
    
    updateCard = ({id, listId, front, back, reset}) => {
        let today = new Date()

        this.setState(prevState => ({
            card: prevState.card.map(el => el.id === id ? {
                ...el,
                listId: Number(listId),
                front: front,
                back: back,
                nextRepetition: reset ? today.toISOString() : el.nextRepetition,
                knowledgeLevel: reset ? 0 : el.knowledgeLevel
            } : el)
        }))
    }

    setLearning = (listName) => {
        console.log('learning :' + listName)
        
        this.setState(prevState => {
            const modal = {...prevState.learningModal}
            modal.list = listName
            
            return ({
                learningModal: modal
            })
        })
    }

    setListDetails = (listId) => {
        listId = listId === 'all' ? listId : Number(listId)

        this.setState(prevState => {
            const modal = {...prevState.listDetailsModal}
            modal.listId = listId
            
            return ({
                listDetailsModal: modal
            })
        })
    }

    setUpdateCard = (card) => {
        this.setState(prevState => {
            const modal = {...prevState.updateCardModal}
            modal.card = card
            
            return ({
                updateCardModal: modal
            })
        })
    }

    nextRepetitionInDays = (cardNextRepetition) => {
        const today = new Date()
        const cardRepetitionDate = new Date(cardNextRepetition)
        const daysDiff = Math.floor((cardRepetitionDate - today)/(1000*60*60*24))
        return daysDiff
    }

    render() {

        const contextElement = {
            showModal: this.showModal,
            closeModal: this.closeModal,
            createCard: this.createCard,
            createList: this.createList,
            setListDetails: this.setListDetails,
            setLearningModal: this.setLearningModal,
            nextRepetitionInDays: this.nextRepetitionInDays,
            setUpdateCard: this.setUpdateCard,
            updateCard: this.updateCard,
            ...this.state
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
                            <>
                                <div className={styles.modalBackground}></div>
                                <Modal 
                                    title={openModal.title}
                                    name={openModal.name}
                                />
                            </>
                        }
                        
                    </main>
                    <footer className={styles.footer}></footer>
                </AppContext.Provider>
            </>
        );
    }
}

export default App;
