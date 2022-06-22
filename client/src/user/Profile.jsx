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

  return (
    <>
      <Layout
        title={`${name}'s Profile`}
        description={`Hey ${name} You can Update your profile here`}
        className="container-fluid"
      >
        <h2>Profile Update</h2>
        {JSON.stringify(values)}
      </Layout>
    </>
  )
}

export default Profile
