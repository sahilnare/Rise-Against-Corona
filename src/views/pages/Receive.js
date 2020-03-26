import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row, Card, CardBody, CardFooter, CardHeader, CardText, CardTitle, Alert, FormFeedback } from 'reactstrap';
import { Redirect, Link } from "react-router-dom";
import { withFirebaseHOC } from '../../firebase'

class Scan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      isRecorded: true,
      condition: "",
      food: "",
      medicine: "",
      number: "",
      success: {

      },
      conValid: false,
      foodValid: false,
      medValid: false,
      numValid: false
    };
  }


  componentWillUnmount() {
    // this.setState({result: false})
  }

  onChange = (e) => {
      const { name, value } = e.target

      switch(name) {
          case "condition":
            {
              if(value) {
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
          case "food":
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

          case "medicine":
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

          case "number":
            {
              if(value.match(/^[0-9]{10}$/)) {
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

  nextStep = (e) => {
    e.preventDefault()
    if(this.state.currentStep === 1) {
      if(this.state.success.condition === "c") {
        this.setState({conValid: true, conSub: true})
        let currentStep = this.state.currentStep
        currentStep = currentStep >= 2? 3: currentStep + 1
        this.setState({
          currentStep: currentStep
        })
      }
      else {
        this.setState({conValid: false, conSub: true})
      }
    }
    else if(this.state.currentStep === 2) {
      if((this.state.success.food === "c" && this.state.success.medicine === "c") && this.state.success.number === "c") {
        this.setState({foodValid: true, foodSub: true, medValid: true, medSub: true, numValid: true, numSub: true})
        let currentStep = this.state.currentStep
        currentStep = currentStep >= 2? 3: currentStep + 1
        this.setState({
          currentStep: currentStep
        })
        this.props.handleRecord({
          condition: this.state.condition,
          food: this.state.food,
          medicine: this.state.medicine,
          number: this.state.number
        })
      }
      else {
        this.setState({foodValid: false, foodSub: true, medValid: false, medSub: true, numValid: false, numSub: true})
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
          <Link to="/receivemaps" style={{margin: "60px auto 20px"}}>
          Submit
          </Link>
        </Row>
      )
    }
  }

  render() {
    const heroStyles = {
      padding: '50px 0 50px'
    };

    if(this.props.isLoggedIn) {
      if(this.props.requestSent) {
        return <Redirect to="/receivemaps" />
      }
      else {
        return (
          <div style={{padding: "30px"}}>
            <Condition
              onChange={this.onChange}
              state={this.state}
              heroStyles={heroStyles}
            />
            <FoodAndMedicine
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
    }
    else {
      return <Redirect to="/login" />
    }
  }
}

function Condition(props) {
  if (props.state.currentStep !== 1) {
    return null
  }
  return(
    <React.Fragment>
        <Row>
          <Col md={6}>
            <div className="home-hero">
              <h1>Please state the extent of requirement</h1>
              <p className="text-muted">
                It is necessary so that others can deliver things on time
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <Card>
              <CardBody>
                <Form>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" checked={props.state.condition === "imp"} name="condition" id="imp" onChange={props.onChange} value="imp" valid={props.state.success.condition === "c"} invalid={props.state.success.condition === "w"} />{' '}
                      <h3>Important</h3>
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" checked={props.state.condition === "vimp"} name="condition" id="vimp" onChange={props.onChange} value="vimp" valid={props.state.success.condition === "c"} invalid={props.state.success.condition === "w"} />{' '}
                      <h3>Very Important</h3>
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Label check>
                      <Input type="radio" checked={props.state.condition === "emrg"} name="condition" id="emrg" onChange={props.onChange} value="emrg" valid={props.state.success.condition === "c"} invalid={props.state.success.condition === "w"} />{' '}
                      <h3>Emergency</h3>
                    </Label>
                  </FormGroup>
                  {/*<Button color="success" onClick={props.idSubmit}><i className="fa fa-check"></i>Submit</Button>*/}
                  {props.state.conSub ? props.state.conValid ? null : <Alert style={{"marginTop": "15px"}} color="danger">
                    Select one option!
                  </Alert> : null}
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
    </React.Fragment>
  );
}

function FoodAndMedicine(props) {
  if (props.state.currentStep !== 2) {
    return null
  }
  return(
    <React.Fragment>
        <Row>
          <Col md={6}>
            <div className="home-hero">
              <h1>Enter the food and the medicine that you need</h1>
              <p className="text-muted">
                Please write with details
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={{ size: 8, offset: 2 }}>
            <Form>
            <FormGroup>
              <Label for="number"></Label>
              <Input valid={props.state.success.number === "c"} invalid={props.state.success.number === "w"} type="textarea" name="number" id="number" placeholder="Your phone number" onChange={props.onChange} value={props.state.number} autoComplete="off"/>
              <FormFeedback invalid>Enter your number</FormFeedback>
            </FormGroup>
              <FormGroup>
                <Label for="food"></Label>
                <Input valid={props.state.success.food === "c"} invalid={props.state.success.food === "w"} type="textarea" name="food" id="food" placeholder="Food required" onChange={props.onChange} value={props.state.food} autoComplete="off"/>
                <FormFeedback invalid>This cannot be empty</FormFeedback>
              </FormGroup>
              <FormGroup>
                <Label for="medicine"></Label>
                <Input valid={props.state.success.medicine === "c"} invalid={props.state.success.medicine === "w"} type="textarea" name="medicine" id="medicine" placeholder="Medicine required" onChange={props.onChange} value={props.state.medicine} autoComplete="off"/>
                <FormFeedback invalid>This cannot be empty</FormFeedback>
              </FormGroup>
              {props.state.foodSub ? props.state.foodValid ? null : <Alert style={{"marginTop": "15px"}} color="danger">
                Fill all the fields properly (Type "none" if not needed)
              </Alert> : null}
              {props.state.medSub ? props.state.medValid ? null : <Alert style={{"marginTop": "15px"}} color="danger">
                Fill all the fields properly (Type "none" if not needed)
              </Alert> : null}
              {props.state.numSub ? props.state.numValid ? null : <Alert style={{"marginTop": "15px"}} color="danger">
                Fill all the fields properly (Type "none" if not needed)
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
                <CardHeader tag="h3"><h2>Food</h2></CardHeader>
                <CardBody>
                  <h1>{props.state.food}</h1>
                </CardBody>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="text-center">
                <CardHeader tag="h3"><h2>Medicine</h2></CardHeader>
                <CardBody>
                  <h1>{props.state.medicine}</h1>
                </CardBody>
              </Card>
            </Col>
        </Row>
        <Row>
            <Col md={{size: 6, offset: 3}}>
              <Card className="text-center">
                <CardHeader tag="h3"><h2>Requirement</h2></CardHeader>
                <CardBody>
                  <h1>{props.state.condition === "imp" ? "Important" : props.state.condition === "vimp" ? "Very Important" : props.state.condition === "emrg" ? "Emergency" : null}</h1>
                </CardBody>
              </Card>
            </Col>
        </Row>
    </React.Fragment>
  );
}

export default withFirebaseHOC(Scan);
