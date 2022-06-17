/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import Layout from "./Layout"
import Card from "./Card"
import { getCategories } from "./apiCore"
import Checkbox from "./Checkbox"
import { prices } from "./fixedPrices"
import RadioBox from "./RadioBox"

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  })
  const [categories, setCategories] = useState([])
  const [error, setError] = useState([])

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setCategories(data)
      }
    })
  }

  useEffect(() => {
    init()
  }, [])

  const handlePrice = (value) => {
    const data = prices
    let array = []

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array
      }
    }

    return array
  }

  const handleFilters = (filters, filterBy) => {
    console.log("Shop", filters, filterBy)
    const newFilters = { ...myFilters }
    newFilters.filters[filterBy] = filters

    if (filterBy === "price") {
      let priceValues = handlePrice(filters)
      newFilters.filters[filterBy] = priceValues
    }
    setMyFilters(newFilters)
  }

  return (
    <>
      <Layout
        title="Shop Page"
        description="Search and Find Books of your choice"
        className="container-fluid"
      >
        <div className="row">
          <div className="col-4">
            <h4>Filter By Categories</h4>
            <ul>
              <Checkbox
                categories={categories}
                handleFilters={(filters) => handleFilters(filters, "category")}
              />
            </ul>
            <h4>Filter By Price Range</h4>
            <div>
              <RadioBox
                prices={prices}
                handleFilters={(filters) => handleFilters(filters, "price")}
              />
            </div>
          </div>
          <div className="col-8">{JSON.stringify(myFilters)}</div>
        </div>
      </Layout>
    </>
  )
}

export default Shop
