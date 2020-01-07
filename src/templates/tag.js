import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import SEO from '../components/seo'
import Layout from '../components/layout'
import Post from '../components/post'
import Navigation from '../components/navigation'

import '../styles/layout.css'

const Tag = ({
  data,
  pageContext: { nextPagePath, previousPagePath, numberOfPages, tag },
}) => {
  const {
    allContentfulPost: { edges: posts },
  } = data
  
  return (
    <>
      <SEO title={`Posts with ${tag} Tag`} description={tag} />
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

Tag.propTypes = {
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

export default Tag
