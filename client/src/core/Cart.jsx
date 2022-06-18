/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Layout from "./Layout"
import { getCart } from "./cartHelpers"
import Card from "./Card"

const Cart = () => {
  const [items, setitems] = useState([])

  useEffect(() => {
    //populating items state when page refreshes
    setitems(getCart())
  }, [])

  const showItems = (items) => {
    return (
      <div>
        <h2>Your Cart Has {`${items.length}`} items</h2>
        <hr />
        {items.map((item, i) => (
          <Card key={i} product={item} />
        ))}
      </div>
    )
  }

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
            {items.length > 0 ? showItems() : noItemsMessage()}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Cart
