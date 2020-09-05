import React, { useState } from 'react'
import { Link } from 'gatsby'
import config from '../../data/SiteConfig'
import Categories from './Categories'

const Header = () => {
  const [navBurgerActive, setNavBurgerActive] = useState(false)
  return (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link to="/" className="navbar-item">
        <span className="icon has-text-primary">
          <i className="fas fa-mountain" />
        </span>&nbsp;
        <span className="has-text-weight-bold">{config.siteTitle}</span>
      </Link>

      <a
        role="button"
        onClick={() => {
          setNavBurgerActive(!navBurgerActive)
        }}
        className={`navbar-burger burger ${navBurgerActive ? 'is-active': ''}`}
        aria-label="menu" 
        aria-expanded="false" 
        data-target="topNav"
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div id="topNav"
      className={`navbar-menu ${navBurgerActive ? 'is-active' : ''}`}>
      <div className="navbar-end">
        <div className="navbar-item">
          <Categories />
        </div>
        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">Follow</a>
          <div className="navbar-dropdown">
            <a
              href={`https://twitter.com/${config.userTwitter}`}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-item"
            >
              Twitter
            </a>
            <a
              href={`https://github.com/${config.userGitHub}`}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-item"
            >
              GitHub
            </a>
            <a
              href={config.siteUrl + config.siteRss}
              target="_blank"
              rel="noopener noreferrer"
              className="navbar-item"
            >
              RSS
            </a>
          </div>
        </div>
        <div className="navbar-item">
          <Link to="/about" className="navbar-item">
            About
          </Link>
          <Link to="/contact" className="navbar-item">
            Contact
          </Link>
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Header
