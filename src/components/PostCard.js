import React from "react"
import { Link } from 'gatsby'

const getCardCover = (post) => {
  if (post.cover) {
    return (
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={post.cover} alt={post.slug} />
        </figure>
      </div>
    )
  }
  return ''
}

const Post = (props) => {
  const { post } = props
  return (
    <div className="card">
      {getCardCover(post)}
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