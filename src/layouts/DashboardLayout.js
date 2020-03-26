import React, { Component } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import { Button, Badge, NavItem, UncontrolledDropdown, UncontrolledAlert, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Header, SidebarNav, Footer, PageContent, Avatar, Chat, PageAlert, Page } from '../vibe';
import Logo from '../assets/images/vibe-logo.svg';
import avatar1 from '../assets/images/avatar1.png';
import nav from '../_nav';
import routes from '../views';
import ContextProviders from '../vibe/components/utilities/ContextProviders';
import handleKeyAccessibility, { handleClickAccessibility } from '../vibe/helpers/handleTabAccessibility';
import { withFirebaseHOC } from '../firebase'
import { Loader } from '../vibe/';

const MOBILE_SIZE = 992;

class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarCollapsed: false,
      isMobile: window.innerWidth <= MOBILE_SIZE,
      showChat1: true,
      isLoggedIn: false,
      loading: true,
      isVerified: true,
      isRecorded: false,
      reqData: "",
      requestSent: false,
      userId: "",
      userName: "",
      handSub: false
    };
  }

  handleResize = () => {
    if (window.innerWidth <= MOBILE_SIZE) {
      this.setState({ sidebarCollapsed: false, isMobile: true });
    } else {
      this.setState({ isMobile: false });
    }
  };

  componentDidUpdate(prev) {
    if (this.state.isMobile && prev.location.pathname !== this.props.location.pathname) {
      this.toggleSideCollapse();
    }
    // this.props.firebase.checkUserAuth(user => {
    //     if(user) {
    //       console.log("User has logged in: ", user.email)
    //       // console.log("Email Verification: ", user.emailVerified)
    //     } else {
    //       console.log("User has logged out")
    //     }
    // })
    // console.log(this.state);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('keydown', handleKeyAccessibility);
    document.addEventListener('click', handleClickAccessibility);
    this.setState({loading: true})
    this.props.firebase.checkUserAuth(user => {
        if(user) {
          console.log("User has logged in: ", user.email)
          // console.log(user)
          // console.log("Email Verification: ", user.emailVerified)
          this.setState({isLoggedIn: true, loading: false, userId: user.uid})
          this.props.firebase.getUserFromId(user.uid).then(user => {
            if(user.data().requestSent)
            this.setState({requestSent: true, isRecorded: true, userName: user.data().name});
            else
            this.setState({requestSent: false, isRecorded: false, userName: user.data().name});
            if(user.data().donorAdded)
            this.setState({donorAdded: true});
          }).catch(err => console.log(err))
          if(user.emailVerified) {
            this.setState({isVerified: true})
          }
          else {
            this.setState({isVerified: false})
          }
        } else {
          console.log("User has logged out")
          this.setState({isLoggedIn: false})
          this.setState({loading: false})
        }
    })
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    this.setState({isLoggedIn: false})
  }

  toggleSideCollapse = () => {
    this.setState(prevState => ({ sidebarCollapsed: !prevState.sidebarCollapsed }));
  };

  closeChat = () => {
    this.setState({ showChat1: false });
  };

  logOut = (e) => {
    e.preventDefault()
    this.setState({isLoggedIn: false, requestSent: false, isRecorded: false});
    this.props.firebase.signOut().then(() => {
      console.log("User has logged out");
      // this.setState({isLoggedIn: false});
    }).catch(err => console.log(err))
  }

  handshake = (name, time, place) => {
    this.props.firebase.handshake(this.state.userName, name, time, place)
  }

  handleRecord = (reqData) => {
    this.setState({isRecorded: true, reqData: reqData});
  }

  handleScan = (data) => {
    this.props.firebase.addScan(data.bikeId, data.time, data.distance).then(console.log("added"))
  }

  parentSendRequest = () => {
    this.setState({requestSent: true})
  }

  render() {
    const { sidebarCollapsed } = this.state;
    const sidebarCollapsedClass = sidebarCollapsed ? 'side-menu-collapsed' : '';
    if(this.state.loading) {
      return <Loader id="loading" type="bars" />
    }
    else {
    return (
      <ContextProviders>
        <div className={`app ${sidebarCollapsedClass}`}>
          <PageAlert />
          {
            this.state.donorAdded ? (<UncontrolledAlert color="warning">
              Donor found! Check notifications!
            </UncontrolledAlert>) : null
          }
          <div className="app-body">
            <SidebarNav
              nav={nav}
              logo={Logo}
              logoText="VIBE."
              isSidebarCollapsed={sidebarCollapsed}
              toggleSidebar={this.toggleSideCollapse}
              isLoggedIn={this.state.isLoggedIn}
              {...this.props}
            />
            <Page>
              <Header
                toggleSidebar={this.toggleSideCollapse}
                isSidebarCollapsed={sidebarCollapsed}
                routes={routes}
                {...this.props}
              >
                <NavItem>
                  <form className="form-inline">
                    <input className="form-control mr-sm-1" type="search" placeholder="Search" aria-label="Search" />
                    <Button type="submit" className="d-none d-sm-block">
                      <i className="fa fa-search" />
                    </Button>
                  </form>
                </NavItem>
                {this.state.isLoggedIn ? (
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      <Avatar size="small" color="success" initials="JS" />
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem><Link to="/home">Home</Link></DropdownItem>
                      <DropdownItem>User</DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem>
                        Message <Badge color="success">10</Badge>
                      </DropdownItem>
                      <DropdownItem divider />
                      <DropdownItem onClick={this.logOut}>
                        Log Out
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                ) : null}
              </Header>
              <PageContent>
                <Switch>
                  {routes.map((page, key) => {
                        return (
                          <Route path={page.path} render={(props) => <page.component handshake={this.handshake} userName={this.state.userName} userId={this.state.userId} requestSent={this.state.requestSent} parentSendRequest={this.parentSendRequest} isLoggedIn={this.state.isLoggedIn} isRecorded={this.state.isRecorded} handleRecord={this.handleRecord} handleScan={this.handleScan} reqData={this.state.reqData} isVerified={this.state.isVerified} {...props} />} key={key} />
                        )
                  })}
                  <Redirect from="/" to="/home" />
                </Switch>
              </PageContent>
            </Page>
          </div>
          <Footer>
            <span>Copyright © 2020 Team FSociety. All rights reserved.</span>
            <span>
              <a href="#!">Terms</a> | <a href="#!">Privacy Policy</a>
            </span>
            <span className="ml-auto hidden-xs">
              Made with{' '}
              <span role="img" aria-label="taco">
                🌮
              </span>
            </span>
          </Footer>
          {/*<Chat.Container>
            {this.state.showChat1 && (
              <Chat.ChatBox name="Messages" status="online" image={avatar1} close={this.closeChat} />
            )}
          </Chat.Container>*/}
        </div>
      </ContextProviders>
    );
    }
  }
}

export default withFirebaseHOC(DashboardLayout);
