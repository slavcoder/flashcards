import React from 'react';
import AppContext from '../../context'

class ModalUpdateList extends React.Component {

    render() {
        return (
            <>
                <AppContext.Consumer>
                    {context => (
                        <h1>ModalUpdateList</h1>
                    )}
                </AppContext.Consumer>
            </>
        )
    }
}

export default ModalUpdateList