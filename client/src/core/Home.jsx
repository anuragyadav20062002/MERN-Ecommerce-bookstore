/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import Layout from "./Layout"
import { getProducts } from "./apiCore"
import Card from "./Card"
import Search from "./Search"

const Home = () => {
  const [productBySell, setProductBySell] = useState([])
  const [productByArrival, setProductByArrival] = useState([])
  const [error, setError] = useState(false)

  //loading products in descreading order of number of sales

  const loadProductBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error)
        console.log(error)
      } else {
        setProductBySell(data)
      }
    })
  }

  //loading products in descreading order of number of arrival

  const loadProductByArrival = () => {
    getProducts("createdAt").then((data) => {
      if (data.error) {
        setError(data.error)
        console.log(error)
      } else {
        setProductByArrival(data)
      }
    })
  }

  //running function when component mounts

  useEffect(() => {
    loadProductByArrival()
    loadProductBySell()
  }, [])

  return (
    <>
      <Layout
        title="Home Page"
        description="Node React E-commerce App"
        className="container-fluid"
      >
        <Search />
        <h2 className="mb-4" style={{ textAlign: "center" }}>
          New Arrivals
        </h2>
        <div className="row ml-4">
          {productByArrival.map((product, i) => (
            <div key={i} className="col-4 mb-3">
              <Card product={product} />
            </div>
          ))}
        </div>

        <hr />

        <h2 className="mb-4" style={{ textAlign: "center" }}>
          Best Sellers
        </h2>
        <div className="row ml-4">
          {productBySell.map((product, i) => (
            <div key={i} className="col-4 mb-3">
              <Card product={product} />
            </div>
          ))}
        </div>
      </Layout>
    </>
  )
}

export default Home
