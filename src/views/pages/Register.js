import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row, Card, CardBody, Alert, FormFeedback } from 'reactstrap';
import { Loader } from '../../vibe/';
import { withFirebaseHOC } from '../../firebase'
import { Redirect, Link } from "react-router-dom";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      userExist: false,
      success: {

      },
      formValid: false,
      loading: false
    }
  }

  onChange = (e) => {
      const { name, value } = e.target

      switch(name) {
        case "name":
          {
            if(value.length > 2) {
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

          case "email":
            {
              if(value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
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

            case "password":
              {
                if(value.length >= 6) {
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

  handleSubmit = (e) => {
    e.preventDefault()

    let foo = 0
    for (var item in this.state.success) {
      if(this.state.success[item] === "c") {
        foo++;
      }
    }

    if(foo === 3) {
      this.setState({formValid: true, formSub: true, loading: true})
      // document.getElementById("signup-form").style.display = "none"
      // document.getElementById("loading").style.display = "block"
      this.props.firebase.signupWithEmail(this.state.email, this.state.password)
        .then(cred => {
          console.log(cred.user)
          cred.user.sendEmailVerification().then(function() {
          }).catch(err => console.log(err));
          this.props.firebase.addUser({name: this.state.name, email: this.state.email})
            .catch(err => console.log(err))
          this.setState({
            name: "",
            email: "",
            password: "",
            formValid: false,
            userExist: false,
            loading: false
          })
          this.setState(prevState => {
            let success = { ...prevState.success };
            success["email"] = "";
            success["password"] = "";
            return { success };
          })
        })
        .catch(err => {
          if(err.code === "auth/email-already-in-use") {
            this.setState({userExist: true, loading: false})
            // document.getElementById("signup-form").style.display = "block"
            // document.getElementById("loading").style.display = "none"
          }
        })
    }
    else {
      this.setState({formValid: false, formSub: true})
    }

    // if(this.state.formValid) {
    //   document.getElementById("signup-form").style.display = "none"
    //   document.getElementById("loading").style.display = "block"
    //   this.props.firebase.signupWithEmail(this.state.email, this.state.password)
    //     .then(cred => {
    //       console.log(cred.user)
    //       cred.user.sendEmailVerification().then(function() {
    //       }).catch(err => console.log(err));
    //       this.props.firebase.addUser({name: this.state.name, email: this.state.email})
    //         .catch(err => console.log(err))
    //       this.setState({
    //         name: "",
    //         email: "",
    //         password: "",
    //         formValid: false,
    //       })
    //       this.setState(prevState => {
    //         let success = { ...prevState.success };
    //         success["email"] = "";
    //         success["password"] = "";
    //         return { success };
    //       })
    //     })
    //     .catch(err => console.log(err))
    // }
  }


  render() {
    if(!this.props.isLoggedIn) {
      if(this.state.loading) {
        return <Loader id="loading" type="bars" />
      }
      else {
        return (
          <Row>
              <Col id="signup-form" md={{ size: 8, offset: 2 }}>
                <Card>
                    <CardBody>
                      <Form>
                      <FormGroup>
                        <Label for="name">Name</Label>
                        <Input valid={this.state.success.name === "c"} invalid={this.state.success.name === "w"} type="text" name="name" id="name" placeholder="Name" onChange={this.onChange} value={this.state.name} autoComplete="off" />
                        <FormFeedback valid>Name is valid</FormFeedback>
                        <FormFeedback invalid>Name is invalid</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label for="email">Email</Label>
                        <Input valid={this.state.success.email === "c"} invalid={this.state.success.email === "w"} type="email" name="email" id="email" placeholder="Email" onChange={this.onChange} value={this.state.email} autoComplete="off" />
                        <FormFeedback valid>Email is valid</FormFeedback>
                        <FormFeedback invalid>Email is invalid</FormFeedback>
                      </FormGroup>
                      <FormGroup>
                        <Label for="password">Password</Label>
                        <Input valid={this.state.success.password === "c"} invalid={this.state.success.password === "w"} type="password" name="password" id="password" placeholder="Password" onChange={this.onChange} value={this.state.password} autoComplete="off" />
                        <FormFeedback valid>Password is valid</FormFeedback>
                        <FormFeedback invalid>Password is invalid</FormFeedback>
                      </FormGroup>
                      <Button onClick={this.handleSubmit}>Submit</Button>
                      {this.state.formSub ? this.state.formValid ? null : <Alert style={{"marginTop": "15px"}} color="danger">
                        Please fill out all the fields properly
                      </Alert> : null}
                      {this.state.userExist ? <Alert style={{"marginTop": "15px"}} color="danger">
                        Email already exists!
                      </Alert> : null}
                      {/*<Button onClick={this.handleLogOut}>Log Out</Button>*/}
                    </Form>
                    <Link to="/login">Click here to Log In if you've already registered.</Link>
                  </CardBody>
                </Card>
              </Col>
          </Row>
        );
      }
    }
    else {
      return <Redirect to="/home" />
    }
  }
}

export default withFirebaseHOC(Register);
