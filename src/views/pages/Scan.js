import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Alert, FormFeedback } from 'reactstrap';
import { Redirect, Link } from "react-router-dom";
import { withFirebaseHOC } from '../../firebase'
import QrReader from 'react-qr-reader'

class Scan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      isScan: true,
      bikeId: "",
      distance: "",
      time: "",
      submitted: false,
      success: {

      },
      idValid: false,
      timeValid: false,
      disValid: false,
    };
  }

  componentWillUnmount() {
    // this.setState({result: false})
  }

  onChange = (e) => {
      const { name, value } = e.target

      switch(name) {
          case "bikeId":
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
          case "time":
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

          case "distance":
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
            }

          default:
            break
      }

      this.setState({
          [name]: value
      });
  }

  // onSubmit = (e) => {
  //   e.preventDefault()
  //   const data = {
  //     bikeId: this.state.bikeId,
  //     time: this.state.time,
  //     distance: this.state.distance
  //   }
  //   console.log(data)
  //   return (<Redirect to={{pathname: "/maps", state: {data: data}}} />)
  // }

  scanSwitch = () => this.setState(prev => {return {isScan: !prev.isScan}})

  handleScan = data => {
    if (data) {
      console.log(data)
      this.setState(prevState => {
        let success = { ...prevState.success };
        success["bikeId"] = "c";
        return { success, isScan: false, bikeId: data };
      })
      // this.setState({
      //   isScan: false,
      //   bikeId: data
      // })
    }
  }

  handleError = err => {
    console.error(err)
  }

  nextStep = (e) => {
    e.preventDefault()
    if(this.state.currentStep === 1) {
      if(this.state.success.bikeId === "c") {
        this.setState({idValid: true, idSub: true})
        let currentStep = this.state.currentStep
        currentStep = currentStep >= 2? 3: currentStep + 1
        this.setState({
          currentStep: currentStep
        })
      }
      else {
        this.setState({idValid: false, idSub: true})
      }
    }
    else if(this.state.currentStep === 2) {
      if(this.state.success.time === "c" && this.state.success.distance === "c") {
        this.setState({timeValid: true, timeSub: true, disValid: true, disSub: true})
        let currentStep = this.state.currentStep
        currentStep = currentStep >= 2? 3: currentStep + 1
        this.setState({
          currentStep: currentStep
        })
        this.props.handleScan({
          bikeId: this.state.bikeId,
          time: this.state.time,
          distance: this.state.distance
        })
      }
      else {
        this.setState({timeValid: false, timeSub: true, disValid: false, disSub: true})
      }
    }
    else {
      let currentStep = this.state.currentStep
      currentStep = currentStep >= 2? 3: currentStep + 1
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
    if(currentStep <3){
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

  submitButton() {
    let currentStep = this.state.currentStep;
    if(currentStep === 3) {
        return (
          <Row>
            <Col md={{size: 4, offset: 4}} style={{marginTop: "20px"}}>
            <Button
              color="primary"
              onClick={this.onSubmit()}
              className="center"
              size="lg"
            >
            Submit
            </Button>
            </Col>
          </Row>
        )
    }
  }

  onSubmit = () => {
    this.props.handshake(this.state.bikeId, this.state.time, this.state.distance)
    // this.setState({submitted: true})
  }

  render() {
    const heroStyles = {
      padding: '50px 0 50px'
    };

    if(this.props.isLoggedIn) {
      return (
        <div style={{padding: "30px"}}>
          <BikeId
            onChange={this.onChange}
            handleScan={this.handleScan}
            handleError={this.handleError}
            scanSwitch={this.scanSwitch}
            state={this.state}
            heroStyles={heroStyles}
          />
          <LengthAndDuration
            onChange={this.onChange}
            state={this.state}
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
          {this.submitButton()}
        </div>
      );
    }
    else {
      return <Redirect to="/login" />
    }
  }
}

function BikeId(props) {
  if (props.state.currentStep !== 1) {
    return null
  }
  return(
    <React.Fragment>
        <Row>
          <Col md={6}>
            <div className="home-hero">
              <h1>Scan the QR code from the person's mobile</h1>
              <p className="text-muted">
                Use the camera of the phone to scan the QR Code.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <div style={props.heroStyles}>
              <Button color="primary" onClick={props.scanSwitch}>Scan</Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            {props.state.isScan ? (<QrReader
              delay={300}
              onError={props.handleError}
              onScan={props.handleScan}
              style={{ width: '100%', marginBottom: "30px" }}
            />) : null}
            <Form>
              <FormGroup>
                <Label for="bikeId">Name</Label>
                <Input valid={props.state.success.bikeId === "c"} invalid={props.state.success.bikeId === "w"} type="text" name="bikeId" id="bikeId" placeholder="Name" onChange={props.onChange} value={props.state.bikeId} autoComplete="off"/>
                <FormFeedback valid>Id is valid</FormFeedback>
                <FormFeedback invalid>Id is invalid</FormFeedback>
              </FormGroup>
              {/*<Button color="success" onClick={props.idSubmit}><i className="fa fa-check"></i>Submit</Button>*/}
              {props.state.idSub ? props.state.idValid ? null : <Alert style={{"marginTop": "15px"}} color="danger">
                Name is invalid!
              </Alert> : null}
            </Form>
          </Col>
        </Row>
    </React.Fragment>
  );
}

function LengthAndDuration(props) {
  if (props.state.currentStep !== 2) {
    return null
  }
  return(
    <React.Fragment>
        <Row>
          <Col md={6}>
            <div className="home-hero">
              <h1>Enter the time and the place at which you met the person</h1>
              <p className="text-muted">
                The time and place can be approximate.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <Form>
              <FormGroup>
                <Label for="distance"></Label>
                <Input valid={props.state.success.distance === "c"} invalid={props.state.success.distance === "w"} type="text" name="distance" id="distance" placeholder="Place" onChange={props.onChange} value={props.state.distance} autoComplete="off"/>
                <FormFeedback invalid>Place cannot be empty</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="time"></Label>
                <Input valid={props.state.success.time === "c"} invalid={props.state.success.time === "w"} type="text" name="time" id="time" placeholder="Time" onChange={props.onChange} value={props.state.time} autoComplete="off"/>
                <FormFeedback invalid>Time cannot be empty</FormFeedback>
              </FormGroup>
              {props.state.timeSub ? props.state.timeValid ? null : <Alert style={{"marginTop": "15px"}} color="danger">
                Time cannot be empty
              </Alert> : null}
              {props.state.disSub ? props.state.disValid ? null : <Alert style={{"marginTop": "15px"}} color="danger">
                Place cannot be empty
              </Alert> : null}
            </Form>
          </Col>
        </Row>
    </React.Fragment>
  );
}

function FinalCheck(props) {
  if (props.state.currentStep !== 3) {
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
              <Card className="text-center">
                <CardHeader tag="h3"><h2>Time</h2></CardHeader>
                <CardBody>
                  <h1>{props.state.time}</h1>
                </CardBody>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="text-center">
                <CardHeader tag="h3"><h2>Place</h2></CardHeader>
                <CardBody>
                  <h1>{props.state.distance}</h1>
                </CardBody>
              </Card>
            </Col>
        </Row>
        <Row>
            <Col md={{size: 6, offset: 3}}>
              <Card className="text-center">
                <CardHeader tag="h3"><h2>Name</h2></CardHeader>
                <CardBody>
                  <h1>{props.state.bikeId}</h1>
                </CardBody>
              </Card>
            </Col>
        </Row>
    </React.Fragment>
  );
}

export default withFirebaseHOC(Scan);
