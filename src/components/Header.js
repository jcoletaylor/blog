import React from 'react'
import { Link } from 'gatsby'
import config from '../../data/SiteConfig'
import Categories from './Categories'
import styles from './Header.module.scss'

const Header = () => (
  <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <Link to="/" className="navbar-item" activeClassName={styles.activeNav}>
        <span className="icon">
          <i className="fas fa-mountain" />
        </span>&nbsp;
        {config.siteTitle}
      </Link>

      <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </a>
    </div>

    <div id="topNav" className="navbar-menu">
      <div className="navbar-end">
        <div className="navbar-item has-dropdown is-hoverable">
          <a className="navbar-link">Categories</a>
          <div className="navbar-dropdown">
            <Categories activeClassName={styles.activeNav} />
          </div>
        </div>
        <div className="navbar-item">
          <Link to="/about" className="navbar-item" activeClassName={styles.activeNav}>
            About
          </Link>
          <Link to="/contact" className="navbar-item" activeClassName={styles.activeNav}>
            Contact
          </Link>
        </div>
      </div>
    </div>
  </nav>
)

export default Header
