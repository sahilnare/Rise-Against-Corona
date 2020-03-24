import React, {Component} from 'react';
import {
  Card,
  CardBody,
  Table
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
    this.props.firebase.getUsers().then((snap) => {
      snap.docs.forEach((doc, i) => {
        this.setState(state => ({
          users: [...state.users, {name: doc.data().name, email: doc.data().email}]
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
            <td>{i+1}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
        </tr>
      ))
    })

    if(this.props.isLoggedIn) {
      return (
          <Card>
              <CardBody>
                  Users
                  <Table striped>
                      <thead>
                          <tr>
                              <th>#</th>
                              <th>Name</th>
                              <th>Email</th>
                          </tr>
                      </thead>
                      <tbody>
                        {userTable}
                      </tbody>
                  </Table>
              </CardBody>
          </Card>
      )
    }
    else {
      return <Redirect to="/login" />
    }
  }
}

export default withFirebaseHOC(Users);
