import React from "react";
import styles from "./Table.module.scss";
import Row from './Row'
import AppContext from '../../context'

const Table = () => (
    <AppContext.Consumer>
        {context => (
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>review</th>
                        <th>count</th>
                        <th className={styles.name}>deck name</th>
                    </tr>
                </thead>
                <tbody>
                    <Row
                        review={context.card.filter(el => context.nextReviewInDays(el.nextReview) <= 0).length}
                        count={context.card.length}
                        name='all'
                        type='default'
                        reviewFn={() => context.startReview(0)}
                        showDeckDetailsFn={() => context.showDeckDetails(0)}
                    />
                    {context.deck.map((deck, index) => {
                        const deckCards = context.card.filter(el => el.deckId === deck.id)

                        return (
                            <Row
                                key={index}
                                review={deckCards.filter(el => context.nextReviewInDays(el.nextReview) <= 0).length}
                                count={deckCards.length}
                                name={deck.name}
                                reviewFn={() => context.startReview(deck.id)}
                                showDeckDetailsFn={() => context.showDeckDetails(deck.id)}
                            />
                        )
                    })}
                </tbody>
            </table>
        )}
    </AppContext.Consumer>
)

export default Table;
