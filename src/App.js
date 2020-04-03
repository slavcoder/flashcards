import React from "react";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import Button from "./components/Button/Button";
import Table from "./components/Table/Table";
import Modal from "./components/Modal/Modal";
import Footer from "./components/Footer/Footer";
import TestMode from "./components/TestMode/TestMode";
import AppContext from './context';
import modals from './data/modals'
import { testText } from './data/testData'
import data from './data/data'

const list = data.get('list')
const card = data.get('card')

class App extends React.Component {
    state = {
        list: list,
        card: card,
        testMode: false,
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
                    id: prevState.card.length ? prevState.card[prevState.card.length-1].id + 1 : 1,
                    listId: Number(listId),
                    front: front,
                    back: back,
                    nextRepetition: today.toISOString(),
                    knowledgeLevel: 0
                }
            ]
        }), () => this.saveChanges('card'))
    }

    createList = ({listName, description}) => {
        this.setState(prevState => ({
            list: [
                ...prevState.list, 
                {
                    id: prevState.list.length ? prevState.list[prevState.list.length-1].id + 1 : 1,
                    name: listName,
                    description: description
                }
            ]
        }), () => this.saveChanges('list'))
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
        }), () => this.saveChanges('card'))

    }

    updateList = ({listName, description, id}) => {
        if(!id) return

        this.setState(prevState => ({
            list: prevState.list.map(el => el.id === id ? {
                ...el,
                name: listName,
                description: description
            }: el)
        }), () => this.saveChanges('list'))
    }

    setModal = ({modal, key, value}) => {
        this.setState(prevState => ({
            [modal]: {
                ...prevState[modal],
                [key]: value
            }
        }))
    }

    startLearning = (listId) => {
        console.log(listId)
        const allCards = this.state.card.filter(el => listId === 'all' ? el : el.listId === listId)
        const cardsToLearn = allCards.filter(el => this.nextRepetitionInDays(el.nextRepetition) <= 0)
        cardsToLearn.forEach(el => el.hardCount = 1)
        
        this.setState(prevState => ({
            learningModal: {
                ...prevState.learningModal,
                listId: listId,
                open: true,
                card: cardsToLearn
            }
        }))
    }

    handleCard = (level, card) => {
        // level: hard/medium/easy
        const cardList = [...this.state.learningModal.card]
        console.log('handleCard')
        console.log(cardList)

        if(level === 'hard') {
            card.hardCount++
            cardList.shift()
            cardList.push(card)

            this.setModal({
                modal: 'learningModal',
                key: 'card',
                value: cardList
            })

        } else if(level === 'medium') {
            cardList.shift()
            const today = new Date()
            const days = card.knowledgeLevel === 0 ? 2:
                         card.knowledgeLevel === 1 ? Math.floor(Math.random() * 3) + 1 :
                         card.knowledgeLevel === 2 ? Math.floor(Math.random() * 7) + 3 :
                         Math.floor(Math.random() * 5) + 10

            const nextRepetition = new Date(today.getTime() + Math.floor(days / card.hardCount) * 24 * 60 * 60 * 1000)

            this.setState(prevState => ({
                card: prevState.card.map(el => el.id === card.id ? {
                    ...el,
                    nextRepetition: nextRepetition.toISOString(),
                } : el),
                learningModal: {
                    ...prevState.learningModal,
                    card: cardList
                }
            }), () => this.saveChanges('card'))

        } else {
            cardList.shift()
            const today = new Date()
            const days = card.knowledgeLevel === 0 ? 2:
                         card.knowledgeLevel === 1 ? Math.floor(Math.random() * 5) + 5 :
                         card.knowledgeLevel === 2 ? Math.floor(Math.random() * 10) + 25 :
                         card.knowledgeLevel === 3 ? Math.floor(Math.random() * 20) + 80 :
                         card.knowledgeLevel === 4 ? Math.floor(Math.random() * 30) + 340 :
                         Math.floor(Math.random() * 365) + 365

            const nextRepetition = new Date(today.getTime() + Math.floor(days / card.hardCount) * 24 * 60 * 60 * 1000)

            this.setState(prevState => ({
                card: prevState.card.map(el => el.id === card.id ? {
                    ...el,
                    nextRepetition: nextRepetition.toISOString(),
                    knowledgeLevel: el.knowledgeLevel + 1,
                } : el),
                learningModal: {
                    ...prevState.learningModal,
                    card: cardList
                }
            }), () => this.saveChanges('card'))
        }
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
        }), () => this.saveChanges('card'))
    }

    deleteList = (listId) => {
        console.log('delete list: ' + listId)

        this.setState(prevState => ({
            list: prevState.list.filter(el => el.id !== listId),
            card: prevState.card.filter(el => el.listId !== listId)
        }), () => {
            this.saveChanges('list')
            this.saveChanges('card')
        })
    }

    testCards = (amount) => {
        if(!this.state.list.length) return
        const newCards = []
        const startId = this.state.card.length ? this.state.card[this.state.card.length-1].id : 1
        const listIdArr = this.state.list.map(el => el.id)
        const listIdArrLength = listIdArr.length
        const textArr = testText.split('. ').filter(el => el.trim().length)
        const textArrLength = textArr.length

        for(let i = 1; i <= amount; i++) {
            newCards.push({
                id: startId+i,
                listId: listIdArr[Math.floor(Math.random() * (listIdArrLength))],
                front: textArr[Math.floor(Math.random() * textArrLength)],
                back: textArr[Math.floor(Math.random() * textArrLength)],
                nextRepetition: `202${Math.floor(Math.random()*3)}-${Math.floor((Math.random()*12)+1)}-${Math.floor((Math.random()*28)+1)}`,
                knowledgeLevel: Math.floor(Math.random()*5)
            })
        }

        console.log(`added ${amount} cards`)
        // console.log(newCards)

        this.setState(prevState => ({
            card: [
                ...prevState.card,
                ...newCards
            ]
        }), () => this.saveChanges('card'))
    }

    testList = () => {
        const textArr = testText.split('. ').filter(el => el.trim().length)
        const description = textArr[Math.floor(Math.random() * textArr.length)]
        const listName = description.split(' ')[0]

        this.setState(prevState => ({
            list: [
                ...prevState.list, 
                {
                    id: prevState.list.length ? prevState.list[prevState.list.length-1].id + 1 : 1,
                    name: listName,
                    description: description
                }
            ]
        }), () => this.saveChanges('list'))
    }

    toggleTestMode = () => {
        this.setState(prevState => ({
            testMode: !prevState.testMode
        }), () => {
            if(!this.state.testMode) {
                this.closeModal('learningModal')
                this.closeModal('newCardModal')
                this.closeModal('updateCardModal')
                this.closeModal('newListModal')
                this.closeModal('updateListModal')
                this.closeModal('listDetailsModal')
                this.loadLastSave()
            }
        })
    }

    saveChanges = (name) => {
        if(!this.state.testMode) {
            data.set(name, [...this.state[name]])
        }
    }

    loadLastSave = () => {
        const card = data.get('card')
        const list = data.get('list')

        this.setState({
            card: card,
            list: list,
        })
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
            startLearning: this.startLearning,
            handleCard: this.handleCard,
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

        const {testMode} = this.state

        const openModal = allModals.find(el => el.open)

        return (
            <>
                <AppContext.Provider value={contextElement}>
                    <Header 
                        onLoad={() => this.showModal('newCardModal')}
                    />
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

                        {testMode && (
                            <TestMode 
                                testCardsFn={this.testCards}
                                testListFn={this.testList}
                                toggleTestModeFn={this.toggleTestMode}
                            />
                        )}
                    </main>
                    <Footer 
                        testMode={testMode}
                        toggleTestModeFn={this.toggleTestMode}
                    />
                </AppContext.Provider>
            </>
        );
    }
}

export default App;