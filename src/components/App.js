import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './LoginForm'
import Home from './Home'
import Products from './Products'
import ProductItemDetails from './ProductitemDetails'
import Cart from './Cart'
import Checkout from './Checkout'
import OrderHistoryPage from './OrderHistoryPage'
import NotFound from './NotFound'
import ProtectedRoute from './ProtectedRoute'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/products" component={Products} />
    <ProtectedRoute exact path="/products/:id" component={ProductItemDetails} />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <ProtectedRoute exact path="/checkout" component={Checkout} />
    <ProtectedRoute exact path="/orders" component={OrderHistoryPage} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
