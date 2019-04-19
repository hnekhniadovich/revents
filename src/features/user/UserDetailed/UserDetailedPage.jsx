import React, {Component} from 'react';
import { connect } from 'react-redux';
import { firestoreConnect, isEmpty } from 'react-redux-firebase';
import { compose } from 'redux';
import {Button, Card, Grid, Header, Icon, Image, Item, List, Segment, Tab} from "semantic-ui-react";
import { Link } from 'react-router-dom';
import { differenceInYears } from 'date-fns';
import format from 'date-fns/format';
import { userDetailedQuery } from '../userQueries';
import LazyLoad from 'react-lazyload';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { getUserEvents } from '../userActions';

const mapStateToProps = (state, ownProps) => {
    let userUid = null;
    let profile = {};
  
    if (ownProps.match.params.id === state.auth.uid) {
        profile = state.firebase.profile
    } else {
        profile = !isEmpty(state.firestore.ordered.profile) && state.firestore.ordered.profile[0];
        userUid = ownProps.match.params.id;
    }
    return {
        profile,
        userUid,
        events: state.events,
        eventsLoading: state.async.loading,
        auth: state.firebase.auth,
        photos: state.firestore.ordered.photos,
        requesting: state.firestore.status.requesting
    }
}
  
const actions = {
    getUserEvents
}

const panes = [
    {menuItem: 'All Events', pane: {key: 'allEvents'}},
    {menuItem: 'Past Events', pane: {key: 'pastEvents'}},
    {menuItem: 'Future Events', pane: {key: 'futureEvents'}},
    {menuItem: 'Hosting', pane: {key: 'hosted'}},
]

class UserDetailedPage extends Component {

    async componentDidMount() {
        await this.props.getUserEvents(this.props.userUid, 2);
    }

    changeTab = (e, data) => {
        this.props.getUserEvents(this.props.userUid, data.activeIndex)
    }

    render() {
        const { profile, photos, auth, match, requesting, events, eventsLoading } = this.props;
        const isCurrentUser = auth.uid === match.params.id;
        const loading = Object.values(requesting).some(a => a === true);

        if (loading) return <LoadingComponent inverted={true}/>
        
        let age;
        if(profile.dateOfBirth) {
            age = differenceInYears(Date.now(), profile.dateOfBirth.toDate())
        } else {
            age = 'unknown age'
        }
        
        let createdAt;
        if (profile.createdAt) {
            createdAt = format(profile.createdAt.toDate(), 'D MMM YYYY')
        }

        return (
            <Grid>
                <Grid.Column width={16}>
                    <Segment>
                        <Item.Group>
                            <Item>
                                <Item.Image avatar size='small' src={profile.photoURL || '/assets/user.png'}/>
                                <Item.Content verticalAlign='bottom'>
                                    <Header as='h1'>{profile.displayName}</Header>
                                    <br/>
                                    <Header as='h3'>{profile.occupation}</Header>
                                    <br/>
                                    <Header as='h3'>{age}, Lives in {profile.city || 'unknown city'}</Header>
                                </Item.Content>
                            </Item>
                        </Item.Group>

                    </Segment>
                </Grid.Column>
                <Grid.Column width={12}>
                    <Segment>
                        <Grid columns={2}>
                            <Grid.Column width={10}>
                                <Header icon='smile' content='About Display Name'/>
                                <p>I am a: <strong>{profile.occupation}</strong></p>
                                <p>Originally from <strong>{profile.origin}</strong></p>
                                <p>Member Since: <strong>{createdAt}</strong></p>
                                <p>{profile.description}</p>

                            </Grid.Column>
                            <Grid.Column width={6}>

                                <Header icon='heart outline' content='Interests'/>
                                <List>
                                    {profile.interests && (
                                        profile.interests.map((interest, index) => (
                                            <Item key={index}>
                                                <Icon name='heart'/>
                                                <Item.Content>{interest}</Item.Content>
                                            </Item>
                                        ))
                                    )}
                                </List>
                            </Grid.Column>
                        </Grid>

                    </Segment>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Segment>
                        {isCurrentUser ? (
                            <Button as={Link} to='/settings' color='teal' fluid basic content='Edit Profile'/>
                        ) : (
                            <Button color='teal' fluid basic content='Follow User'/>
                        )}
                    </Segment>
                </Grid.Column>
                {photos && photos.length > 0 && (
                    <Grid.Column width={12}>
                        <Segment attached>
                        
                            <Header icon='image' content='Photos'/>
                            
                            <Image.Group size='small'>
                                {photos && photos.map(photo => 
                                <LazyLoad key={photo.id} height={150} placeholder={<Image src='/assets/user.png'/>}>
                                    <Image src={photo.url}/>
                                </LazyLoad> )}
                            </Image.Group>
                        </Segment>
                    </Grid.Column>
                )}
                <Grid.Column width={12}>
                    <Segment attached loading={eventsLoading}>
                        <Header icon='calendar' content='Events'/>
                        <Tab onTabChange={(e, data) => this.changeTab(e, data)} panes={panes} menu={{secondary: true, pointing: true}}/>
                        <br />
                        <Card.Group itemsPerRow={5}>

                        {events && events.map(event => (
                            <Card as={Link} to={`/event/${event.id}`} key={event.id}>
                                <Image src={`/assets/categoryImages/${event.category}.jpg`}/>
                                <Card.Content>
                                    <Card.Header textAlign='center'>
                                        {event.title}
                                    </Card.Header>
                                    <Card.Meta textAlign='center'>
                                        <div>{format(event.date && event.date.toDate(), 'DD MMM YYYY')}</div>
                                        <div>{format(event.date && event.date.toDate(), 'h:mm A')}</div>
                                    </Card.Meta>
                                </Card.Content>
                            </Card>
                        ))}
                        </Card.Group>
                    </Segment>
                </Grid.Column>
            </Grid>

        );
    }
}


export default compose(
    connect(mapStateToProps, actions),
    firestoreConnect((auth, userUid) => userDetailedQuery(auth, userUid))
)(UserDetailedPage);