import React from 'react';
import AppContext from '../../context'

class ModalListDetails extends React.Component {

    render() {
        return (
            <>
                <AppContext.Consumer>
                    {context => (
                        <h1>ModalListDetails</h1>
                    )}
                </AppContext.Consumer>
            </>
        )
    }
}

export default ModalListDetails