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

const deck = data.get('deck')
const card = data.get('card')

class App extends React.Component {
    state = {
        deck: deck,
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

    createCard = ({deckId, front, back}) => {
        const today = new Date()

        this.setState(prevState => ({
            card: [
                ...prevState.card, 
                {
                    id: prevState.card.length ? prevState.card[prevState.card.length-1].id + 1 : 1,
                    deckId: Number(deckId),
                    front: front,
                    back: back,
                    nextRepetition: today.toISOString(),
                    knowledgeLevel: 0
                }
            ]
        }), () => this.saveChanges('card'))
    }

    createDeck = ({deckName, description}) => {
        this.setState(prevState => ({
            deck: [
                ...prevState.deck, 
                {
                    id: prevState.deck.length ? prevState.deck[prevState.deck.length-1].id + 1 : 1,
                    name: deckName,
                    description: description
                }
            ]
        }), () => this.saveChanges('deck'))
    }
    
    updateCard = ({id, deckId, front, back, reset}) => {
        if(!deckId) return
        let today = new Date()

        this.setState(prevState => ({
            card: prevState.card.map(el => el.id === id ? {
                ...el,
                deckId: Number(deckId),
                front: front,
                back: back,
                nextRepetition: reset ? today.toISOString() : el.nextRepetition,
                knowledgeLevel: reset ? 0 : el.knowledgeLevel
            } : el)
        }), () => this.saveChanges('card'))

    }

    updateDeck = ({deckName, description, id}) => {
        if(!id) return

        this.setState(prevState => ({
            deck: prevState.deck.map(el => el.id === id ? {
                ...el,
                name: deckName,
                description: description
            }: el)
        }), () => this.saveChanges('deck'))
    }

    setModal = ({modal, key, value}) => {
        this.setState(prevState => ({
            [modal]: {
                ...prevState[modal],
                [key]: value
            }
        }))
    }

    startLearning = (deckId) => {
        console.log(deckId)
        const allCards = this.state.card.filter(el => deckId === 'all' ? el : el.deckId === deckId)
        const cardsToLearn = allCards.filter(el => this.nextRepetitionInDays(el.nextRepetition) <= 0)
        cardsToLearn.forEach(el => el.hardCount = 1)
        
        this.setState(prevState => ({
            learningModal: {
                ...prevState.learningModal,
                deckId: deckId,
                open: true,
                card: cardsToLearn
            }
        }))
    }

    handleCard = (level, card) => {
        // level: hard/medium/easy
        const cardDeck = [...this.state.learningModal.card]
        console.log('handleCard')
        console.log(cardDeck)

        if(level === 'hard') {
            card.hardCount++
            cardDeck.shift()
            cardDeck.push(card)

            this.setModal({
                modal: 'learningModal',
                key: 'card',
                value: cardDeck
            })

        } else if(level === 'medium') {
            cardDeck.shift()
            const today = new Date()
            const days = card.knowledgeLevel === 0 ? 2:
                         card.knowledgeLevel === 1 ? Math.random() * 3 + 1 :
                         card.knowledgeLevel === 2 ? Math.random() * 7 + 3 :
                         Math.random() * 5 + 10

            const nextRepetition = new Date(today.getTime() + Math.floor(days / card.hardCount * 24 * 60 * 60 * 1000))

            this.setState(prevState => ({
                card: prevState.card.map(el => el.id === card.id ? {
                    ...el,
                    nextRepetition: nextRepetition.toISOString(),
                } : el),
                learningModal: {
                    ...prevState.learningModal,
                    card: cardDeck
                }
            }), () => this.saveChanges('card'))

        } else {
            cardDeck.shift()
            const today = new Date()
            const days = card.knowledgeLevel === 0 ? 2:
                         card.knowledgeLevel === 1 ? Math.random() * 5  + 5   :
                         card.knowledgeLevel === 2 ? Math.random() * 10 + 25  :
                         card.knowledgeLevel === 3 ? Math.random() * 20 + 80  :
                         card.knowledgeLevel === 4 ? Math.random() * 30 + 340 :
                         Math.random() * 365 + 365

            const nextRepetition = new Date(today.getTime() + Math.floor(days / card.hardCount * 24 * 60 * 60 * 1000))

            this.setState(prevState => ({
                card: prevState.card.map(el => el.id === card.id ? {
                    ...el,
                    nextRepetition: nextRepetition.toISOString(),
                    knowledgeLevel: el.knowledgeLevel + 1,
                } : el),
                learningModal: {
                    ...prevState.learningModal,
                    card: cardDeck
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

    deleteDeck = (deckId) => {
        console.log('delete deck: ' + deckId)

        this.setState(prevState => ({
            deck: prevState.deck.filter(el => el.id !== deckId),
            card: prevState.card.filter(el => el.deckId !== deckId)
        }), () => {
            this.saveChanges('deck')
            this.saveChanges('card')
        })
    }

    testCards = (amount) => {
        if(!this.state.deck.length) return
        const newCards = []
        const startId = this.state.card.length ? this.state.card[this.state.card.length-1].id : 1
        const deckIdArr = this.state.deck.map(el => el.id)
        const deckIdArrLength = deckIdArr.length
        const textArr = testText.split('. ').filter(el => el.trim().length)
        const textArrLength = textArr.length

        for(let i = 1; i <= amount; i++) {
            newCards.push({
                id: startId+i,
                deckId: deckIdArr[Math.floor(Math.random() * (deckIdArrLength))],
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

    testDeck = () => {
        const textArr = testText.split('. ').filter(el => el.trim().length)
        const description = textArr[Math.floor(Math.random() * textArr.length)]
        const deckName = description.split(' ')[0]

        this.setState(prevState => ({
            deck: [
                ...prevState.deck, 
                {
                    id: prevState.deck.length ? prevState.deck[prevState.deck.length-1].id + 1 : 1,
                    name: deckName,
                    description: description
                }
            ]
        }), () => this.saveChanges('deck'))
    }

    toggleTestMode = () => {
        this.setState(prevState => ({
            testMode: !prevState.testMode
        }), () => {
            if(!this.state.testMode) {
                this.closeModal('learningModal')
                this.closeModal('newCardModal')
                this.closeModal('updateCardModal')
                this.closeModal('newDeckModal')
                this.closeModal('updateDeckModal')
                this.closeModal('deckDetailsModal')
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
        const deck = data.get('deck')

        this.setState({
            card: card,
            deck: deck,
        })
    }

    render() {
        const contextElement = {
            showModal: this.showModal,
            closeModal: this.closeModal,
            createCard: this.createCard,
            updateCard: this.updateCard,
            createDeck: this.createDeck,
            updateDeck: this.updateDeck,
            setModal: this.setModal,
            nextRepetitionInDays: this.nextRepetitionInDays,
            deleteCard: this.deleteCard,
            deleteDeck: this.deleteDeck,
            startLearning: this.startLearning,
            handleCard: this.handleCard,
            ...this.state
        }

        const allModals = [
            this.state.learningModal,
            this.state.newCardModal,
            this.state.updateCardModal,
            this.state.newDeckModal,
            this.state.updateDeckModal,
            this.state.deckDetailsModal
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
                                        key: 'deckId',
                                        value: false
                                    })
                                    this.showModal('newCardModal')
                                }}
                            >
                                new card
                            </Button>
                            <Button
                                type='secondary'
                                onClick={() => this.showModal('newDeckModal')}
                            >
                                new deck
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
                                testDeckFn={this.testDeck}
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