import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText, Col, Row, Card, CardBody, Alert, FormFeedback } from 'reactstrap';
import { Loader } from '../../vibe/';
import { withFirebaseHOC } from '../../firebase'
import { Redirect, Link } from "react-router-dom";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      wrongPass: false,
      wrongUser: false,
      success: {

      },
      formValid: false,
      loading: false,
    }
  }

  onChange = (e) => {
      const { name, value } = e.target

      switch(name) {
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
                if(value.length >= 1) {
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

    if(foo === 2) {
      this.setState({formValid: true, formSub: true, loading: true})
      // document.getElementById("login-form").style.display = "none"
      // document.getElementById("loading").style.display = "block"
      this.props.firebase.loginWithEmail(this.state.email, this.state.password)
        .then(cred => {
          console.log(cred.user)
          this.setState({
            email: "",
            password: "",
            formValid: false,
            formSub: false,
            wrongPass: false,
            wrongUser: false,
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
          console.log(err);
          if(err.code === "auth/wrong-password") {
            this.setState({wrongPass: true, wrongUser: false, loading: false});
            // document.getElementById("login-form").style.display = "block"
            // document.getElementById("loading").style.display = "none"
          }
          if(err.code === "auth/user-not-found") {
            this.setState({wrongUser: true, loading: false});
            // document.getElementById("login-form").style.display = "block"
            // document.getElementById("loading").style.display = "none"
          }
        })
    }
    else {
      this.setState({formValid: false, formSub: true})
    }

    // if(this.state.formValid) {
    //   document.getElementById("login-form").style.display = "none"
    //   document.getElementById("loading").style.display = "block"
    //   this.props.firebase.loginWithEmail(this.state.email, this.state.password)
    //     .then(cred => {
    //       console.log(cred.user)
    //       this.setState({
    //         email: "",
    //         password: "",
    //         formValid: false,
    //         formSub: false,
    //         wrongPass: false,
    //         wrongUser: false
    //       })
    //       this.setState(prevState => {
    //         let success = { ...prevState.success };
    //         success["email"] = "";
    //         success["password"] = "";
    //         return { success };
    //       })
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       if(err.code === "auth/wrong-password") {
    //         this.setState({wrongPass: true, wrongUser: false});
    //         document.getElementById("login-form").style.display = "block"
    //         document.getElementById("loading").style.display = "none"
    //       }
    //       if(err.code === "auth/user-not-found") {
    //         this.setState({wrongUser: true});
    //         document.getElementById("login-form").style.display = "block"
    //         document.getElementById("loading").style.display = "none"
    //       }
    //     })
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
              <Col id="login-form" md={{ size: 8, offset: 2 }}>
                <Card>
                    <CardBody>
                      <Form>
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
                      <Button onClick={this.handleSubmit}>Log In</Button>
                      {this.state.formSub ? this.state.formValid ? null : <Alert style={{"marginTop": "15px"}} color="danger">
                        Please fill out all the fields properly
                      </Alert> : null}
                      {this.state.wrongPass ? <Alert style={{"marginTop": "15px"}} color="danger">
                        The password is wrong
                      </Alert> : null}
                      {this.state.wrongUser ? <Alert style={{"marginTop": "15px"}} color="danger">
                        The email is not registered
                      </Alert> : null}
                    </Form>
                    <Link to="/register">Click here to Sign Up</Link>
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

export default withFirebaseHOC(Login);
