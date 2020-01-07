import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import SEO from '../components/seo'
import Layout from '../components/layout'
import Post from '../components/post'

const BlogPostTemplate = ({ data, pageContext }) => {
  const {
    id, title, subtitle, category, slug, published, tags, image, content
  } = data.contentfulPost
  const { next, previous } = pageContext

  return (
    <Layout>
      <SEO title={category === "Portfolio" ? "Portfolio" : title} description={subtitle} />
      <Post
        key={id}
        title={title}
        category={category}
        slug={slug}
        date={published}
        image={image}
        content={content}
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
    contentfulPost(slug: { eq: $slug }) {
      id
      title
      subtitle
      category
      published(formatString: "MMMM DD, YYYY")
      image {
        fluid(maxWidth: 1200) {
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
