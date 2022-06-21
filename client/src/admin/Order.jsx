/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import Layout from "../core/Layout"
import { isAuthenticated } from "../auth"
import { Link } from "react-router-dom"
import { listOrders } from "./apiadmin"
import moment from "moment"

const Order = () => {
  const [orders, setOrders] = useState([])

  const { user, token } = isAuthenticated()

  const loadOrders = () => {
    listOrders(user._id, token).then((data) => {
      if (data.error) {
        console.log("errors", data.error)
      } else {
        setOrders(data)
        console.log(orders)
      }
    })
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h1 className="text-danger display-2">
          Total Orders : {orders.length}
        </h1>
      )
    } else {
      return <h2 className="text-danger">No Orders</h2>
    }
  }

  const showInput = (key, value) => (
    <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
        <div className="input-group-text">{key}</div>
      </div>
      <input type="text" value={value} className="form-control" readOnly />
    </div>
  )

  return (
    <Layout
      title="Orders"
      description={`Hello ${user.name},you can manage all the orders here`}
    >
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength()}
          {orders.map((o, oIndex) => {
            return (
              <div
                className="mt-5"
                key={oIndex}
                style={{ borderBottom: "5px solid indigo" }}
              >
                <h2 className="mb-5">
                  <span className="bg-primary">Order Id : {o._id}</span>
                </h2>
                <ul className="list-group mb-2">
                  <li className="list-group-item">{o.status}</li>
                  <li className="list-group-item">{o.transaction_id}</li>
                  <li className="list-group-item">$ {o.amount}</li>
                  <li className="list-group-item">
                    Ordered By : {o.user.name}
                  </li>
                  <li className="list-group-item">
                    Oredered on : {moment(o.createdAt).fromNow()}
                  </li>
                  <li className="list-group-item">
                    Delivery address : {o.address}
                  </li>
                </ul>

                <h3 className="mt-4 mb-4 font-italic">
                  Total products in order :{o.products.length}
                </h3>
                {o.products.map((p, pIndex) => (
                  <div
                    key={pIndex}
                    className="mb-4"
                    style={{ padding: "20px", border: "1px solid Indigo" }}
                  >
                    {showInput("Product name", p.name)}
                    {showInput("Product price", p.price)}
                    {showInput("Product count", p.count)}
                    {showInput("Product Id", p._id)}
                  </div>
                ))}
              </div>
            )
          })}
          {loadOrders()}
        </div>
      </div>
    </Layout>
  )
}

export default Order
