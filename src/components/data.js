// register user component

import React, { Component } from "react";
import { connect } from "react-redux";
import { Image } from "react";
import { Container, Row, Col } from "reactstrap";

import styles from "../../scss/components/Registration.scss";

const provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

class Registration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      email: "",
      vendorName: "",
      vendorType: "",
      user: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.state = { items: [] };
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  logout() {
    auth.signOut().then(() => {
      this.setState({
        user: null
      });
    });
  }

  login() {
    auth.signInWithPopup(provider).then(result => {
      const user = result.user;
      this.setState({
        user
      });
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const itemsRef = firebase.database().ref("vendors");
    const item = {
      name: this.state.user.name,
      email: this.state.user.email,
      vendorName: this.state.user.vendorName,
      vendorType: this.state.user.vendorType
    };
    itemsRef.push(item);
    this.setState({
      name: "",
      email: "",
      vendorName: "",
      vendorType: ""
    });
  }

  componentDidMount() {
    // check if user is logged in
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
    // retrieve data
    const itemsRef = firebase.database().ref("vendors");
    itemsRef.on("value", snapshot => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push({
          id: item,
          name: items[item].name,
          email: items[item].email,
          vendorName: items[item].vendorName,
          vendortype: items[item].vendorType
        });
      }
      this.setState({
        items: newState
      });
    });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col xs="4">
            <h1>Login</h1>
            {this.state.user ? (
              <button onClick={this.logout}>Log Out</button>
            ) : (
              <button onClick={this.login}>Log In</button>
            )}
          </Col>
          <Col xs="4">
            {this.state.user ? (
              <div className="user-profile">
                <h2>User Profile</h2>
                <img src={this.state.user.photoURL} style={{ maxWidth: 200 }} />
                <form onSubmit={this.handleSubmit}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    onChange={this.handleChange}
                    value={this.state.user.name}
                  />
                  <input
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                    value={this.state.user.email}
                  />
                  <input
                    type="text"
                    name="vendorName"
                    placeholder="What is your business/vendor name?"
                    onChange={this.handleChange}
                    value={this.state.user.vendorName}
                  />
                  <input
                    type="text"
                    name="vendorType"
                    placeholder="What are you selling?"
                    onChange={this.handleChange}
                    value={this.state.user.vendorType}
                  />
                  <button>Submit Details</button>
                </form>
              </div>
            ) : (
              <div className="wrapper">
                <p>
                  You must be logged in to see the potluck list and submit to
                  it.
                </p>
              </div>
            )}
          </Col>
          <Col xs="4">
            <ul>
              {this.state.items.map(vendors => {
                return (
                  <li key={vendors.id}>
                    <h2>{vendors.name}</h2>
                    <p>
                      Vendor Name: {vendors.vendor}
                      {vendors.vendor === this.state.user.vendorName ? (
                        <button
                          onClick={() => this.remoteItem(vendors.vendorName)}
                        >
                          Remove Item
                        </button>
                      ) : null}
                    </p>
                    <p>
                      Vendor Type: {vendors.vendtype}
                      {vendors.vendType === this.state.user.vendType ? (
                        <button
                          onClick={() => this.remoteItem(vendors.vendType)}
                        >
                          Remove Item
                        </button>
                      ) : null}
                    </p>
                  </li>
                );
              })}
            </ul>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Registration;

// WEBPACK FOOTER //
// src/js/components/Registration.jsx
