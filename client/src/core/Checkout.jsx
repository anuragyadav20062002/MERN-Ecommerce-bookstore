/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Layout from "./Layout"
import { getCart, itemTotal } from "./cartHelpers"
import Card from "./Card"

const Checkout = ({ products }) => {
  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  }

  return (
    <div>
      <h2>Total : ${getTotal()}</h2>
    </div>
  )
}

export default Checkout
