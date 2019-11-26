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
    allContentfulPost: { edges: posts },
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
            title,
            subtitle,
            category,
            slug,
            published,
            image,
            tags,
            excerpt
          } = node

          return (
            <Post
              key={id}
              title={title}
              subtitle={subtitle}
              category={category}
              slug={slug}
              date={published}
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

Tags.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    nextPagePath: PropTypes.string,
    previousPagePath: PropTypes.string,
  }),
}

export const postsQuery = graphql`
  query ($limit: Int!, $skip: Int!, $tag: String!) {
    allContentfulPost (
      filter: {tags: {in: [$tag]}}
      sort: { fields: [published], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          title
          subtitle
          category
          slug
          published(formatString: "MMMM DD, YYYY")
          image {
            fluid(maxWidth: 800) {
              ...GatsbyContentfulFluid
            }
          }
          tags
        }
      }
    }
  }
`

export default Tags
