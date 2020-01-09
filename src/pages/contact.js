import React from "react"

import SEO from "../components/seo"
import Layout from "../components/layout"

const Contact = () => {
  return (
    <>
      <SEO title={`Contact`} />
      <Layout>
        <div className="infoBanner">{`Contact`}</div>
        <form name="contact" method="POST" data-netlify-recaptcha="true" data-netlify="true">
          <p>
            <label>Your Name: <input type="text" name="name" /></label>   
          </p>
          <p>
            <label>Your Email: <input type="email" name="email" /></label>
          </p>
          <p>
            <label>Message: <textarea name="message"></textarea></label>
          </p>
          <div data-netlify-recaptcha="true"></div>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
      </Layout>
    </>
  )
}

export default Contact
