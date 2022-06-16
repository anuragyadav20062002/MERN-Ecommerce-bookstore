/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import Layout from "./Layout"
import Card from "./Card"

const Shop = () => {
  return (
    <>
      <Layout
        title="Shop Page"
        description="Search and Find Books of your choice"
        className="container-fluid"
      >
        <div className="row">
          <div className="col-4">Left Sidebar</div>
          <div className="col-8">Right Side</div>
        </div>
      </Layout>
    </>
  )
}

export default Shop
