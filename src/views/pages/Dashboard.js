import React, { Component } from 'react';
import reactFeature from '../../assets/images/react-feature.svg';
import sassFeature from '../../assets/images/sass-feature.svg';
import bootstrapFeature from '../../assets/images/bootstrap-feature.svg';
// import responsiveFeature from '../../assets/images/responsive-feature.svg';
import { Card, CardBody, Row, Col } from 'reactstrap';
import { Redirect, Link } from "react-router-dom";
import { withFirebaseHOC } from '../../firebase'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    if(this.props.isLoggedIn) {
      // this.props.firebase.checkUserAuth(user => {
      //     if(user) {
      //       if(user.emailVerified) {
      //         this.setState({isVerified: true})
      //       }
      //     } else {
      //       this.setState({isVerified: false})
      //     }
      // })
    }
  }
  componentWillUnmount() {
    // this.setState({isVerified: false})
  }
  render() {
    const heroStyles = {
      padding: '50px 0 70px'
    };

    if(this.props.isLoggedIn) {
      return (
        <div>
          <Row>
            <Col md={6}>
              <div className="home-hero" style={heroStyles}>
                <h1>Welcome to our app</h1>
                <p className="text-muted">
                  Your help is needed for distributing food to the needy!
                </p>
                {
                  this.props.isVerified ? <h4>You have verified</h4> : <h4>You have not verified</h4>
                }
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Link to="/donate" style={{color: "black"}}>
              <Card>
                <CardBody className="display-flex">
                  <img
                    src={reactFeature}
                    style={{ width: 70, height: 70 }}
                    alt="Donate"
                    aria-hidden={true}
                  />
                  <div className="m-l">
                    <h2 className="h4">Donate</h2>
                    <p className="text-muted">
                      Click here if you want to donate
                    </p>
                  </div>
                </CardBody>
              </Card>
              </Link>
            </Col>
            <Col md={6}>
              <Link to="/receive" style={{color: "black"}}>
              <Card>
                <CardBody className="display-flex">
                  <img
                    src={bootstrapFeature}
                    style={{ width: 70, height: 70 }}
                    alt="Receive"
                    aria-hidden={true}
                  />
                  <div className="m-l">
                    <h2 className="h4">Receive</h2>
                    <p className="text-muted">
                      Click here if you want to receive
                    </p>
                  </div>
                </CardBody>
              </Card>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col md={{size: 6, offset: 3}}>
              <Link to="/home" style={{color: "black"}}>
              <Card>
                <CardBody className="display-flex">
                  <img
                    src={sassFeature}
                    style={{ width: 70, height: 70 }}
                    alt="Activity"
                    aria-hidden={true}
                  />
                  <div className="m-l">
                    <h2 className="h4">Activity</h2>
                    <p className="text-muted">
                      Click here to check the activities in your area
                    </p>
                  </div>
                </CardBody>
              </Card>
              </Link>
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

export default withFirebaseHOC(Dashboard);
