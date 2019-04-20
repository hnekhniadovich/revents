import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'; 
import { incrementAsync, decrementAsync, testPermissions } from './testActions';
import { openModal } from '../modals/modalActions';

const mapStateToProps = (state) => ({
    data: state.test.data,
    loading: state.test.loading
});

const actions = {
    incrementAsync,
    decrementAsync,
    openModal,
    testPermissions
}

class TestComponent extends Component {
    render() {
        const {testPermissions, incrementAsync, decrementAsync, data, openModal, loading} = this.props;

        return (
        <div>
            <h1>Test Area</h1>
            <h3>The answer is: {data}</h3>
            <Button loading={loading} onClick={incrementAsync} color="green" content="Increment" />
            <Button loading={loading} onClick={decrementAsync} color="red" content="Decrement" />
            <Button onClick={() => openModal('TestModal', {data: 43})} color="teal" content="Open Modal" />
            <Button onClick={testPermissions} color="teal" content="Test Permissions" />
        </div>
        )
    }
}

export default connect(mapStateToProps, actions )(TestComponent);
