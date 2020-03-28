import React from "react";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import Button from "./components/Button/Button";
import Table from "./components/Table/Table";
import Modal from "./components/Modal/Modal";
import AppContext from './context';
import data from './data/data'
import modals from './data/modals'

const date = new Date()

class App extends React.Component {
    state = {
        today: date.toISOString().split('T')[0],
        list: data,
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
    
    createCard = ({listName, front, back}) => {
        console.log('create card: ' + listName, front, back)

        
        this.setState(prevState => {
            const list = [...prevState.list]
    
            list.forEach(item => {
                if(item.name === listName) {
                    item.cards.push({
                        front: front,
                        back: back,
                        nextRepetition: prevState.today,
                        knowledgeLevel: 0
                    })
                }
            })
            
            return ({
                list: list
            })
        })
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
        const contextElement = {
            showModal: this.showModal,
            closeModal: this.closeModal,
            createCard: this.createCard,
            createList: this.createList,
            setLearningModal: this.setLearningModal,

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
                        <Table 
                            cards={this.state.list.map(item => item.cards).flat()}
                        />
                        {openModal &&
                            <Modal 
                                title={openModal.title}
                                name={openModal.name}
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
