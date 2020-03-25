/* global google */
import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { Redirect } from "react-router-dom";
import { withFirebaseHOC } from '../../../firebase'
import Maps from './Maps';
// import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from "react-google-maps";

class ReceiveMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {

    if(this.props.isLoggedIn) {
      if(this.props.isRecorded) {
        return (
          <div>
            <Row>
              <Col md={{ size: 8, offset: 2 }}>
                <h3>Food required: {this.props.reqData.food}</h3>
                <h3>Medicine required: {this.props.reqData.medicine}</h3>
              </Col>
            </Row>
            <Maps isLoggedIn={this.props.isLoggedIn} />
          </div>
        );
      }
      else {
        return <Redirect to="/require" />
      }
    }
    else {
      return <Redirect to="/login" />
    }
  }
}



export default ReceiveMaps;
