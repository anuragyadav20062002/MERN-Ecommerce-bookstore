/* eslint-disable no-unused-vars */
import React from "react"
import Layout from "../core/Layout"
import { API } from "../config"

const Signup = () => {
  const signUpForm = () => {
    return (
      <div>
        <form>
          <div className="form-group">
            <label className="text-muted">Name</label>
            <input type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label className="text-muted">Email</label>
            <input type="email" className="form-control" />
          </div>
          <div className="form-group">
            <label className="text-muted">Password</label>
            <input type="password" className="form-control" />
          </div>
          <button className="btn btn-danger">Submit</button>
        </form>
      </div>
    )
  }

  return (
    <>
      <Layout
        title="Sign-Up"
        description="Sign Up to E-Bookstore"
        className="container col-md-8 offset-md-2"
      >
        {signUpForm()}
      </Layout>
    </>
  )
}

export default Signup
