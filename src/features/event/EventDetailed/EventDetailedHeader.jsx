import React, { Component } from 'react';
import { Segment, Image, Item, Button, Header } from 'semantic-ui-react';

class EventDetailedHeader extends Component {
    render() {
        return (
           <Segment.Group>
              <Segment basic attached="top" style={{ padding: '0' }}>
                <Image src="/assets/categoryImages/drinks.jpg" fluid />
        
                <Segment basic>
                  <Item.Group>
                    <Item>
                      <Item.Content>
                        <Header
                          size="huge"
                          content="Event Title"
                          style={{ color: 'white' }}
                        />
                        <p>Event Date</p>
                        <p>
                          Hosted by <strong>Hosted by</strong>
                        </p>
                      </Item.Content>
                    </Item>
                  </Item.Group>
                </Segment>
              </Segment>
        
              <Segment attached="bottom">
                <Button>Cancel My Place</Button>
                <Button color="teal">JOIN THIS EVENT</Button>
        
                <Button color="orange" floated="right">
                  Manage Event
                </Button>
              </Segment>
            </Segment.Group>
        )
    }
}

export default EventDetailedHeader;
