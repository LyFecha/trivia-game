import React from 'react'
import { Link } from 'react-router-dom'

function NavBar(props) {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link className="nav-link" to="/">About</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/how">How it works</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/stats">Stats</Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/play">Play !</Link>
      </li>
    </ul>
  )
}

export default NavBar
