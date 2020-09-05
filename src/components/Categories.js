import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import _ from 'lodash'

const Categories = props => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(limit: 2000) {
        group(field: frontmatter___categories) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  return (
    <>
      {data.allMarkdownRemark.group.map(category => (
        <Link
          to={`/${_.kebabCase(category.fieldValue)}`}
          key={category.fieldValue}
          className="navbar-item is-size-7"
        >
          {category.fieldValue} ({category.totalCount})
        </Link>
      ))}
    </>
  )
}

export default Categories
