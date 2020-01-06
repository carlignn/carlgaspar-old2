const { paginate } = require('gatsby-awesome-pagination')
const path = require('path')

const pageTemplate = path.resolve(`./src/templates/page.js`)
const indexTemplate = path.resolve(`./src/templates/index.js`)
const tagTemplate = path.resolve(`./src/templates/tag.js`)
const tagsTemplate = path.resolve(`./src/templates/tags.js`)

exports.createPages = ({ actions, graphql, getNodes }) => {
  const { createPage } = actions

  return graphql(`
    {
      allContentfulPost (
        sort: { fields: [published], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            title
            slug
            tags
          }
        }
        tags: group(field: tags) {
          fieldValue
        }
        category: group(field: category, limit: 1000) {
          fieldValue
        }
      }
      site {
        siteMetadata {
          postsPerFirstPage
          postsPerPage
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors)
    }

    const {
      allContentfulPost: {
        edges: markdownPages,
        tags: markdownTags,
        category: markdownCategory
      },
      site: { siteMetadata }
    } = result.data


    // Create posts index with pagination
    paginate({
      createPage,
      items: markdownPages,
      component: indexTemplate,
      itemsPerFirstPage: siteMetadata.postsPerFirstPage,
      itemsPerPage: siteMetadata.postsPerPage,
      pathPrefix: '/',
    })

    // Create each post with pagination (not awesome-paginate)
    markdownPages.forEach((post, index) => {
      const previous = index === markdownPages.length - 1 ? null : markdownPages[index + 1].node
      const next = index === 0 ? null : markdownPages[index - 1].node

      createPage({
        path: post.node.slug,
        component: pageTemplate,
        context: {
          slug: post.node.slug,
          previous,
          next,
        },
      })
    })
    
    
    // Create tags index
    createPage({
      component: tagsTemplate,
      path: '/tags',
    })
    
    // Create each tag with pagination
    markdownTags.forEach(tag => {
      paginate({
        createPage,
        items: markdownTags,
        component: tagTemplate,
        itemsPerFirstPage: siteMetadata.postsPerFirstPage,
        itemsPerPage: siteMetadata.postsPerPage,
        pathPrefix: `/tag/${tag.fieldValue}`,
        context: {
          tag: tag.fieldValue
        },
      })
    })
    
    
    // Create each category index with pagination
    markdownCategory.forEach(category => {
      paginate({
        createPage,
        items: markdownCategory,
        component: indexTemplate,
        itemsPerFirstPage: siteMetadata.postsPerFirstPage,
        itemsPerPage: siteMetadata.postsPerPage,
        pathPrefix: `/${category.fieldValue.toLowerCase()}`,
        context: {
          category: category.fieldValue
        }
      })
    })
  })
}
/*
exports.sourceNodes = ({ actions }) => {
  const { createTypes } = actions
  const typeDefs = `
    type MarkdownRemark implements Node {
      frontmatter: Frontmatter!
    }

    type Frontmatter {
      title: String!
      author: String
      date: Date!
      path: String!
      tags: [String!]
      excerpt: String
      coverImage: File
    }
  `
  createTypes(typeDefs)
}
*/