const modals = {
    learningModal: {
        open: false,
        name: 'learningModal',
        title: 'learning mode',
        listId: 'all',
        card: []
    },
    newCardModal: {
        open: false,
        name: 'newCardModal',
        title: 'new card',
        listId: false
    },
    updateCardModal: {
        open: false,
        name: 'updateCardModal',
        title: 'update card',
        card: false
    },
    newListModal: {
        open: false,
        name: 'newListModal',
        title: 'new list'
    },
    updateListModal: {
        open: false,
        name: 'updateListModal',
        title: 'update list',
        list: false
    },
    listDetailsModal: {
        open: false,
        name: 'listDetailsModal',
        title: 'list details',
        listId: 'all',
        showMore: false,
        scrollTop: 0
    }
}

export default modals