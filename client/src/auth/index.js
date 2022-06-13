export const signup = (user) => {
  console.log(user)
  return fetch(`http://localhost:8000/api/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json()
    })
    .catch((err) => {})
}
