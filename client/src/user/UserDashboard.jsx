/* eslint-disable no-unused-vars */
import React from "react"
import Layout from "../core/Layout"
import { isAuthenticated } from "../auth"
import { Link } from "react-router-dom"

const UserDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated()

  const userLinks = () => {
    return (
      <div className="card bg-success mb-5" style={{ fontWeight: "bold" }}>
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    )
  }

  const userInfo = () => {
    return (
      <div className="card bg-primary mb-5" style={{ fontWeight: "bold" }}>
        <h3 className="card-header"> User Information</h3>
        <ul className="list-group ">
          <li className="list-group-item">Name : {name}</li>
          <li className="list-group-item">Email : {email}</li>
          <li className="list-group-item">
            Role : {role === 1 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>
    )
  }

  const userHistory = () => {
    return (
      <div className="card bg-warning mb-5" style={{ fontWeight: "bold" }}>
        <h3 className="card-header">Purchase History</h3>
        <ul className="list-group">
          <li className="list-group-item">history</li>
        </ul>
      </div>
    )
  }

  return (
    <Layout
      title="User DashBorad"
      description={`${name}'s Personel Information`}
      className="container"
    >
      <div className="row">
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {userInfo()}
          {userHistory()}
        </div>
      </div>
    </Layout>
  )
}

export default UserDashboard
