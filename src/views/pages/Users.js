import React, {Component} from 'react';
import {
  Card,
  CardBody,
  Table,
  UncontrolledAlert
} from 'reactstrap';
import { withFirebaseHOC } from '../../firebase'
import { Redirect } from "react-router-dom";

class Users extends Component {
  constructor() {
    super();
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.props.firebase.getHandshake().then((snap) => {
      snap.docs.forEach((doc, i) => {
        this.setState(state => ({
          users: [...state.users, {user1: doc.data().user1, user2: doc.data().user2, time: doc.data().time, place: doc.data().place }]
        }))
      })
    })
  }

  componentDidUpdate() {
    console.log(this.state.users);
  }

  render() {
    let userTable = []
    this.state.users.forEach((user, i) => {
      userTable.push((
        <tr>
            <td>{user.user1}</td>
            <td>{user.user2}</td>
            <td>{user.time}</td>
            <td>{user.place}</td>
        </tr>
      ))
    })

    if(this.props.isLoggedIn) {
      return (
          <div>
          <UncontrolledAlert color="warning">
            Users are handshaking!
          </UncontrolledAlert>
          <Card>
              <CardBody>
                  Users
                  <Table striped>
                      <thead>
                          <tr>
                              <th>First</th>
                              <th>Second</th>
                              <th>Time</th>
                              <th>Place</th>
                          </tr>
                      </thead>
                      <tbody>
                        {userTable}
                      </tbody>
                  </Table>
              </CardBody>
          </Card>
        </div>
      )
    }
    else {
      return <Redirect to="/login" />
    }
  }
}

export default withFirebaseHOC(Users);
