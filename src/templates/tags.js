import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Post from '../components/post'
import Navigation from '../components/navigation'

import style from '../styles/post.module.css'

const Tags = ({ data }) => {
  const {
    allContentfulPost: { group: tags },
  } = data
  
  return (
    <>
      <SEO title={`Tags`} />
      <Layout>
        <div className="infoBanner">Tags</div>
        {tags.map(tag => {
          const { fieldValue } = tag
          return (
            <div>
              <Link to={`/tag/${fieldValue}/`} key={fieldValue}>
                <span className={style.tag}>{fieldValue}</span>
              </Link>
            </div>
          )
        })}
      </Layout>
    </>
  )
}

Tags.propTypes = {
  data: PropTypes.object.isRequired,
}

export const postsQuery = graphql`
  query {
    allContentfulPost {
      group (field: tags, limit: 1000) {
        fieldValue
      }
    }
  }
`

export default Tags
