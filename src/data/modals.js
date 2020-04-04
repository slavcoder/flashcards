const modals = {
    reviewModal: {
        open: false,
        name: 'reviewModal',
        title: 'review mode',
        deckId: 'all',
        card: []
    },
    newCardModal: {
        open: false,
        name: 'newCardModal',
        title: 'new card',
        deckId: false
    },
    updateCardModal: {
        open: false,
        name: 'updateCardModal',
        title: 'update card',
        card: false
    },
    newDeckModal: {
        open: false,
        name: 'newDeckModal',
        title: 'new deck'
    },
    updateDeckModal: {
        open: false,
        name: 'updateDeckModal',
        title: 'update deck',
        deck: false
    },
    deckDetailsModal: {
        open: false,
        name: 'deckDetailsModal',
        title: 'deck details',
        deckId: 'all',
        showMore: false,
        scrollTop: 0
    },
    aboutModal: {
        open: false,
        name: 'aboutModal',
        title: 'About'
    }
}

export default modals