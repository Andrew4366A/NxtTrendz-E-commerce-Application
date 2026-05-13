import {useState} from 'react'
import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  MapPin,
  PackageCheck,
  ReceiptText,
  ShoppingBag,
} from 'lucide-react'

const statusBadgeClasses = {
  Confirmed: 'bg-blue-100 text-primary border-blue-200',
  Shipped: 'bg-orange-100 text-orange-700 border-orange-200',
  Delivered: 'bg-green-100 text-green-700 border-green-200',
}

const formatOrderDate = orderDate =>
  new Date(orderDate).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })

const OrderHistory = ({orders}) => {
  const [openOrderIds, setOpenOrderIds] = useState([])

  const onToggleOrder = orderId => {
    setOpenOrderIds(prevOrderIds =>
      prevOrderIds.includes(orderId)
        ? prevOrderIds.filter(eachId => eachId !== orderId)
        : [...prevOrderIds, orderId],
    )
  }

  if (orders.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] w-[90%] max-w-[1110px] flex-col items-center justify-center text-center font-roboto">
        <ShoppingBag className="h-14 w-14 text-primary" strokeWidth={1.8} />
        <h1 className="mt-5 text-2xl font-semibold text-slate-800">
          No orders yet
        </h1>
        <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
          Your completed Nxt Trendz orders will appear here after checkout.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto w-[90%] max-w-[1110px] py-6 font-roboto md:py-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Nxt Trendz
          </p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Order History
          </h1>
        </div>
        <p className="text-sm text-slate-500">
          {orders.length} {orders.length === 1 ? 'order' : 'orders'}
        </p>
      </div>

      <ul className="space-y-5 pl-0">
        {orders.map(order => {
          const isOpen = openOrderIds.includes(order.orderId)
          const badgeClass =
            statusBadgeClasses[order.status] || statusBadgeClasses.Confirmed
          const itemsTotal = order.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0,
          )
          const deliveryFee = order.totalAmount - itemsTotal

          return (
            <li
              className="list-none overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"
              key={order.orderId}
            >
              <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-5">
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                    <PackageCheck className="h-4 w-4 text-primary" />
                    <span>Order ID: {order.orderId}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <CalendarDays className="h-4 w-4" />
                    <span>{formatOrderDate(order.orderDate)}</span>
                  </div>
                </div>

                <span
                  className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-bold ${badgeClass}`}
                >
                  {order.status}
                </span>
              </div>

              <div className="px-4 py-4 md:px-5">
                <ul className="space-y-3 pl-0">
                  {order.items.map(item => (
                    <li
                      className="grid list-none grid-cols-[72px_minmax(0,1fr)] gap-3 rounded-lg border border-slate-100 p-3 sm:grid-cols-[84px_minmax(0,1fr)_auto]"
                      key={item.id}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-[72px] w-[72px] rounded-md object-cover sm:h-[84px] sm:w-[84px]"
                      />
                      <div className="min-w-0">
                        <h2 className="truncate text-base font-semibold text-slate-900">
                          {item.name}
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                          Qty: {item.quantity}
                        </p>
                        <p className="mt-2 text-sm font-semibold text-slate-700 sm:hidden">
                          Rs {item.price * item.quantity}/-
                        </p>
                      </div>
                      <p className="hidden self-center whitespace-nowrap text-base font-bold text-slate-900 sm:block">
                        Rs {item.price * item.quantity}/-
                      </p>
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  className="mt-4 inline-flex items-center gap-2 rounded-md border border-primary px-4 py-2 text-sm font-semibold text-primary transition hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  onClick={() => onToggleOrder(order.orderId)}
                >
                  <ReceiptText className="h-4 w-4" />
                  View Details
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>

                {isOpen && (
                  <div className="mt-4 grid gap-4 rounded-lg bg-slate-50 p-4 md:grid-cols-[minmax(0,1fr)_280px]">
                    <div>
                      <div className="mb-2 flex items-center gap-2 text-sm font-bold text-slate-900">
                        <MapPin className="h-4 w-4 text-primary" />
                        Delivery Address
                      </div>
                      <p className="text-sm leading-6 text-slate-600">
                        {order.deliveryAddress.name}
                        <br />
                        {order.deliveryAddress.street}
                        <br />
                        {order.deliveryAddress.city} -{' '}
                        {order.deliveryAddress.zip}
                      </p>
                    </div>

                    <div className="rounded-md border border-slate-200 bg-white p-4">
                      <h3 className="text-sm font-bold text-slate-900">
                        Payment Summary
                      </h3>
                      <div className="mt-3 flex justify-between text-sm text-slate-600">
                        <span>Items Total</span>
                        <span>Rs {itemsTotal}/-</span>
                      </div>
                      <div className="mt-2 flex justify-between text-sm text-slate-600">
                        <span>Delivery</span>
                        <span>
                          {deliveryFee === 0 ? 'Free' : `Rs ${deliveryFee}/-`}
                        </span>
                      </div>
                      <div className="mt-3 border-t border-slate-100 pt-3">
                        <div className="flex justify-between text-base font-bold text-slate-900">
                          <span>Total Paid</span>
                          <span>Rs {order.totalAmount}/-</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default OrderHistory
