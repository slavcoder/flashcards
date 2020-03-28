import React from "react";
import styles from "./Table.module.scss";
import Row from './Row'
import AppContext from '../../context'

const Table = ({cards}) => {
    console.log(cards)

    return (
        <>
            <AppContext.Consumer>
                {context => (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <td>learn</td><td>count</td><td>name</td>
                            </tr>
                        </thead>
                        <tbody>
                            <Row
                                learn={cards.filter(el => el.nextRepetition === context.today).length}
                                count={cards.length}
                                name='all'
                                type='default'
                                learnFn={() => {
                                    context.setLearningModal('all')
                                    context.showModal('learningModal')
                                }}
                                showListDetailsFn={() => {
                                    context.setLearningModal('all')
                                    context.showModal('listDetailsModal')
                                }}
                            />
                            {context.list.map((list, index) => (
                                <Row
                                    key={index}
                                    learn={list.cards.filter(el => el.nextRepetition === context.today).length}
                                    count={list.cards.length}
                                    name={list.name}
                                    learnFn={() => {
                                        context.setLearningModal(list.name)
                                        context.showModal('learningModal')
                                    }}
                                    showListDetailsFn={() => {
                                        context.setLearningModal(list.name)
                                        context.showModal('listDetailsModal')
                                    }}
                                />
                            ))}
                        </tbody>
                    </table>
                )}
            </AppContext.Consumer>
        </>
    )
};

export default Table;
