import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"
import { Highlight } from "react-instantsearch-dom"

import style from "../styles/post.module.css"

const SearchPost = ({ hit }) => {
  const { slug, tags } = hit.node

  return (
    <div className={style.post}>
      <div className={style.postContent}>
        <h1 className={style.title}>
          <Link to={`/${slug}`}>
            <Highlight attribute="node.title" hit={hit} tagName="mark" />
          </Link>
        </h1>
        <div className={style.meta}>
          <Highlight attribute="node.category" hit={hit} tagName="mark" />
          {" — "}
          <Highlight attribute="node.published" hit={hit} tagName="mark" />
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
        
        <p>
          <Highlight attribute="node.subtitle" hit={hit} tagName="mark" />
        </p>
        <Link to={`/${slug}`} className={style.readMore}>
          Read more →
        </Link>
      </div>
    </div>
  )
}

SearchPost.propTypes = {
  hit: PropTypes.object
}

export default SearchPost
