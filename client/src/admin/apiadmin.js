export const createCategory = (userId, token, category) => {
  console.log(userId, token, category)
  return fetch(`http://localhost:8000/api/create/category/${userId}`, {
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
