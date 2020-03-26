import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Alert, FormFeedback } from 'reactstrap';
import { Redirect, Link } from "react-router-dom";
// import { withFirebaseHOC } from '../../firebase'
var QRCode = require('qrcode.react');

class Generate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      isScan: true,
      qrName: "",
      success: {

      },
      nameValid: false,
    };
  }

  componentWillUnmount() {
    // this.setState({result: false})
  }

  onChange = (e) => {
      const { name, value } = e.target

      switch(name) {
          case "qrName":
            {
              if(value.length > 0) {
                this.setState(prevState => {
                  let success = { ...prevState.success };
                  success[name] = "c";
                  return { success };
                })
              }
              else {
                this.setState(prevState => {
                  let success = { ...prevState.success };
                  success[name] = "w";
                  return { success };
                })
              }
              break
            }
          default:
            break
      }

      this.setState({
          [name]: value
      });
  }


  nextStep = (e) => {
    e.preventDefault()
    if(this.state.currentStep === 1) {
      if(this.state.success.qrName === "c") {
        this.setState({nameValid: true, nameSub: true})
        let currentStep = this.state.currentStep
        currentStep = currentStep >= 2? 3: currentStep + 1
        this.setState({
          currentStep: currentStep
        })
      }
      else {
        this.setState({nameValid: false, nameSub: true})
      }
    }
    else {
      let currentStep = this.state.currentStep
      currentStep = currentStep >= 1? 2: currentStep + 1
      this.setState({
        currentStep: currentStep
      })
    }
  }

  prevStep = (e) => {
    e.preventDefault()
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

  previousButton() {
    let currentStep = this.state.currentStep;
    if(currentStep !==1){
      return (
        <Button
          color="success"
          onClick={this.prevStep}
          className="float-left"
          size="lg"
        >
        Previous
        </Button>
      )
    }
    return null;
  }

  nextButton(){
    let currentStep = this.state.currentStep;
    if(currentStep <2){
      return (
        <Button
          color="success"
          onClick={this.nextStep}
          className="float-right"
          size="lg"
        >
        Next
        </Button>
      )
    }
    return null;
  }


  render() {
    const heroStyles = {
      padding: '50px 0 50px'
    };

    if(this.props.isLoggedIn) {
      return (
        <div style={{padding: "30px"}}>
          <EnterName
            onChange={this.onChange}
            state={this.state}
            heroStyles={heroStyles}
          />
          <FinalCheck
            state={this.state}
          />
          <Row>
            <Col md={{ size: 8, offset: 2 }}>
            {this.previousButton()}
            {this.nextButton()}
            </Col>
          </Row>
        </div>
      );
    }
    else {
      return <Redirect to="/login" />
    }
  }
}

function EnterName(props) {
  if (props.state.currentStep !== 1) {
    return null
  }
  return(
    <React.Fragment>
        <Row>
          <Col md={6}>
            <div className="home-hero">
              <h1>Enter your name to generate the QR Code</h1>
              <p className="text-muted">
                Your friend can then scan it and we'll record the handshake!
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <FormGroup>
                <Label for="qrName">Name</Label>
                <Input valid={props.state.success.qrName === "c"} invalid={props.state.success.qrName === "w"} type="text" name="qrName" id="qrName" placeholder="Name" onChange={props.onChange} value={props.state.qrName} autoComplete="off"/>
                <FormFeedback valid>Name is valid</FormFeedback>
                <FormFeedback invalid>Name is invalid</FormFeedback>
              </FormGroup>
              {/*<Button color="success" onClick={props.idSubmit}><i className="fa fa-check"></i>Submit</Button>*/}
              {props.state.nameSub ? props.state.nameValid ? null : <Alert style={{"marginTop": "15px"}} color="danger">
                Name is invalid!
              </Alert> : null}
            </Form>
          </Col>
        </Row>
    </React.Fragment>
  );
}

function FinalCheck(props) {
  if (props.state.currentStep !== 2) {
    return null
  }
  return(
    <React.Fragment>
        <Row>
          <Col>
            <div className="home-hero">
              <h1>Check the information that you've typed</h1>
              <p className="text-muted">
                You can modify it by pressing on 'previous'
              </p>
            </div>
          </Col>
        </Row>
        <Row>
            <Col md={6}>
              <QRCode style={{margin: "20px auto"}} value={props.state.qrName} />,
            </Col>
        </Row>
    </React.Fragment>
  );
}

export default Generate;
