import React from 'react'
import './header.css'
import logo from '../../assest/imgases/Logo.svg'
import { Link } from 'react-scroll'
function Header() {
  return (
    <header className="header">
      <div className="header_block content_center ">
        <figure id="figure">
          <img src={logo} alt="logo" loading="lazy" />
        </figure>
        <div className="header_btn">
          <button className="p1 btn">
            {' '}
            <Link to="user_list" smooth={true} offset={50}>
              Users
            </Link>
          </button>
          <button className="p1 btn">
            <Link to="user_create" smooth={true} offset={50}>
              Sing up
            </Link>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
