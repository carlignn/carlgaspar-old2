import React from 'react'
import PropTypes from 'prop-types'

import Icon from './icon'

const toggleIcon = `M 4.4565755,-3.3333333e-7 C 1.9875437,-3.3333333e-7 0,1.9875437 0,4.4565757 v 8.0201813 c 0,2.469032 1.9875437,4.456576 4.4565755,4.456576 h 8.0201825 c 2.469032,0 4.456575,-1.987544 4.456575,-4.456576 V 4.4565757 C 16.933333,1.9875437 14.94579,-3.3333333e-7 12.476758,-3.3333333e-7 Z M 5.7147244,4.682573 12.283832,8.4666663 5.7147244,12.25076 Z`

const Footer = ({ copyrights }) => (
  <footer>
    {copyrights ? (
      <div
        dangerouslySetInnerHTML={{
          __html: copyrights,
        }}
      />
    ) : (
      <>
        <span>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <Icon style={{ margin: `10px 10px` }} size={24} d={toggleIcon} isFooter={true} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <Icon style={{ margin: `10px 10px` }} size={24} d={toggleIcon} isFooter={true} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <Icon style={{ margin: `10px 10px` }} size={24} d={toggleIcon} isFooter={true} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <Icon style={{ margin: `10px 10px` }} size={24} d={toggleIcon} isFooter={true} />
          </a>
          <a href="https://about.me" target="_blank" rel="noopener noreferrer">
            <Icon style={{ margin: `10px 10px` }} size={24} d={toggleIcon} isFooter={true} />
          </a>
          <a href="https://reddit.com" target="_blank" rel="noopener noreferrer">
            <Icon style={{ margin: `10px 10px` }} size={24} d={toggleIcon} isFooter={true} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <Icon style={{ margin: `10px 10px` }} size={24} d={toggleIcon} isFooter={true} />
          </a>
          <a href="https://hackernews.com" target="_blank" rel="noopener noreferrer">
            <Icon style={{ margin: `10px 10px` }} size={24} d={toggleIcon} isFooter={true} />
          </a>
        </span>
        <div>
          <span className="footerCopyrights">
            © 2019 Built with <a href="https://www.gatsbyjs.org">Gatsby</a>
          </span>
          {/*<span className="footerCopyrights">
            Website created by <a href="https://radoslawkoziel.pl">carl gaspar</a>
          </span>*/}
        </div>
      </>
    )}
  </footer>
)

Footer.propTypes = {
  copyrights: PropTypes.string,
}

export default Footer
