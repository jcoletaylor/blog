import React from 'react'
import Helmet from 'react-helmet'
import Footer from '../components/Footer'
import Header from '../components/Header'
import config from '../../data/SiteConfig'
import styles from './index.module.scss'

const MainLayout = ({ children }) => (
  <>
    <Header />
    <Helmet>
      <meta name="description" content={config.siteDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.0/css/bulma.min.css" type="text/css" media="all" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css" type="text/css" media="all" />
    </Helmet>
    {children}
    <Footer />
  </>
)

export default MainLayout
