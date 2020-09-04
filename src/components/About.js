import React from 'react'
import config from '../../data/SiteConfig'

const About = () => (
  <>
    <h1>{config.siteTitle}</h1>
    <p>
      {config.siteDescription}
    </p>
  </>
)

export default About
