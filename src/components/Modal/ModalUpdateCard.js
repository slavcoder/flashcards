import React from 'react';
import AppContext from '../../context'

class ModalUpdateCard extends React.Component {

    render() {
        return (
            <>
                <AppContext.Consumer>
                    {context => (
                        <h1>ModalUpdateCard</h1>
                    )}
                </AppContext.Consumer>
            </>
        )
    }
}

export default ModalUpdateCard