import React from "react"
const styles = {
  backgroundImage: `url('/images/mountain-tree.jpg')`,
  backgroundSize: "cover",
  backgroundAttachment: "fixed",
  marginBottom: "1em"
}

const Hero = () => {
  return (
    <section className="hero is-medium is-bold" style={styles}>
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-white">
            Green Mountain
          </h1>
          <h2 className="subtitle has-text-white">
            Walking in the woods, sitting zazen, writing words and code.
          </h2>
        </div>
      </div>
    </section>
  )
}

export default Hero