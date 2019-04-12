import React, { Component } from 'react'
import {BrowserRouter as Link } from "react-router-dom";

export default class Menu extends Component {
  render() {
    return (
        <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="settings">Settings</Link></li>

    </ul>
    )
  }
}
