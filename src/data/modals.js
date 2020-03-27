const modals = {
    learningModal: {
        open: false,
        title: 'learning mode',
        name: 'learningModal',
        content: {
            topButtons: [],
            bottomButtons: [
                {
                    active: true,
                    value: 'close',
                    type: 'neutral',
                    action: 'closeModal'
                }
            ]
        }
    },
    newCardModal: {
        name: 'newCardModal',
        open: false,
        title: 'new card',
        content: {
            topButtons: [],
            bottomButtons: [
                {
                    active: true,
                    value: 'close',
                    type: 'neutral',
                    action: 'closeModal'
                },
                {
                    active: true,
                    value: 'add',
                    type: 'primary'
                }
            ]
        }
    },
    updateCardModal: {
        name: 'updateCardModal',
        open: false,
        title: 'update card',
        content: {
            topButtons: [],
            bottomButtons: [
                {
                    active: true,
                    value: 'close',
                    type: 'neutral',
                    action: 'closeModal'
                },
                {
                    active: true,
                    value: 'delete',
                    type: 'danger'
                },
                {
                    active: true,
                    value: 'reset progress',
                    type: 'secondaryLight'
                },
                {
                    active: true,
                    value: 'save',
                    type: 'primary'
                },
            ]
        }
    },
    newListModal: {
        name: 'newListModal',
        open: false,
        title: 'new list',
        content: {
            topButtons: [],
            bottomButtons: [
                {
                    active: true,
                    value: 'close',
                    type: 'neutral',
                    action: 'closeModal'
                },
                {
                    active: true,
                    value: 'add',
                    type: 'primary',
                    action: 'addNewList'
                },
            ]
        }
    },
    updateListModal: {
        name: 'updateListModal',
        open: false,
        title: 'update list',
        content: {
            topButtons: [],
            bottomButtons: [
                {
                    active: true,
                    value: 'close',
                    type: 'neutral',
                    action: 'closeModal'
                },
                {
                    active: true,
                    value: 'save',
                    type: 'primary'
                },
            ]
        }
    },
    listDetailsModal: {
        name: 'listDetailsModal',
        open: false,
        title: 'list-details',
        content: {
            topButtons: [
                {
                    active: true,
                    value: 'description',
                    type: 'neutral'
                },
                {
                    active: true,
                    value: 'delete',
                    type: 'danger'
                },
                {
                    active: true,
                    value: 'edit',
                    type: 'secondary'
                },
            ],
            bottomButtons: [
                {
                    active: true,
                    value: 'close',
                    type: 'neutral',
                    action: 'closeModal'
                },
                {
                    active: true,
                    value: 'new card',
                    type: 'primaryLight',
                    action: 'showModal',
                    action: () => this.showModal('updateListModal'),
                },
                {
                    active: true,
                    value: 'learn',
                    type: 'primary',
                    action: ''
                },
            ]
        }
    }
}

export default modals