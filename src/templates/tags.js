import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Post from '../components/post'
import Navigation from '../components/navigation'

import '../styles/layout.css'

const Tags = ({ data }) => {
  const {
    allContentfulPost: { group: tags },
  } = data
  
  return (
    <>
      <SEO />
      <Layout>
        <div className="infoBanner">All Tags</div>

        {tags.map(tag => {
          const {
            fieldValue
          } = tag

          return (
            <div>
              {fieldValue}
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
