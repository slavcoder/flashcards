import React from "react";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import Button from "./components/Button/Button";
import Table from "./components/Table/Table";
import Modal from "./components/Modal/Modal";
import AppContext from './context';
import data from './data/data'

const modal = {
        
}

class App extends React.Component {
    state = {
        list: data,
        modal: [
            {
                open: false,
                title: 'learning mode',
                type: 'learning',
                content: {
                    type: '',
                    topActions: [],
                    bottomActions: ['close']
                }
            },
            {
                open: false,
                title: 'new card',
                type: 'new-card',
                content: {
                    type: '',
                    topActions: [],
                    bottomActions: ['close', 'add']
                }
            },
            {
                open: false,
                title: 'update card',
                type: 'update-card',
                content: {
                    type: '',
                    topActions: [],
                    bottomActions: ['delete', 'reset progress', 'close', 'save']
                }
            },
            {
                open: false,
                title: 'new list',
                type: 'new-list',
                content: {
                    type: '',
                    topActions: [],
                    bottomActions: ['close', 'add']
                }
            },
            {
                open: false,
                title: 'update list',
                type: 'update-list',
                content: {
                    type: '',
                    topActions: [],
                    bottomActions: ['close', 'save']
                }
            },
            {
                open: false,
                title: 'list-details',
                type: '',
                content: {
                    type: '',
                    topActions: ['description', 'delete', 'edit'],
                    bottomActions: ['close', 'new', 'learn']
                }
            }
        ],
    }

    learnCards = (x) => {
        console.log('learn: ' + x)
    }

    createCard = () => {
        console.log('create card')
    }

    createList = () => {
        console.log('create list')
    }

    showListDetails = (name) => {
        console.log('show list details:' + name)
        this.setState(prevState => {
            return prevState.modal.map(item => {
                if(item.title == 'list-details') {
                    item.open = true
                }
            })
        })
    }

    render() {
        const date = new Date()

        const contextElement = {
            learnCards: this.learnCards,
            createCard: this.createCard,
            createList: this.createList,
            showListDetails: this.showListDetails,
            lists: this.state.list,
            today: date.toISOString().split('T')[0]
        }

        const openModal = this.state.modal.find(el => el.open)
        console.log(openModal)

        return (
            <>
                <AppContext.Provider value={contextElement}>
                    <Header />
                    <main className={styles.main}>
                        <div className={styles.buttonsContainer}>
                            <Button
                                type='primary'
                                onClick={this.createCard}
                            >
                                new card
                            </Button>
                            <Button
                                type='secondary'
                                onClick={this.createList}
                            >
                                new list
                            </Button>
                        </div>
                        <Table />
                        {openModal &&
                            <Modal 

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
