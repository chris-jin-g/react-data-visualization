import React from "react";
import PropTypes from "prop-types";

// export default class Hello extends React.Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     return <p>Hello, {this.props.name}!</p>;
//   }
// }

// const Hello = props => {
//   return <p>Hello, {props.name === undefined ? "Unknown" : props.name}!</p>;
// };

const Hello = props => {
  return <p>Hello, {props.name}!</p>;
};

Hello.propTypes = {
  name: PropTypes.string
};

Hello.defaultProps = {
  name: "Unknown"
};

export default Hello;
