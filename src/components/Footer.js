import React from 'react'
import styles from './Footer.module.scss'
import config from '../../data/SiteConfig'

const Footer = () => (
  <footer>
    <div className={styles.container}>
      <div>
        <a
          href={`https://twitter.com/${config.userTwitter}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Twitter
        </a>
        <a
          href={`https://github.com/${config.userGitHub}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a
          href={config.siteUrl + config.siteRss}
          target="_blank"
          rel="noopener noreferrer"
        >
          RSS
        </a>
      </div>
      <div className={styles.copyright}>
        <a rel="license" href="http://creativecommons.org/licenses/by/4.0/">
          <img alt="Creative Commons License" style={{ borderWidth: 0 }} src="https://mirrors.creativecommons.org/presskit/buttons/80x15/svg/by.svg" />
        </a>
      </div>
    </div>
  </footer>
)

export default Footer
