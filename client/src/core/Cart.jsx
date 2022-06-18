/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Layout from "./Layout"
import { getCart, itemTotal } from "./cartHelpers"
import Card from "./Card"

const Cart = () => {
  const [items, setitems] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    //populating items state when page refreshes
    setitems(getCart())
    setTotal(itemTotal)
  }, [items])

  const showItems = (items) => (
    <div>
      <h2>Your cart has {total} items</h2>
      <hr />
      {items.map((product, i) => (
        <Card
          key={i}
          product={product}
          showAddToCardButton={false}
          cartUpdate={true}
          showRemoveProductButton={true}
        />
      ))}
    </div>
  )

  const noItemsMessage = () => (
    <h2>
      Your Cart Is Empty. <br /> <Link to="/shop">Continue Shopping</Link>
    </h2>
  )

  return (
    <>
      <Layout
        title="Shopping Cart 🛒"
        description="Manage your cart items. Add, remove , checkout or continue shopping!!"
        className="container-fluid"
      >
        <div className="row">
          <div className="col-6">
            {items.length > 0 ? showItems(items) : noItemsMessage()}
          </div>
          <div className="col-6">Check out </div>
        </div>
      </Layout>
    </>
  )
}

export default Cart
