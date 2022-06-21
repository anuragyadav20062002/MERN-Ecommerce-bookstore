/* eslint-disable no-unused-vars */
import React from "react"
import Layout from "../core/Layout"
import { isAuthenticated } from "../auth"
import { Link } from "react-router-dom"

const AdminDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated()

  const adminLinks = () => {
    return (
      <div className="card bg-success mb-5" style={{ fontWeight: "bold" }}>
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
              Crete Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/orders">
              View Orders
            </Link>
          </li>
        </ul>
      </div>
    )
  }

  const adminInfo = () => {
    return (
      <div className="card bg-primary mb-5" style={{ fontWeight: "bold" }}>
        <h3 className="card-header"> Admin Information</h3>
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

  return (
    <Layout
      title="User DashBorad"
      description={`${name}'s Personel Information`}
      className="container"
    >
      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">{adminInfo()}</div>
      </div>
    </Layout>
  )
}

export default AdminDashboard
