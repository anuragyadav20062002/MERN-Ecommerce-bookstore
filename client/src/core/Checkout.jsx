/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getCart, itemTotal } from "./cartHelpers"
import { isAuthenticated } from "../auth"

const Checkout = ({ products }) => {
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

  return (
    <div>
      <h2>Total : ${getTotal()}</h2>
      <br />
      {showCheckOut()}
    </div>
  )
}

export default Checkout
