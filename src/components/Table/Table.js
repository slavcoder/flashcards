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
                                <th>learn</th><th>count</th><th className={styles.name}>name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Row
                                learn={context.card.filter(el => {
                                    return context.nextRepetitionInDays(el.nextRepetition) <= 0
                                }).length}
                                count={context.card.length}
                                name='all'
                                type='default'
                                learnFn={() => {
                                    context.setLearningModal('all')
                                    context.showModal('learningModal')
                                }}
                                showListDetailsFn={() => {
                                    context.setListDetails('all')
                                    context.showModal('listDetailsModal')
                                }}
                            />
                            {context.list.map((list, index) => {
                                const listCards = context.card.filter(el => el.listId === list.id)
                                
                                return (
                                    <Row
                                        key={index}
                                        learn={listCards.filter(el => {
                                            return context.nextRepetitionInDays(el.nextRepetition) <= 0
                                        }).length}
                                        count={listCards.length}
                                        name={list.name}
                                        learnFn={() => {
                                            context.setLearningModal(list.name)
                                            context.showModal('learningModal')
                                        }}
                                        showListDetailsFn={() => {
                                            context.setListDetails(list.id)
                                            context.showModal('listDetailsModal')
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
