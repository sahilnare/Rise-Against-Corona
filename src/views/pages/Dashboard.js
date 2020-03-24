import React, { Component } from 'react';
import reactFeature from '../../assets/images/react-feature.svg';
import sassFeature from '../../assets/images/sass-feature.svg';
import bootstrapFeature from '../../assets/images/bootstrap-feature.svg';
import responsiveFeature from '../../assets/images/responsive-feature.svg';
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
                <h1>Welcome to Vibe.</h1>
                <p className="text-muted">
                  Discover this UI dashboard framework that will help speed up
                  your next web application project.
                </p>
                {
                  this.props.isVerified ? <h2>You have verified</h2> : <h2>You have not verified</h2>
                }
                <h4><Link to="/scan">Scan</Link></h4>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Card>
                <CardBody className="display-flex">
                  <img
                    src={reactFeature}
                    style={{ width: 70, height: 70 }}
                    alt="react.js"
                    aria-hidden={true}
                  />
                  <div className="m-l">
                    <h2 className="h4">React.js</h2>
                    <p className="text-muted">
                      Built to quickly get your MVPs off the ground.
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <CardBody className="display-flex">
                  <img
                    src={bootstrapFeature}
                    style={{ width: 70, height: 70 }}
                    alt="Bootstrap"
                    aria-hidden={true}
                  />
                  <div className="m-l">
                    <h2 className="h4">Bootstrap 4</h2>
                    <p className="text-muted">
                      The most popular framework to get your layouts built.
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Card>
                <CardBody className="display-flex">
                  <img
                    src={sassFeature}
                    style={{ width: 70, height: 70 }}
                    alt="Sass"
                    aria-hidden={true}
                  />
                  <div className="m-l">
                    <h2 className="h4">Sass</h2>
                    <p className="text-muted">
                      Easily change the design system styles to fit your needs.
                    </p>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col md={6}>
              <Card>
                <CardBody className="display-flex">
                  <img
                    src={responsiveFeature}
                    style={{ width: 70, height: 70 }}
                    alt="Responsive"
                    aria-hidden={true}
                  />
                  <div className="m-l">
                    <h2 className="h4">Responsive</h2>
                    <p className="text-muted">
                      Designed for screens of all sizes.
                    </p>
                  </div>
                </CardBody>
              </Card>
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
