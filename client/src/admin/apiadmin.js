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
