import React from 'react';
import AppContext from '../../context'

class ModalNewList extends React.Component {

    render() {
        return (
            <>
                <AppContext.Consumer>
                    {context => (
                        <h1>ModalNewList</h1>
                    )}
                </AppContext.Consumer>
            </>
        )
    }
}

export default ModalNewList