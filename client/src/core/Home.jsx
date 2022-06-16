/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import Layout from "./Layout"
import { getProducts } from "./apiCode"

const Home = () => {
  const [productBySell, setProductBySell] = useState([])
  const [productByArrival, setProductByArrival] = useState([])
  const [error, setError] = useState(false)

  //loading products in descreading order of number of sales

  const loadProductBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error)
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
      } else {
        setProductByArrival(data)
      }
    })
  }

  //running function when component mounts

  useEffect(() => {
    loadProductByArrival()
    loadProductBySell()
  })

  return (
    <>
      <Layout title="Home Page" description="Node React E-commerce App">
        {JSON.stringify(productByArrival)}
        <hr />
        {JSON.stringify(productByArrival)}
      </Layout>
    </>
  )
}

export default Home
