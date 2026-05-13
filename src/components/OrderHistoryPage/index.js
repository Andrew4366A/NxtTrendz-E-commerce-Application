import {Component} from 'react'

import Header from '../Header'
import OrderHistory from '../OrderHistory'

class OrderHistoryPage extends Component {
  state = {
    orders: [],
  }

  componentDidMount() {
    const orders = JSON.parse(localStorage.getItem('orderHistory')) || []
    this.setState({orders})
  }

  render() {
    const {orders} = this.state

    return (
      <>
        <Header />
        <OrderHistory orders={orders} />
      </>
    )
  }
}

export default OrderHistoryPage
