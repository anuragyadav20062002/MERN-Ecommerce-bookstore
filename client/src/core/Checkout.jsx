/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getCart, itemTotal } from "./cartHelpers"
import { isAuthenticated } from "../auth"
import { getBraintreeClientToken, processPayment } from "./apiCore"
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
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        // console.log(data)
        nonce = data.nonce

        //once you have nonce (card type,number) send nonce as 'paymentMethodNonce'
        //and aslo total to be charged

        // console.log("send nonce ", nonce, getTotal(products))

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(products),
        }

        processPayment(userId, token, paymentData)
          .then((res) => console.log(res))
          .catch((error) => console.log(error))
      })
      .catch((err) => {
        // console.log("dropin error", err)
        setData({ ...data, error: err.message })
      })
  }

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: "" })}>
      {data.clientToken !== null && products.length > 0 ? (
        <div>
          <DropIn
            options={{
              authorization: data.clientToken,
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={buy} className="btn btn-success btn-block">
            Pay
          </button>
        </div>
      ) : null}
    </div>
  )
  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  )

  useEffect(() => {
    getToken(userId, token)
  }, [])

  return (
    <div>
      <h2>Total : ${getTotal()}</h2>
      <br />
      {showError(data.error)}
      {showCheckout()}
    </div>
  )
}

export default Checkout
