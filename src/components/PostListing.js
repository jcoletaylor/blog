import React from 'react'
import PostCard from './PostCard'
const CARD_BLOCKS = 3

const PostListing = ({ postEdges }) => {
  const getPostListSets = () => {
    const needSets = Math.round(postEdges.length / CARD_BLOCKS)
    const range = Array.from({ length: needSets })
    const postListSets = range.map((x, idx) => {
      const rangeStart = (idx * CARD_BLOCKS)
      const rangeEnd = rangeStart + CARD_BLOCKS + 1
      const edges = postEdges.slice(rangeStart, rangeEnd)
      const set = []
      edges.forEach(postEdge => {
        set.push({
          path: postEdge.node.fields.slug,
          tags: postEdge.node.frontmatter.tags,
          categories: postEdge.node.frontmatter.categories,
          cover: postEdge.node.frontmatter.cover,
          title: postEdge.node.frontmatter.title,
          date: postEdge.node.fields.date,
          excerpt: postEdge.node.excerpt,
          timeToRead: postEdge.node.timeToRead
        })
      })
      return set
    })
    return postListSets
  }

  const postListSets = getPostListSets()
  return (
    postListSets.map(set => {
      return (<div className="columns">
        {/* Your post list here. */
        set.map(post => (
          <div className="column is-one-third">
            <PostCard post={post} />
          </div>
        ))}
      </div>)
    })
  )
}

export default PostListing
