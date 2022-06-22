/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import Layout from "../core/Layout"
import { API } from "../config"
import { Link, Redirect } from "react-router-dom"
import { signin, authenticate, isAuthenticated } from "../auth"
import { read, update, updateuser } from "./apiUser"

const Profile = ({ match }) => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: false,
    success: false,
  })

  const { name, email, password, error, success } = values
  const { token } = isAuthenticated()

  const init = (userId) => {
    // console.log(userId);
    read(userId, token).then((data) => {
      if (data.error) {
        setValues({ ...values, error: true })
      } else {
        setValues({ ...values, name: data.name, email: data.email })
      }
    })
  }

  useEffect(() => {
    init(match.params.userId)
  }, [])

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value })
  }

  const clickSubmit = (e) => {
    e.preventDefault()
    update(match.params.userId, token, { name, email, password }).then(
      (data) => {
        if (data.error) {
          // console.log(data.error);
          alert(data.error)
        } else {
          updateuser(data, () => {
            setValues({
              ...values,
              name: data.name,
              email: data.email,
              success: true,
            })
          })
        }
      }
    )
  }

  const redirectUser = (success) => {
    if (success) {
      return <Redirect to="/cart" />
    }
  }

  const profileUpdate = (name, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          onChange={handleChange("name")}
          className="form-control"
          value={name}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          onChange={handleChange("email")}
          className="form-control"
          value={email}
        />
      </div>
      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          onChange={handleChange("passwod")}
          className="form-control"
          value={password}
        />
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">
        Submit
      </button>
    </form>
  )

  return (
    <>
      <Layout
        title={`${name}'s Profile`}
        description={`Hey ${name} You can Update your profile here`}
        className="container"
      >
        <h2>Profile Update</h2>
        {profileUpdate(name, email, password)}
        {redirectUser(success)}
      </Layout>
    </>
  )
}

export default Profile
