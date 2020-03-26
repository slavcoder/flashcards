import React from "react";
import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import Button from "./components/Button/Button";
import Table from "./components/Table/Table";
import AppContext from './context';
import data from './data/data'

class App extends React.Component {
    state = {
        list: data
    }

    learnCards(x) {
        console.log('learn: ' + x)
    }

    createCard() {
        console.log('create card')
    }

    createList() {
        console.log('create list')
    }

    showListDetails(name) {
        console.log('show list details:' + name)
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

                    </main>
                    <footer className={styles.footer}></footer>
                </AppContext.Provider>
            </>
        );
    }
}

export default App;
