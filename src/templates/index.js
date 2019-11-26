import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Post from '../components/post'
import Navigation from '../components/navigation'

const Index = ({ data, pageContext: { nextPagePath, previousPagePath } }) => {
  const {
    allContentfulBlog: { edges: posts },
  } = data
  
  return (
    <>
      <SEO />
      <Layout>
        {posts.map(({ node }) => {
          const {
            id,
            title,
            subtitle,
            lastUpdated,
            slug,
            image,
            tags
          } = node

          return (
            <Post
              key={id}
              title={title}
              subtitle={subtitle}
              date={lastUpdated}
              slug={slug}
              image={image}
              tags={tags}
              author={title}
            />
          )
        })}

        <Navigation
          previousPath={previousPagePath}
          previousLabel="Newer posts"
          nextPath={nextPagePath}
          nextLabel="Older posts"
        />
      </Layout>
    </>
  )
}

Index.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    nextPagePath: PropTypes.string,
    previousPagePath: PropTypes.string,
  }),
}

export const postsQuery = graphql`
  query($limit: Int!, $skip: Int!) {
    allContentfulBlog (
      sort: { fields: [lastUpdated], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          title
          subtitle
          slug
          lastUpdated(formatString: "MMMM DD, YYYY")
          tags
          image {
            fluid(maxWidth: 800) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`

export default Index
