import React from 'react'

const About = () => (
  <>
    <section className="section">
      <h1 className="is-size-1">About</h1>
      <p>
        Sitting zazen as part of Sanbo Zen is one of the most important parts of my life. 
        Spending time with my partner, my dog and cats, walking in the woods, and riding my bike are right up there as far as importance goes, too.
        I spent a lot of years getting a few degrees that mattered a lot to me at the time. I'm still happy I did it, but it doesn't seem as important as it did.
        Organizing is a big part of my life as well, trying to build grass roots political and economic power for working people. 
        I also write a lot of code, which is frankly a hell of a lot of fun, and is a stable and rewarding career.
      </p>
      <hr />
      <h2 className="is-size-3">Education</h2>
      <ul>
        <li>M.A.O.M. 2016. Dragon Rises College of Oriental Medicine.</li>
        <li>M.A. 2013. University of Florida.Latin American Studies.</li>
        <li>B.A. 2000. Jacksonville University.English and Philosophy.</li>
      </ul>
      <hr />
      <h2 className="is-size-3">Tech Career</h2>
      <p>
        I have been a systems administrator, systems programmer, and web and mobile application developer for over two decades.
        I have extensive experience with microservice development in a variety of languages, and am quite capable with DevOps.
        I regularly work with Ruby, Python, JavaScript/TypeScript, and Rust (though not as often as I want in Rust - I love it).
        I have written API backends - with integrated SPA frontends - against both REST and GraphQL microservices.
        I have extensive experience with Linux system administration, and have launched production - facing Kubernetes clusters in AWS with EKS, and have developed CI / CD pipelines for these systems.
        I am interested in microservice and event driven architectures, and follow Domain Driven Design for this scale of development.
        I enjoy building ETL pipelines and API integrations, and designing DevOps in terraform for building out these systems at an enterprise scale.
        I have been a team lead for in-house and distributed teams, and currently work as the Sr. Software Engineering Manager for <a href="https://fractureme.com">Fracture</a>.
      </p>
      <hr />
      <h2 className="is-size-2">Blog</h2>
      <p>
        This blog is written in <a href="https://reactjs.org/">React</a> and built with <a href="https://www.gatsbyjs.com/">Gatsby</a> and hosted on <a href="https://www.netlify.com/">Netlify</a>.
      </p>
    </section>
  </>
)

export default About
