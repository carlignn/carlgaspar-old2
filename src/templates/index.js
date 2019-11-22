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
            subtitle,
            title,
            lastUpdated,
            slug,
            image,
            excerpt,
            tags,
          } = node

          return (
            <Post
              key={id}
              title={title}
              date={lastUpdated}
              path={slug}
              author={title}
              coverImage={image}
              tags={tags}
              excerpt={subtitle}
              
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
          subtitle
          title
          lastUpdated(formatString: "MMMM DD, YYYY")
          slug
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
