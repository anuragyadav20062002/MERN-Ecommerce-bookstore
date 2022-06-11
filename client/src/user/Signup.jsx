import React from "react"
import Layout from "../core/Layout"
import { API } from "../config"

const Signup = () => {
  return (
    <>
      <Layout title="Sign-Up" description="Sign Up to E-Bookstore">
        {API}
      </Layout>
    </>
  )
}

export default Signup
