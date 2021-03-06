import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirestore } from 'react-redux-firebase';
import { reduxForm, Field } from 'redux-form'; 
import { composeValidators, combineValidators, isRequired, hasLengthGreaterThan } from 'revalidate'; 
import { Segment, Form, Button, Grid, Header } from 'semantic-ui-react';
import { createEvent, updateEvent, cancelToggle } from '../eventActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';

const mapStateToProps = (state) => {

    let event = {}

    if (state.firestore.ordered.events && state.firestore.ordered.events[0]) {
        event = state.firestore.ordered.events[0];
    }

    return {
        initialValues: event,
        event,
        loading: state.async.loading
    }
}

const actions = {
    createEvent,
    updateEvent,
    cancelToggle
}

const category = [
    {key: 'drinks', text: 'Drinks', value: 'drinks'},
    {key: 'culture', text: 'Culture', value: 'culture'},
    {key: 'film', text: 'Film', value: 'film'},
    {key: 'food', text: 'Food', value: 'food'},
    {key: 'music', text: 'Music', value: 'music'},
    {key: 'travel', text: 'Travel', value: 'travel'},
];

const validate = combineValidators({
    title: isRequired({message: 'The event title is required'}),
    category: isRequired({message: 'Please provide a category'}),
    description: composeValidators(
        isRequired({message: 'Please enter a description'}),
        hasLengthGreaterThan(4)({message: 'Description needs to be at least 5 characters'})
    )(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date')
});

class EventForm extends Component {

    async componentDidMount() {
        const {firestore, match} = this.props;
        await firestore.setListener(`events/${match.params.id}`);
    }

    async componentWillMount() {
        const {firestore, match} = this.props;
        await firestore.unsetListener(`events/${match.params.id}`);
    }
   
    onFormSubmit = async values => {
        if(this.props.initialValues.id) {
            await this.props.updateEvent(values);
            this.props.history.goBack();
        } else {
            this.props.createEvent(values);
            this.props.history.push('/events');
        }
    }

    render() {
        const { loading, invalid, submitting, pristine, event, cancelToggle } = this.props;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <Segment>
                        <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)} autoComplete="off">
                        <Header sub color='teal' content='Event Details' />
                            <Field name='title' type='text' component={TextInput} placeholder='Give your event a name'/>
                            <Field name='category' type='text' component={SelectInput} options={category} placeholder='What is your event about'/>
                            <Field name='description' type='text'rows={3} component={TextArea} placeholder='Tell us about your event'/>
                            <Header sub color='teal' content='Event Location Details' />
                            <Field name='city' type='text' component={TextInput} placeholder='Event City'/>
                            <Field name='venue' type='text' component={TextInput} placeholder='Event Venue'/>
                            <Field 
                                name='date' 
                                type='date' 
                                component={DateInput} 
                                dateFormat='YYYY-MM-DD HH:mm' 
                                timeFormat='HH:mm'
                                showTimeSelect
                                placeholder='Date and Time of event'/>
                            <Button loading={loading} disabled={invalid || submitting || pristine} positive type="submit">
                                Submit
                            </Button>
                            <Button disabled={loading} onClick={this.props.history.goBack} type="button">Cancel</Button>
                            { event.id &&
                                <Button 
                                    onClick={() => cancelToggle(!event.cancelled, event.id)}
                                    type='button' 
                                    color={event.cancelled ? 'green': 'red'}
                                    floated='right'
                                    content={event.cancelled ? 'Reactivate Event' : 'Cancel Event'}
                            /> } 
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
            
        )
    }
}

export default withFirestore(
    connect(mapStateToProps, actions )(
        reduxForm({form: 'eventForm', enableReinitialize: true, validate })(EventForm))
);
