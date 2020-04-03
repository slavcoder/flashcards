import React from "react";
import styles from "./Table.module.scss";
import Row from './Row'
import AppContext from '../../context'

const Table = () => {
    return (
        <>
            <AppContext.Consumer>
                {context => (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>learn</th>
                                <th>count</th>
                                <th className={styles.name}>deck name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Row
                                learn={context.card.filter(el => context.nextRepetitionInDays(el.nextRepetition) <= 0).length}
                                count={context.card.length}
                                name='all'
                                type='default'
                                learnFn={() => {
                                    context.startLearning('all')
                                }}
                                showDeckDetailsFn={() => {
                                    context.setModal({
                                        modal: 'deckDetailsModal',
                                        key: 'deckId',
                                        value: 'all'
                                    })
                                    context.showModal('deckDetailsModal')
                                }}
                            />
                            {context.deck.map((deck, index) => {
                                const deckCards = context.card.filter(el => el.deckId === deck.id)
                                
                                return (
                                    <Row
                                        key={index}
                                        learn={deckCards.filter(el => {
                                            return context.nextRepetitionInDays(el.nextRepetition) <= 0
                                        }).length}
                                        count={deckCards.length}
                                        name={deck.name}
                                        learnFn={() => {
                                            context.startLearning(deck.id)
                                        }}
                                        showDeckDetailsFn={() => {
                                            context.setModal({
                                                modal: 'deckDetailsModal',
                                                key: 'deckId',
                                                value: deck.id
                                            })
                                            context.showModal('deckDetailsModal')
                                        }}
                                    />
                                )
                            })}
                        </tbody>
                    </table>
                )}
            </AppContext.Consumer>
        </>
    )
};

export default Table;
