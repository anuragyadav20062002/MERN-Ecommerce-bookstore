/* eslint-disable no-unused-vars */
import React, { useState } from "react"
import Layout from "../core/Layout"
import { isAuthenticated } from "../auth"
import { Link } from "react-router-dom"

const AddCategory = () => {
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [success, setSucess] = useState("")

  //destructure user and info from localstorage

  const { user, token } = isAuthenticated()

  const handleChange = (e) => {
    setError("")
    setName(e.target.value)
  }

  const clickSubmit = (e) => {
    e.preventDefault()
    setError("")
    setSucess(false)

    //make request to api to create category
  }

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted"></label>
        <input
          type="text"
          className="form-control"
          onChange={handleChange}
          value={name}
          autoFocus
        />
        <button className="btn btn-outline-primary">Create Category</button>
      </div>
    </form>
  )

  return <></>
}

export default AddCategory
