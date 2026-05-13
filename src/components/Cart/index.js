import {Component} from 'react'
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Cart extends Component {
  state = {
    cartItems: [],
  }

  componentDidMount() {
    const cartItems = JSON.parse(localStorage.getItem('cartData')) || []
    this.setState({cartItems})
  }

  renderEmptyCartView = () => (
    <div className="cart-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"
        alt="cart"
        className="cart-img"
      />
    </div>
  )

  renderCartItemsView = () => {
    const {cartItems} = this.state
    const itemsCount = cartItems.reduce(
      (total, eachItem) => total + eachItem.quantity,
      0,
    )
    const orderTotal = cartItems.reduce(
      (total, eachItem) => total + eachItem.price * eachItem.quantity,
      0,
    )

    return (
      <div className="cart-items-container">
        <h1 className="cart-heading">My Cart</h1>
        <div className="cart-content-container">
          <ul className="cart-list">
            {cartItems.map(eachItem => (
              <li className="cart-item" key={eachItem.id}>
                <img
                  src={eachItem.imageUrl}
                  alt={eachItem.title}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <p className="cart-item-title">{eachItem.title}</p>
                  <p className="cart-item-brand">by {eachItem.brand}</p>
                  <p className="cart-item-meta">
                    Qty: {eachItem.quantity} | Rs {eachItem.price}/-
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary-container">
            <h2 className="cart-summary-heading">Order Summary</h2>
            <div className="cart-summary-row">
              <p>Items</p>
              <p>{itemsCount}</p>
            </div>
            <div className="cart-summary-row cart-total-row">
              <p>Total</p>
              <p>Rs {orderTotal}/-</p>
            </div>
            <Link to="/checkout" className="cart-checkout-link">
              <button type="button" className="cart-checkout-button">
                Checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {cartItems} = this.state
    const hasCartItems = cartItems.length > 0

    return (
      <>
        <Header />
        {hasCartItems ? this.renderCartItemsView() : this.renderEmptyCartView()}
      </>
    )
  }
}

export default Cart
