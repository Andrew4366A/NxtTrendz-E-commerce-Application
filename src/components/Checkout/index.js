import {Component} from 'react'
import {Link} from 'react-router-dom'
import {FaCheckCircle, FaCreditCard, FaTruck} from 'react-icons/fa'

import Header from '../Header'
import './index.css'

const deliveryOptions = [
  {
    id: 'standard',
    label: 'Standard Delivery',
    description: 'Arrives in 4-6 business days',
    fee: 0,
  },
  {
    id: 'express',
    label: 'Express Delivery',
    description: 'Arrives in 2-3 business days',
    fee: 149,
  },
  {
    id: 'priority',
    label: 'Priority Delivery',
    description: 'Arrives by tomorrow',
    fee: 299,
  },
]

class Checkout extends Component {
  state = {
    cartItems: [],
    fullName: '',
    mobileNumber: '',
    addressLine: '',
    city: '',
    stateName: '',
    pinCode: '',
    deliveryMethod: deliveryOptions[0].id,
    errorMsg: '',
    isOrderPlaced: false,
  }

  componentDidMount() {
    const cartItems = JSON.parse(localStorage.getItem('cartData')) || []
    const savedAddress = JSON.parse(localStorage.getItem('shippingAddress'))

    if (savedAddress !== null) {
      this.setState({cartItems, ...savedAddress})
    } else {
      this.setState({cartItems})
    }
  }

  getSelectedDeliveryOption = () => {
    const {deliveryMethod} = this.state
    return (
      deliveryOptions.find(eachOption => eachOption.id === deliveryMethod) ||
      deliveryOptions[0]
    )
  }

  getItemsTotal = () => {
    const {cartItems} = this.state
    return cartItems.reduce(
      (total, eachItem) => total + eachItem.price * eachItem.quantity,
      0,
    )
  }

  onChangeInput = event => {
    this.setState({[event.target.name]: event.target.value, errorMsg: ''})
  }

  onChangeDeliveryMethod = event => {
    this.setState({deliveryMethod: event.target.value})
  }

  isFormValid = () => {
    const {fullName, mobileNumber, addressLine, city, stateName, pinCode} =
      this.state

    return (
      fullName.trim() !== '' &&
      mobileNumber.trim() !== '' &&
      addressLine.trim() !== '' &&
      city.trim() !== '' &&
      stateName.trim() !== '' &&
      pinCode.trim() !== ''
    )
  }

  onSubmitCheckout = event => {
    event.preventDefault()

    if (!this.isFormValid()) {
      this.setState({errorMsg: 'Please enter all shipping details.'})
      return
    }

    const {
      cartItems,
      fullName,
      mobileNumber,
      addressLine,
      city,
      stateName,
      pinCode,
      deliveryMethod,
    } = this.state
    const selectedDeliveryOption = this.getSelectedDeliveryOption()
    const orderTotal = this.getItemsTotal() + selectedDeliveryOption.fee
    const orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || []
    const orderId = `NT${Date.now()}`
    const completedOrder = {
      orderId,
      orderDate: new Date().toISOString(),
      items: cartItems.map(eachItem => ({
        id: eachItem.id,
        name: eachItem.title,
        imageUrl: eachItem.imageUrl,
        price: eachItem.price,
        quantity: eachItem.quantity,
      })),
      deliveryAddress: {
        name: fullName,
        street: addressLine,
        city: stateName.trim() === '' ? city : `${city}, ${stateName}`,
        zip: pinCode,
      },
      totalAmount: orderTotal,
      status: 'Confirmed',
    }

    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        mobileNumber,
        addressLine,
        city,
        stateName,
        pinCode,
        deliveryMethod,
      }),
    )
    localStorage.setItem(
      'orderHistory',
      JSON.stringify([completedOrder, ...orderHistory]),
    )
    localStorage.removeItem('cartData')
    this.setState({cartItems: [], isOrderPlaced: true})
  }

  renderEmptyCheckoutView = () => (
    <div className="checkout-empty-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-img.png"
        alt="empty cart"
        className="checkout-empty-img"
      />
      <h1 className="checkout-empty-heading">Your cart is empty</h1>
      <Link to="/products" className="checkout-link">
        <button type="button" className="checkout-primary-button">
          Continue Shopping
        </button>
      </Link>
    </div>
  )

  renderOrderPlacedView = () => (
    <div className="checkout-success-container">
      <FaCheckCircle className="checkout-success-icon" />
      <h1 className="checkout-success-heading">Order Placed Successfully</h1>
      <p className="checkout-success-description">
        Your shipping details are saved for your next checkout.
      </p>
      <Link to="/orders" className="checkout-link">
        <button type="button" className="checkout-primary-button">
          View Order History
        </button>
      </Link>
      <Link to="/products" className="checkout-link checkout-shop-more-link">
        <button type="button" className="checkout-primary-button">
          Shop More
        </button>
      </Link>
    </div>
  )

  renderAddressForm = () => {
    const {
      fullName,
      mobileNumber,
      addressLine,
      city,
      stateName,
      pinCode,
      deliveryMethod,
      errorMsg,
    } = this.state

    return (
      <form className="checkout-form" onSubmit={this.onSubmitCheckout}>
        <h1 className="checkout-heading">Checkout</h1>
        <div className="checkout-form-section">
          <h2 className="checkout-section-heading">Shipping Address</h2>
          <div className="checkout-inputs-grid">
            <label className="checkout-input-label" htmlFor="fullName">
              Full Name
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={fullName}
                className="checkout-input"
                onChange={this.onChangeInput}
              />
            </label>
            <label className="checkout-input-label" htmlFor="mobileNumber">
              Mobile Number
              <input
                id="mobileNumber"
                name="mobileNumber"
                type="tel"
                value={mobileNumber}
                className="checkout-input"
                onChange={this.onChangeInput}
              />
            </label>
            <label
              className="checkout-input-label checkout-wide-input"
              htmlFor="addressLine"
            >
              Address
              <textarea
                id="addressLine"
                name="addressLine"
                value={addressLine}
                className="checkout-textarea"
                rows="4"
                onChange={this.onChangeInput}
              />
            </label>
            <label className="checkout-input-label" htmlFor="city">
              City
              <input
                id="city"
                name="city"
                type="text"
                value={city}
                className="checkout-input"
                onChange={this.onChangeInput}
              />
            </label>
            <label className="checkout-input-label" htmlFor="stateName">
              State
              <input
                id="stateName"
                name="stateName"
                type="text"
                value={stateName}
                className="checkout-input"
                onChange={this.onChangeInput}
              />
            </label>
            <label className="checkout-input-label" htmlFor="pinCode">
              PIN Code
              <input
                id="pinCode"
                name="pinCode"
                type="text"
                value={pinCode}
                className="checkout-input"
                onChange={this.onChangeInput}
              />
            </label>
          </div>
        </div>

        <div className="checkout-form-section">
          <h2 className="checkout-section-heading">Delivery Method</h2>
          <div className="delivery-options-list">
            {deliveryOptions.map(eachOption => (
              <label
                className="delivery-option"
                htmlFor={eachOption.id}
                key={eachOption.id}
              >
                <input
                  id={eachOption.id}
                  name="deliveryMethod"
                  type="radio"
                  value={eachOption.id}
                  checked={deliveryMethod === eachOption.id}
                  className="delivery-radio"
                  onChange={this.onChangeDeliveryMethod}
                />
                <span className="delivery-content">
                  <span className="delivery-title-row">
                    <span className="delivery-title">{eachOption.label}</span>
                    <span className="delivery-fee">
                      {eachOption.fee === 0 ? 'Free' : `Rs ${eachOption.fee}/-`}
                    </span>
                  </span>
                  <span className="delivery-description">
                    {eachOption.description}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </div>

        {errorMsg !== '' && <p className="checkout-error-msg">{errorMsg}</p>}
        <button type="submit" className="checkout-place-order-button">
          <FaCreditCard className="checkout-button-icon" />
          Place Order
        </button>
      </form>
    )
  }

  renderOrderSummary = () => {
    const {cartItems} = this.state
    const selectedDeliveryOption = this.getSelectedDeliveryOption()
    const itemsTotal = this.getItemsTotal()
    const orderTotal = itemsTotal + selectedDeliveryOption.fee

    return (
      <div className="checkout-summary-container">
        <h2 className="checkout-section-heading">Order Summary</h2>
        <ul className="checkout-items-list">
          {cartItems.map(eachItem => (
            <li className="checkout-item" key={eachItem.id}>
              <img
                src={eachItem.imageUrl}
                alt={eachItem.title}
                className="checkout-item-image"
              />
              <div className="checkout-item-details">
                <p className="checkout-item-title">{eachItem.title}</p>
                <p className="checkout-item-quantity">
                  Qty: {eachItem.quantity}
                </p>
              </div>
              <p className="checkout-item-price">
                Rs {eachItem.price * eachItem.quantity}/-
              </p>
            </li>
          ))}
        </ul>
        <div className="checkout-price-row">
          <p>Items Total</p>
          <p>Rs {itemsTotal}/-</p>
        </div>
        <div className="checkout-price-row">
          <p>Delivery</p>
          <p>
            {selectedDeliveryOption.fee === 0
              ? 'Free'
              : `Rs ${selectedDeliveryOption.fee}/-`}
          </p>
        </div>
        <div className="checkout-delivery-note">
          <FaTruck className="checkout-truck-icon" />
          <p>{selectedDeliveryOption.description}</p>
        </div>
        <hr className="checkout-divider" />
        <div className="checkout-total-row">
          <p>Total</p>
          <p>Rs {orderTotal}/-</p>
        </div>
      </div>
    )
  }

  renderCheckoutView = () => (
    <div className="checkout-page-container">
      <div className="checkout-content-container">
        {this.renderAddressForm()}
        {this.renderOrderSummary()}
      </div>
    </div>
  )

  render() {
    const {cartItems, isOrderPlaced} = this.state

    let checkoutContent
    if (isOrderPlaced) {
      checkoutContent = this.renderOrderPlacedView()
    } else if (cartItems.length === 0) {
      checkoutContent = this.renderEmptyCheckoutView()
    } else {
      checkoutContent = this.renderCheckoutView()
    }

    return (
      <>
        <Header />
        {checkoutContent}
      </>
    )
  }
}

export default Checkout
