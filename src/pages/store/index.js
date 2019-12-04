import React from 'react'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'

import SEO from '../../components/seo'
import Layout from '../../components/layout'

import style from '../../styles/post.module.css'

class Store extends React.Component {
  componentDidMount() {
    this.stripe = window.Stripe('pk_test_C7PAGShUPIYrMivdZxZLrAld00WrNqstWH')
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
          successUrl: `https://4c10579fc3bd4cc3b5bb0cbca1133e1a.vfs.cloud9.ap-southeast-1.amazonaws.com/store/success`,
          cancelUrl: `https://4c10579fc3bd4cc3b5bb0cbca1133e1a.vfs.cloud9.ap-southeast-1.amazonaws.com/store/canceled`,
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
    const { id, currency, price, name } = this.props
    
    const priceFloat = (price/100).toFixed(2)
    const formattedPrice = Intl.NumberFormat('en-US', { style: 'currency', currency }).format(priceFloat)
  
    return (
      <div className={style.post}>
        <div className={style.postContent}>
          <h1 className={style.title}>{name}</h1>
          <div className={style.meta}>
            {formattedPrice}
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
        allStripeSku {
          edges {
            node {
              id
              currency
              price
              attributes {
                name
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
        <div className="infoBanner">Products List</div>
        {data.allStripeSku.edges.map(({ node: sku }) => (
          <Store
            key={sku.id}
            id={sku.id}
            currency={sku.currency}
            price={sku.price}
            name={sku.attributes.name}
          />
        ))}
        </Layout>
      </>
    )}
  />
)