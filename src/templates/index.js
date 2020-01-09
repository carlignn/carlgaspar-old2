import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Post from '../components/post'
import Navigation from '../components/navigation'

const Index = ({ data, pageContext: { nextPagePath, previousPagePath, category } }) => {
  const {
    allContentfulPost: { edges: posts },
  } = data
  
  return (
    <>
      <SEO title={category} />
      <Layout>
        {
          category && (
            <div className="infoBanner">
              {category}
            </div>
          )
        }
        
        {posts.map(({ node }) => {
          const {
            id,
            title,
            subtitle,
            category,
            published,
            slug,
            image,
            tags
          } = node

          return (
            <Post
              key={id}
              title={title}
              subtitle={subtitle}
              category={category}
              date={published}
              slug={slug}
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

Index.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    nextPagePath: PropTypes.string,
    previousPagePath: PropTypes.string,
  }),
}

export const postsQuery = graphql`
  query($limit: Int!, $skip: Int!, $category: String) {
    allContentfulPost (
      filter: { category: {eq: $category} }
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

export default Index
