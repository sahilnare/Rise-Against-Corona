/* global google */
import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { Redirect } from "react-router-dom";
import { withFirebaseHOC } from '../../../firebase'
// import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";
import MapContainer from './MapContainer'
const url = "https://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyCUSWjSKUXyiqrNOFPoZg-HKUH3AyMZrXs&callback=initMap"

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      directions: {
        latlong: {
          lat: 19.07283,
          lon: 72.88261
        }
      }
    };
  }

  componentDidMount() {
    if (!navigator.geolocation) {
      console.log('Geolocation is not supported by your browser')
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        this.setState(prevState => {
          let directions = { ...prevState.directions };
          directions.latlong.lat = position.coords.latitude
          directions.latlong.lon = position.coords.longitude
          return { directions };
        })
      }, () => {
        console.log('Unable to get location');
      });
    }

  }

  render() {

    if(this.props.isLoggedIn) {
      return (
        <React.Fragment>
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <MapContainer
                directions={this.state.directions}
                googleMapURL={url}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `600px`, width: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </Col>
          </Row>
        </React.Fragment>
      );
    }
    else {
      return <Redirect to="/login" />
    }
  }
}



export default Map;
