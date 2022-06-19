/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getCart, itemTotal } from "./cartHelpers"
import { isAuthenticated } from "../auth"
import { getBraintreeClientToken } from "./apiCore"

const Checkout = ({ products }) => {
  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: "",
    instance: {},
    address: "",
  })

  const userId = isAuthenticated() && isAuthenticated().user._id
  const token = isAuthenticated() && isAuthenticated().token

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        setData({ ...data, error: data.error })
      } else {
        setData({ ...data, clientToken: data.clientToken })
      }
    })
  }

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  }

  const showCheckOut = () =>
    isAuthenticated() ? (
      <button className="btn btn-success">CheckOut</button>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">SignIn To Checkout</button>
      </Link>
    )

  useEffect(() => {
    getToken(userId, token)
  }, [])

  return (
    <div>
      <h2>Total : ${getTotal()}</h2>
      <br />
      {showCheckOut()}
    </div>
  )
}

export default Checkout
