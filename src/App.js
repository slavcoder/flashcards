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

    showModal = (modal) => {
        this.setModal({
            modal: modal,
            key: 'open',
            value: true
        })
    }
    
    closeModal = (modal) => {
        this.setModal({
            modal: modal,
            key: 'open',
            value: false
        })
    }

    createCard = ({listId, front, back}) => {
        const today = new Date()

        this.setState(prevState => ({
            card: [
                ...prevState.card, 
                {
                    id: prevState.card[prevState.card.length-1].id + 1,
                    listId: Number(listId),
                    front: front,
                    back: back,
                    nextRepetition: today.toISOString(),
                    knowledgeLevel: 0
                }
            ]
        }))
    }

    createList = ({listName, description}) => {
        this.setState(prevState => ({
            list: [
                ...prevState.list, 
                {
                    id: prevState.list[prevState.list.length-1].id + 1,
                    name: listName,
                    description: description
                }
            ]
        }))
    }
    
    updateCard = ({id, listId, front, back, reset}) => {
        if(!listId) return
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

    updateList = ({listName, description, id}) => {
        if(!id) return

        this.setState(prevState => ({
            list: prevState.list.map(el => el.id === id ? {
                ...el,
                name: listName,
                description: description
            }: el)
        }))
    }

    setModal = ({modal, key, value}) => {
        this.setState(prevState => ({
            [modal]: {
                ...prevState[modal],
                [key]: value
            }
        }))
    }

    nextRepetitionInDays = (cardNextRepetition) => {
        const today = new Date()
        const cardRepetitionDate = new Date(cardNextRepetition)
        const daysDiff = Math.floor((cardRepetitionDate - today)/(1000*60*60*24))
        return daysDiff
    }

    deleteCard = (id) => {
        console.log('delete card: ' + id)

        this.setState(prevState => ({
            card: prevState.card.filter(el => el.id !== id)
        }))
    }

    deleteList = (listId) => {
        console.log('delete list: ' + listId)

        this.setState(prevState => ({
            list: prevState.list.filter(el => el.id !== listId),
            card: prevState.card.filter(el => el.listId !== listId)
        }))
    }

    render() {

        const contextElement = {
            showModal: this.showModal,
            closeModal: this.closeModal,
            createCard: this.createCard,
            updateCard: this.updateCard,
            createList: this.createList,
            updateList: this.updateList,
            setModal: this.setModal,
            nextRepetitionInDays: this.nextRepetitionInDays,
            deleteCard: this.deleteCard,
            deleteList: this.deleteList,
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
                                onClick={() => {
                                    this.setModal({
                                        modal: 'newCardModal',
                                        key: 'listId',
                                        value: false
                                    })
                                    this.showModal('newCardModal')
                                }}
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
                                    {...openModal}
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