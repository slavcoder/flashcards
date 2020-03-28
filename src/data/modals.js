const modals = {
    learningModal: {
        open: false,
        title: 'learning mode',
        name: 'learningModal',
        list: 'all',
        content: {
            topButtons: [],
            bottomButtons: [
                {
                    active: true,
                    value: 'close',
                    type: 'neutral',
                    action: () => this.closeModal(this.state.learningModal.name)
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
                    action: () => this.closeModal(this.state.newCardModal.name)
                },
                {
                    active: true,
                    value: 'add',
                    type: 'primary',
                    action: () => {console.log('todo action')}
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
                    action: () => this.closeModal(this.state.updateCardModal.name)
                },
                {
                    active: true,
                    value: 'delete',
                    type: 'danger',
                    action: () => {console.log('todo action')}
                },
                {
                    active: true,
                    value: 'reset progress',
                    type: 'secondaryLight',
                    action: () => {console.log('todo action')}
                },
                {
                    active: true,
                    value: 'save',
                    type: 'primary',
                    action: () => {console.log('todo action')}
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
                    action: () => this.closeModal(this.state.newListModal.name)
                },
                {
                    active: true,
                    value: 'add',
                    type: 'primary',
                    action: () => {console.log('todo action')}
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
                    action: () => this.closeModal(this.state.updateListModal.name)
                },
                {
                    active: true,
                    value: 'save',
                    type: 'primary',
                    action: () => {console.log('todo action')}
                },
            ]
        }
    },
    listDetailsModal: {
        name: 'listDetailsModal',
        open: false,
        title: 'list details',
        content: {
            topButtons: [
                {
                    active: true,
                    value: 'description',
                    type: 'neutral',
                    action: () => {console.log('todo action')}
                },
                {
                    active: true,
                    value: 'delete',
                    type: 'danger',
                    action: () => {console.log('todo action')}
                },
                {
                    active: true,
                    value: 'edit',
                    type: 'secondary',
                    action: () => {console.log('todo action')}
                },
            ],
            bottomButtons: [
                {
                    active: true,
                    value: 'close',
                    type: 'neutral',
                    action: () =>  this.closeModal(this.state.listDetailsModal.name)
                },
                {
                    active: true,
                    value: 'new card',
                    type: 'primaryLight',
                    action: () => this.showModal(this.state.updateListModal.name),
                },
                {
                    active: true,
                    value: 'learn',
                    type: 'primary',
                    action: () => {console.log('todo action')}
                },
            ]
        }
    }
}

export default modals