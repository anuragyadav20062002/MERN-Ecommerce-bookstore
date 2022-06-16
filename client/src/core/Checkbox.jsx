/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"

const Checkbox = ({ categories, handleFilters }) => {
  const [checked, setChecked] = useState([])

  const handleToggle = (c) => () => {
    const currentCategoryId = checked.indexOf(c)

    //if category given id is not present in state returns -1 else first index

    const newcheckedCategoryId = [...checked]

    //if currently checked was not present then push else pull/take off
    if (currentCategoryId === -1) {
      newcheckedCategoryId.push(c)
    } else {
      newcheckedCategoryId.splice(currentCategoryId, 1)
    }

    // console.log(newcheckedCategoryId)
    setChecked(newcheckedCategoryId)
    handleFilters(newcheckedCategoryId)
  }

  return categories.map((category, i) => (
    <li key={i} className="list-unstyled">
      <input
        onChange={handleToggle(category._id)}
        type="checkbox"
        value={checked.indexOf(category._id === -1)}
        className="form-check-input"
      />
      <label className="form-check-label">{category.name}</label>
    </li>
  ))
}

export default Checkbox
