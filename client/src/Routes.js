/* eslint-disable no-unused-vars */
import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Signin from "./user/Signin"
import Signup from "./user/Signup"
import Home from "./core/Home"
import Menu from "./core/Menu"
import PrivateRoute from "./auth/PrivateRoute"
import UserDashboard from "./user/UserDashboard"
import AdminRoute from "./auth/AdminRoute"
import AdminDashboard from "./user/AdminDashboard"

const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/" exact component={Home} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
