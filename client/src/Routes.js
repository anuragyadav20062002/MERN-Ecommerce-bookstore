/* eslint-disable no-unused-vars */
import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Signin from "./user/Signin"
import Signup from "./user/Signup"
import Home from "./core/Home"
import Menu from "./core/Menu"
import PrivateRoute from "./auth/PrivateRoute"
import Dashborad from "./user/UserDashboard"

const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/" exact component={Home} />
        <PrivateRoute path="/user/dashboard" exact component={Dashborad} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
