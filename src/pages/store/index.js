import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { StaticQuery, graphql } from 'gatsby'

import SEO from '../../components/seo'
import Layout from '../../components/layout'

import style from '../../styles/post.module.css'

class Store extends React.Component {
  componentDidMount() { // Constructor getting error on window.
    this.stripe = window.Stripe(process.env.STRIPE_RESTRICTED_KEY)
  }
  
  handleSubmit(sku) {
    return event => {
      event.preventDefault()
      this.stripe.redirectToCheckout({
          items: [{sku, quantity: 1}],
    
          // Do not rely on the redirect to the successUrl for fulfilling
          // purchases, customers may not always reach the success_url after
          // a successful payment.
          // Instead use one of the strategies described in
          // https://stripe.com/docs/payments/checkout/fulfillment
          successUrl: `${process.env.WEBSITE_URL}/store/success`,
          cancelUrl: `${process.env.WEBSITE_URL}/store/canceled`,
        })
        .then(function (result) {
          if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer.
            //var displayError = document.getElementById('error-message');
            //displayError.textContent = result.error.message;
            console.log(result.error.message)
          }
        })
    }
  }
  
  render () {
    const { id, currency, price, name, image } = this.props
    
    const priceFloat = (price/100).toFixed(2)
    const formattedPrice = Intl.NumberFormat('en-US', { style: 'currency', currency }).format(priceFloat)
  
    return (
      <div className={style.post}>
        {image && (
          <Img
            fixed={image}
            className={style.image}
          />
        )}
          
        <div className={style.postContent}>
          <h1 className={style.title}>{name}</h1>
          <div className={style.meta}>
             Store — {formattedPrice}
          </div>
          
          <form onSubmit={this.handleSubmit(id)}>
            <button type='submit' className={style.readMore}>Buy now →</button>
          </form>
          
        </div>
      </div>
    )
  }
}

export default () => (
  <StaticQuery
    query = {graphql`
      {
        allStripeSku (sort: {fields: updated, order: DESC}) {
          edges {
            node {
              id
              attributes {
                name
              }
              currency
              price
              updated
              localFiles {
                childImageSharp {
                  fixed(width: 125, height: 125) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
      }
    `}
    render = {data => (
      <>
        <SEO />
        <Layout>
        <div className="infoBanner">Store</div>
        {data.allStripeSku.edges.map(({ node: sku }) => (
          <Store
            key={sku.id}
            id={sku.id}
            currency={sku.currency}
            price={sku.price}
            name={sku.attributes.name}
            image={sku.localFiles[0].childImageSharp.fixed}
          />
        ))}
        </Layout>
      </>
    )}
  />
)