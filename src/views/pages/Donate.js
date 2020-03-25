/* global google */
import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { Redirect } from "react-router-dom";
import { withFirebaseHOC } from '../../firebase'
import Maps from './maps/Maps';
// import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";

class Donate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapPoints: [],
      ready: false
    };
  }

  componentDidMount() {
    this.props.firebase.getMapPoints().then(snap => {
      snap.docs.forEach((point, i) => {
        this.setState(state => ({
          mapPoints: [...state.mapPoints, {
            name: point.data().name,
            directions: point.data().directions,
            food: point.data().food,
            medicine: point.data().medicine,
            condition: point.data().condition,
          }]
        }))
      })
    }).then(this.getReady())
  }

  getReady = () => {
    console.log("getting ready");
    this.setState({ready: true})
  }

  render() {

    if(this.props.isLoggedIn) {
      return (
        <div>
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
              <div className="home-hero" style={{marginBottom: "30px"}}>
                <h1>The following people require supplies!</h1>
                <h4 className="text-muted">
                  Click on the markers to see what they need
                </h4>
              </div>
            </Col>
          </Row>
          {
            this.state.ready ? (
              <Maps isLoggedIn={this.props.isLoggedIn} currentAction="donate" mapPoints={this.state.mapPoints} />
            ) : null
          }
        </div>
      );
    }
    else {
      return <Redirect to="/login" />
    }
  }
}



export default withFirebaseHOC(Donate);
