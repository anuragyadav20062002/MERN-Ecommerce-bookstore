/* eslint-disable no-unused-vars */
import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
import Signin from "./user/Signin"
import Signup from "./user/Signup"
import Home from "./core/Home"
import Layout from "./core/Layout"
import PrivateRoute from "./auth/PrivateRoute"
import UserDashboard from "./user/UserDashboard"
import AdminRoute from "./auth/AdminRoute"
import AdminDashboard from "./user/AdminDashboard"
import AddCategory from "./admin/AddCategory"
import AddProduct from "./admin/AddProduct"
import Shop from "./core/Shop"

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
