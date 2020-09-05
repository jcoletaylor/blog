import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../layout'
import config from '../../data/SiteConfig'

const ContactPage = () => (
  <Layout>
    <main>
      <Helmet title={`Contact | ${config.siteTitle}`} />
      <h1 className="is-size-1">Contact us</h1>
      <p>Feel free to <a href="mailto:pete.jc.taylor@hey.com">email me</a></p>
    </main>
  </Layout>
)
export default ContactPage
