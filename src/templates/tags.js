import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Post from '../components/post'
import Navigation from '../components/navigation'

import '../styles/layout.css'

const Tags = ({
  data,
  pageContext: { nextPagePath, previousPagePath, tag },
}) => {
  const {
    allContentfulBlog: { edges: posts },
  } = data
  
  return (
    <>
      <SEO />
      <Layout>
        <div className="infoBanner">
          Posts with tag: <span>#{tag}</span>
        </div>

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
              tags={tags}
              coverImage={image}
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

Tags.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    nextPagePath: PropTypes.string,
    previousPagePath: PropTypes.string,
  }),
}

export const postsQuery = graphql`
  query ($limit: Int!, $skip: Int!, $tag: String!) {
    allContentfulBlog (
      filter: {tags: {in: [$tag]}}
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

export default Tags
