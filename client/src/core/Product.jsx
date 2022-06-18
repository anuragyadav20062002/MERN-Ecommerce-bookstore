/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import Layout from "./Layout"
import { read, listRelatedCategories } from "./apiCore"
import Card from "./Card"
import Search from "./Search"

const Product = (props) => {
  const [product, setProduct] = useState({})
  const [realtedProduct, setRelatedProduct] = useState([])
  const [error, setError] = useState(false)

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setProduct(data)
        listRelatedCategories(data._id).then((res) => {
          if (res.error) {
            console.log(res.error)
          } else {
            setRelatedProduct(res)
          }
        })
      }
    })
  }

  useEffect(() => {
    const productId = props.match.params.productId
    loadSingleProduct(productId)
  }, [props])

  return (
    <>
      <Layout
        title={product && product.name}
        description={
          product &&
          product.description &&
          product.description.substring(0, 100)
        }
        className="container-fluid"
      >
        <div className="row">
          <div className="col-8 mb-4">
            {product && product.description && (
              <Card product={product} showViewProductButton={false} />
            )}
          </div>
          <div className="col-4 mb-4">
            <h4>Related Product</h4>
            {realtedProduct.map((r, i) => (
              <div className="mb-3">
                <Card key={i} product={r} />
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Product
