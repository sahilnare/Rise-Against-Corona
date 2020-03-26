/* global google */
import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { Redirect } from "react-router-dom";
// import { withFirebaseHOC } from '../../../firebase'
import { Button } from 'reactstrap';
// import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";
import MapContainer from './MapContainer'
const url = "https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyCUSWjSKUXyiqrNOFPoZg-HKUH3AyMZrXs&callback=initMap"

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: [
        {
          lat: 19.07283,
          lon: 72.88261,
          isOpen: false
        }
      ]
    };
  }

  onToggleOpen = (i) => {
    if(this.props.currentAction === "donate") {
      console.log("open close");
      this.setState(prevState => {
        let directions = { ...prevState.directions };
        let item = {...directions[i]}
        item.isOpen = !item.isOpen
        directions[i] = item
        return { directions };
      })
    }
  }

  componentDidMount() {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser')
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        this.setState(prevState => {
          let directions = { ...prevState.directions };
          directions[0].lat = position.coords.latitude
          directions[0].lon = position.coords.longitude
          directions[0].isOpen = false
          return { directions };
        }, this.getRequests())

      }, () => {
        console.log('Unable to get location');
        this.getRequests()
      });
    }
    // console.log(this.props.mapPoints);
  }

  getRequests = () => {
    if(this.props.currentAction === "donate") {
      this.props.mapPoints.forEach((item) => {
        // console.log(item.directions)
        this.setState(state => ({
          directions: [...state.directions, {lat: item.directions.F, lon: item.directions.V, food: item.food, medicine: item.medicine, condition: item.condition, name: item.name, userId: item.userId, isOpen: false}]
        }))
      });
    }
    else {
      console.log("Nothing");
    }
  }

  // componentDidUpdate() {
  //   console.log(this.state.directions);
  // }

  render() {

    if(this.props.isLoggedIn) {
      return (
        <React.Fragment>
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              {
                this.props.currentAction === "donate" ? <MapContainer
                  directions={this.state.directions}
                  onToggleOpen={this.onToggleOpen}
                  currentAction={this.props.currentAction}
                  googleMapURL={url}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `600px`, width: `100%` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                  firebase={this.props.firebase}
                  userId={this.props.userId}
                  userName={this.props.userName}
                /> : <MapContainer
                  directions={this.state.directions}
                  currentAction={this.props.currentAction}
                  googleMapURL={url}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `600px`, width: `100%` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
              }

            </Col>
          </Row>
          {
            this.props.currentAction === "receive" ? (
              <Row style={{marginTop: "30px"}}>
                <Col md={{ size: 8, offset: 2 }}>
                  <Button
                    color="success"
                    onClick={() => this.props.sendRequest(this.state.directions[0])}
                    className="center"
                    size="lg"
                  >
                  Confirm
                  </Button>
                </Col>
              </Row>
            ) : null
          }
        </React.Fragment>
      );
    }
    else {
      return <Redirect to="/login" />
    }
  }
}



export default Map;
