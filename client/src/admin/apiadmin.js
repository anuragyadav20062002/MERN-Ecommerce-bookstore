import { API } from "../config"

export const createCategory = (userId, token, category) => {
  console.log(category)
  return fetch(`http://localhost:8000/api/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {})
}
export const createProduct = (userId, token, product) => {
  console.log(product)
  return fetch(`http://localhost:8000/api/product/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {})
}
export const getCategories = () => {
  return fetch(`http://localhost:8000/api/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {
      console.log(err)
    })
}
export const listOrders = (userId, token) => {
  return fetch(`${API}/order/list/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}
export const updateOrderStatus = (userId, token, orderId, status) => {
  return fetch(`${API}/order/${orderId}/status/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status, orderId }),
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}

export const getStatusValues = (userId, token) => {
  return fetch(`${API}/order/status-values/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}

//to perform crud operation
//get all products
//get single product
//update single product
//delete single product

export const getProducts = () => {
  return fetch(`http://localhost:8000/api/products?limit=undefined`, {
    method: "GET",
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {
      console.log(err)
    })
}

export const deleteProduct = (productId, userId, token) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}

export const getProduct = (productId) => {
  return fetch(`http://localhost:8000/api/product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {
      console.log(err)
    })
}

export const updateProduct = (productId, userId, token, product) => {
  return fetch(`${API}/product/${productId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => console.log(err))
}
