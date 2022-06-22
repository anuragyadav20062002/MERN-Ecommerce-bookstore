/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import Layout from "../core/Layout"
import { isAuthenticated } from "../auth"
import { Link } from "react-router-dom"
import { getProducts, deleteProduct } from "./apiadmin"

const ManageProducts = () => {
  const [products, setProducts] = useState([])
  const { user, token } = isAuthenticated()

  const loadProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setProducts(data)
      }
    })
  }

  const destroy = (productId) => {
    deleteProduct(productId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        loadProducts()
      }
    })
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <>
      <Layout
        title="Manage Products"
        description="You can perform CRUD operations on products here"
        className="container"
      >
        <div className="row">
          <div className="col-12">
            <h2>Total Products {products.length}</h2>
            <hr />
            <ul className="list-group">
              {products.map((p, i) => (
                <li
                  key={i}
                  className="list-group-item d-flex justify-content align-tems center"
                >
                  <strong className="mr-2">{p.name}</strong>
                  <Link to={`/admin/product/update/${p._id}`}>
                    <span className="badge badge-warning badge-pill mr-2">
                      Update
                    </span>
                  </Link>
                  <span
                    onClick={() => destroy(p._id)}
                    className="badge badge-danger badge-pill"
                    style={{ cursor: "pointer" }}
                  >
                    Remove
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  )
}

export default ManageProducts
