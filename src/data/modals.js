const modals = {
    learningModal: {
        open: false,
        title: 'learning mode',
        name: 'learningModal',
        list: 'all',
        // content: {
        //     topButtons: [],
        //     bottomButtons: [
        //         {
        //             active: true,
        //             value: 'close',
        //             type: 'neutral',
        //             action: () => this.closeModal(this.state.learningModal.name)
        //         }
        //     ]
        // }
    },
    newCardModal: {
        name: 'newCardModal',
        open: false,
        title: 'new card',
    },
    updateCardModal: {
        name: 'updateCardModal',
        open: false,
        title: 'update card',
        card: false
        // content: {
        //     topButtons: [],
        //     bottomButtons: [
        //         {
        //             active: true,
        //             value: 'close',
        //             type: 'neutral',
        //             action: () => this.closeModal(this.state.updateCardModal.name)
        //         },
        //         {
        //             active: true,
        //             value: 'delete',
        //             type: 'danger',
        //             action: () => {console.log('todo action')}
        //         },
        //         {
        //             active: true,
        //             value: 'reset progress',
        //             type: 'secondaryLight',
        //             action: () => {console.log('todo action')}
        //         },
        //         {
        //             active: true,
        //             value: 'save',
        //             type: 'primary',
        //             action: () => {console.log('todo action')}
        //         },
        //     ]
        // }
    },
    newListModal: {
        name: 'newListModal',
        open: false,
        title: 'new list'
    },
    updateListModal: {
        name: 'updateListModal',
        open: false,
        title: 'update list',
        // content: {
        //     topButtons: [],
        //     bottomButtons: [
        //         {
        //             active: true,
        //             value: 'close',
        //             type: 'neutral',
        //             action: () => this.closeModal(this.state.updateListModal.name)
        //         },
        //         {
        //             active: true,
        //             value: 'save',
        //             type: 'primary',
        //             action: () => {console.log('todo action')}
        //         },
        //     ]
        // }
    },
    listDetailsModal: {
        name: 'listDetailsModal',
        open: false,
        title: 'list details',
        listId: 'all'
    }
}

export default modals