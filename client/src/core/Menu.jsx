import React from "react"
import { Link, withRouter } from "react-router-dom"
import { signout } from "../auth"

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#00FFAB" }
  } else {
    return { color: "#ffffff" }
  }
}

const Menu = ({ history }) => {
  return (
    <>
      <ul className="nav nav-tabs bg-dark">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/signin")}
            to="/signin"
          >
            SignIn
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/signup")}
            to="/signup"
          >
            SignUp
          </Link>
        </li>
        <li className="nav-item">
          <span
            className="nav-link"
            style={{ cursor: "pointer", color: "white" }}
            onClick={() =>
              signout(() => {
                history.push("/")
              })
            }
          >
            SignOut
          </span>
        </li>
      </ul>
    </>
  )
}

export default withRouter(Menu)
