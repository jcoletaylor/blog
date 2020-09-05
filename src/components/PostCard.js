import React from "react"
import { Link } from 'gatsby'

const Post = (props) => {
  const { post } = props
  return (
    <div className="card">
      <div className="card-header">
        <div className="card-header-title">
          <Link to={post.path} key={post.title}>
            {post.title}
          </Link>
        </div>
      </div>
      <div className="card-content">
        <div className="is-size-7">
          {post.date} &mdash; <span>{post.categories ? post.categories.join(' / ') : ''}</span>{' '}
          &mdash; {post.timeToRead} Min Read{' '}
        </div>
        <p>{post.excerpt}</p>
      </div>
    </div>
  )
}

export default Post