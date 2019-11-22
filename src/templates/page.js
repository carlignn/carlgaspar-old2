import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Post from '../components/post'

const BlogPostTemplate = ({ data, pageContext }) => {
  const {
    id, title, lastUpdated, slug, image, subtitle, tags, json
  } = data.contentfulBlog
  const { next, previous } = pageContext

  return (
    <Layout>
      <SEO title={title} description={subtitle} />
      <Post
        key={id}
        title={title}
        date={lastUpdated}
        path={slug}
        author={title}
        coverImage={image}
        tags={tags}
        previousPost={previous}
        nextPost={next}
      />
    </Layout>
  )
}

export default BlogPostTemplate

BlogPostTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  pageContext: PropTypes.shape({
    next: PropTypes.object,
    previous: PropTypes.object,
  }),
}

export const pageQuery = graphql`
  query($slug: String!) {
    contentfulBlog(slug: { eq: $slug }) {
      id
      title
      subtitle
      tags
      timeToRead
      published(formatString: "MMMM DD, YYYY")
      lastUpdated(formatString: "MMMM DD, YYYY")
      image {
        fluid(maxWidth: 1800) {
          ...GatsbyContentfulFluid
        }
      }
      content {
        json
      }
    }
  }
`
