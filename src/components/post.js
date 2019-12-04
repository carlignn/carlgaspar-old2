import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"

import Navigation from './navigation'
import { toKebabCase, toCamelCase } from '../helpers'

import style from '../styles/post.module.css'

const Post = ({
  title,
  subtitle,
  category,
  slug,
  image,
  date,
  content,
  tags,
  previousPost,
  nextPost,
}) => {
  
  const previousPath = previousPost && previousPost.slug
  const previousLabel = previousPost && previousPost.title
  const nextPath = nextPost && nextPost.slug
  const nextLabel = nextPost && nextPost.title
  
  return (
    <div className={style.post}>
      <div className={style.postContent}>
        <h1 className={style.title}>
          {subtitle ? <Link to={`/${slug}`}>{title}</Link> : title}
        </h1>
        <div className={style.meta}>
          {category + " — " + date}
          {tags ? (
            <div className={style.tags}>
              {tags.map(tag => (
                <Link to={`/tag/${tag}/`} key={tag}>
                  <span className={style.tag}>#{tag}</span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>

        {image && (
          <Img
            fluid={image.fluid}
            className={style.image}
          />
        )}

        {subtitle ? (
          <>
            <p>{subtitle}</p>
            <Link to={`/${slug}`} className={style.readMore}>
              Read more →
            </Link>
          </>
        ) : (
          <>
            <div
              dangerouslySetInnerHTML={{
                __html: documentToHtmlString(content.json)
              }}
            />
            <Navigation
              previousPath={previousPath}
              previousLabel={previousLabel}
              nextPath={nextPath}
              nextLabel={nextLabel}
            />
          </>
        )}
      </div>
    </div>
  )
}

Post.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  category: PropTypes.string,
  slug: PropTypes.string,
  image: PropTypes.object,
  date: PropTypes.string,
  content: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  previousPost: PropTypes.object,
  nextPost: PropTypes.object,
}

export default Post
