import React, { Component } from "react";

import "./style.css";

import NavPanel from "./component/navPanel";

class Navigation extends Component {

  shouldComponentUpdate(nextState, prevProps) {
    return false
  }

  render() {
    return <NavPanel />;
  }
}

export default Navigation;
