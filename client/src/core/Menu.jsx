import React, { Fragment } from "react"
import { Link, withRouter } from "react-router-dom"
import { signout, isAuthenticated } from "../auth"
import "../styles.css"
import { itemTotal } from "./cartHelpers"

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
            style={isActive(history, "/shop")}
            to="/shop"
          >
            Shop
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(history, "/cart")}
            to="/cart"
          >
            Cart{" "}
            <sup>
              <small className="cart-badge">{itemTotal()}</small>
            </sup>
          </Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/user/dashboard")}
              to="/user/dashboard"
            >
              DashBoard
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, "/admin/dashboard")}
              to="/admin/dashboard"
            >
              DashBoard
            </Link>
          </li>
        )}

        {/* if user is autheticated(loggedin) then signin and signup will not show else will show */}

        {!isAuthenticated() && (
          <Fragment>
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
          </Fragment>
        )}

        {isAuthenticated() && (
          <div>
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
          </div>
        )}
      </ul>
    </>
  )
}

export default withRouter(Menu)
