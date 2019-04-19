import React, { Component } from 'react';
import { Header, Segment, Feed, Sticky } from 'semantic-ui-react';
import EventActivityItem from './EventActivityItem';


class EventActivity extends Component {
    render() {
    const {activities, contextRef} = this.props;
        return (
            <Sticky context={contextRef} offset={100}>
                <Header attached='top' content='Recent Activity'/>
                <Segment attached>
                    <Feed>
                    {activities && activities.map((activity) => (
                        <EventActivityItem key={activity.id} activity={activity}/>
                    ))}
                    </Feed>
                </Segment>
            </Sticky>
        )
    }
}

export default EventActivity;