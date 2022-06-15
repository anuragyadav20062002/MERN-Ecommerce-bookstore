import React from "react"
import Layout from "../core/Layout"
import { isAuthenticated } from "../auth"

const UserDashboard = () => {
  const {
    user: { _id, name, email, role },
  } = isAuthenticated()

  return (
    <Layout
      title="User DashBorad"
      description="User Dashboard"
      className="container"
    >
      <div className="card mb-5" style={{ fontWeight: "bold" }}>
        <h3 className="card-header"> User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">Name : {name}</li>
          <li className="list-group-item">Email : {email}</li>
          <li className="list-group-item">
            Role : {role === 1 ? "Admin" : "Registered User"}
          </li>
        </ul>
      </div>

      <div className="card mb-5" style={{ fontWeight: "bold" }}>
        <h3 className="card-header">Purchase History</h3>
        <ul className="list-group">
          <li className="list-group-item">history</li>
        </ul>
      </div>
    </Layout>
  )
}

export default UserDashboard
