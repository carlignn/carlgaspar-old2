import React from "react"

import SEO from "../components/seo"
import Layout from "../components/layout"

const Contact = () => {
  return (
    <>
      <SEO title={`Contact`} />
      <Layout>
        <div className="infoBanner">{`Contact`}</div>
        <form
          className="contact-container"
          name="contact"
          method="POST"
          data-netlify-recaptcha="true"
          data-netlify="true"
        >
          <div className="contact-container-name">
            <input
              className="contact-name"
              type="text"
              placeholder="Name..."
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              name="name"
            />
          </div>
          <div className="contact-container-email">
            <input
              className="contact-email"
              type="text"
              placeholder="Email..."
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              name="email"
            />
          </div>
          <div className="contact-container-message">
            <textarea
              className="contact-message"
              placeholder="Message..."
              autocomplete="off"
              autocorrect="off"
              autocapitalize="off"
              spellcheck="false"
              name="message"
              rows="10"
            ></textarea>
          </div>
          <div data-netlify-recaptcha="true"></div>
          <div className="contact-submit-container">
            <button className="contact-submit" type="submit">
              Send
            </button>
          </div>
        </form>
      </Layout>
    </>
  )
}

export default Contact
