import React from "react";
import styles from "./Table.module.scss";
import Row from './Row'
import AppContext from '../../context'

const Table = () => (
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
                            learn={23}
                            count={221}
                            name='lorem ipsum dolorem'
                            type='default'
                            learnFn={context.learnCards}
                            showListDetailsFn={context.showListDetails}
                        />
                        {context.lists.map((list, index) => (
                            <Row
                                key={index}
                                learn={list.cards.filter(el => el.nextRepetition === context.today).length}
                                count={list.cards.length}
                                name={list.name}
                                learnFn={context.learnCards}
                                showListDetailsFn={context.showListDetails}
                            />
                        ))}
                    </tbody>
                </table>
            )}
        </AppContext.Consumer>
    </>
);

export default Table;
