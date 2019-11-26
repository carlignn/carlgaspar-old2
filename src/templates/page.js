import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Post from '../components/post'

const BlogPostTemplate = ({ data, pageContext }) => {
  const {
    id, title, subtitle, slug, lastUpdated, tags, image, content
  } = data.contentfulBlog
  const { next, previous } = pageContext

  return (
    <Layout>
      <SEO title={title} description={subtitle} />
      <Post
        key={id}
        title={title}
        slug={slug}
        date={lastUpdated}
        image={image}
        content={content}
        tags={tags}
        author={title}
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
      lastUpdated(formatString: "MMMM DD, YYYY")
      image {
        fluid(maxWidth: 1800) {
          ...GatsbyContentfulFluid
        }
      }
      content {
        json
      }
      tags
    }
  }
`
