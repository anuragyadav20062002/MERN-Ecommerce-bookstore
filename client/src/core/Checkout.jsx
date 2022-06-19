/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getCart, itemTotal } from "./cartHelpers"
import { isAuthenticated } from "../auth"
import { getBraintreeClientToken } from "./apiCore"
import DropIn from "braintree-web-drop-in-react"

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

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/signin">
        <button className="btn btn-primary">Sign in to checkout</button>
      </Link>
    )
  }

  const buy = () => {
    //send the nonce to server
    //nonce = data.instance.requestPaymentMenthod

    let nonce
    let getNonce = data.instance.requestPaymentMenthod().then((data) => {
      console.log(data)
      nonce = data.nonce

      //
    })
  }

  const showDropIn = () => (
    <div>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken,
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={buy} className="btn btn-success">
            Pay
          </button>
        </div>
      ) : null}
    </div>
  )

  useEffect(() => {
    getToken(userId, token)
  }, [])

  return (
    <div>
      <h2>Total : ${getTotal()}</h2>
      <br />
      {showCheckout()}
    </div>
  )
}

export default Checkout
