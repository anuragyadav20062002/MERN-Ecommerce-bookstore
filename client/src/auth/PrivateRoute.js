import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import { isAuthenticated } from "./index"

const PrivateRoute = ({ component: Component }) => {
  return <div>PrivateRoute</div>
}

export default PrivateRoute
