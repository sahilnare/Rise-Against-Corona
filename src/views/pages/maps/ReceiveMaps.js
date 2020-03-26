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

  sendRequest = (directions) => {
    //send request
    this.props.firebase.addRequestData(this.props.userId, this.props.userName, this.props.reqData.number, this.props.reqData.food, this.props.reqData.medicine, this.props.reqData.condition, directions)
      .then(data => {
        this.props.firebase.sendRequest(this.props.userId)
        this.props.parentSendRequest()
      })
    // this.props.firebase.addMapPoint(this.props.userId, directions).then(data => {
    //   this.props.firebase.addRequestData(this.props.userId, this.props.userName, this.props.reqData.food, this.props.reqData.medicine, this.props.reqData.condition, directions)
    //   this.props.firebase.sendRequest(this.props.userId)
    //   this.props.parentSendRequest()
    // })
  }

  render() {

    if(this.props.isLoggedIn) {
      if(this.props.isRecorded) {
        if(this.props.requestSent) {
          return (
            <div>
              <Row>
                <Col md={{ size: 8, offset: 2 }}>
                  <h3>Thank you!</h3>
                  <h3>We have received your request!</h3>
                  <h4 className="text-muted">
                    We will notify you when someone wants to donate! Keep checking the activity section.
                  </h4>
                </Col>
              </Row>
            </div>
          );
        }
        else {
          return (
            <div>
              <Row>
                <Col md={{ size: 8, offset: 2 }} style={{marginBottom: "20px"}}>
                  <h3>Food required: {this.props.reqData.food}</h3>
                  <h3>Medicine required: {this.props.reqData.medicine}</h3>
                  <h3>Phone number: {this.props.reqData.number}</h3>
                </Col>
              </Row>
              <Maps isLoggedIn={this.props.isLoggedIn} firebase={this.props.firebase} userId={this.props.userId} userName={this.props.userName} currentAction="receive" sendRequest={this.sendRequest} />
            </div>
          );
        }
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



export default withFirebaseHOC(ReceiveMaps);
