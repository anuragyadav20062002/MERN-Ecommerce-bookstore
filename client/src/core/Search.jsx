/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import { getCategories, list } from "./apiCore"
import Card from "./Card"

const Search = () => {
  const [data, setData] = useState({
    categories: [],
    category: "",
    search: "",
    results: [],
    searched: false,
  })

  const { categories, category, search, results, searched } = data

  const loadCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setData({ ...data, categories: data })
      }
    })
  }

  const searchData = () => {
    if (search) {
      list({ search: search || undefined, category: category }).then((res) => {
        if (res.error) {
          console.log(res.error)
        } else {
          setData({ ...data, results: res, searched: true })
        }
      })
    }
  }

  const searchSubmit = (e) => {
    e.preventDefault()
    searchData()
  }

  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} product(s)`
    }
    if (searched && results.length < 1) {
      return `No Products Found`
    }
  }

  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className="mt-2 mb-4">{searchMessage(searched, results)}</h2>
        <div className="row">
          {results.map((product, i) => (
            <Card key={i} product={product} />
          ))}
        </div>
      </div>
    )
  }

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false })
  }

  const searchForm = () => (
    <form onSubmit={searchSubmit}>
      <span className="input-group-text mb-4">
        <div className="input-group input-group-lg">
          <div className="input-group-prepend">
            <select className="btn mr-2" onChange={handleChange("category")}>
              <option value="All">All Category</option>
              {categories.map((c, i) => (
                <option style={{ textAlign: "left" }} value={c._id} key={i}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <input
            type="search"
            className="form-control"
            onChange={handleChange("search")}
            placeholder="Search by name"
          />
        </div>

        <div className="btn input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  )

  useEffect(() => {
    loadCategories()
  }, [])

  return (
    <div className="row">
      <div className="container mb-3">{searchForm()}</div>
      <div className="container mb-3">{searchedProducts(results)}</div>
    </div>
  )
}

export default Search
