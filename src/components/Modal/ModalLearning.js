import React from 'react';
import AppContext from '../../context'

class ModalLearning extends React.Component {

    render() {
        return (
            <>
                <AppContext.Consumer>
                    {context => (
                        <h1>ModalLearning</h1>
                    )}
                </AppContext.Consumer>
            </>
        )
    }
}

export default ModalLearning