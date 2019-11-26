const { paginate } = require('gatsby-awesome-pagination')
const { forEach, uniq, filter, not, isNil, flatMap } = require('rambdax')
const path = require('path')
const { toKebabCase } = require('./src/helpers')

const pageTypeRegex = /src\/(.*?)\//
const getType = node => node.fileAbsolutePath.match(pageTypeRegex)[1]

const pageTemplate = path.resolve(`./src/templates/page.js`)
const indexTemplate = path.resolve(`./src/templates/index.js`)
const tagsTemplate = path.resolve(`./src/templates/tags.js`)

exports.createPages = ({ actions, graphql, getNodes }) => {
  const { createPage } = actions
  const allNodes = getNodes()

  return graphql(`
    {
      allContentfulPost (
        sort: { fields: [published], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            slug
            title
            tags
          }
        }
        group(field: tags, limit: 1000) {
          fieldValue
          totalCount
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
      allContentfulPost: { edges: markdownPages, group: markdownTags },
      site: { siteMetadata },
    } = result.data
    
    /*const sortedPages = markdownPages.sort((pageA, pageB) => {
      const typeA = getType(pageA.node)
      const typeB = getType(pageB.node)

      return (typeA > typeB) - (typeA < typeB)
    })*/

    /*const posts = allNodes.filter(
      ({ internal, fileAbsolutePath }) =>
        internal.type === 'MarkdownRemark' &&
        fileAbsolutePath.indexOf('/posts/') !== -1,
    )*/
    
    

    // Create posts index with pagination
    paginate({
      createPage,
      items: markdownPages,
      component: indexTemplate,
      itemsPerFirstPage: siteMetadata.postsPerFirstPage,
      itemsPerPage: siteMetadata.postsPerPage,
      pathPrefix: '/',
    })

    // Create each markdown page and post
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

    // Create tag pages
    /*const tags = filter(
      tag => not(isNil(tag)),
      uniq(flatMap(post => post.tags.title, markdownPages)),
    )*/
  
    markdownTags.forEach(tag => {
      paginate({
        createPage,
        items: markdownTags,
        component: tagsTemplate,
        itemsPerFirstPage: 100,
        itemsPerPage: 100,
        pathPrefix: `/tag/${tag.fieldValue}`,
        context: {
          tag: tag.fieldValue
        },
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