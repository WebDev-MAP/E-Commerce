import { useEffect, useState } from 'react'
import { useOrderContext } from '../../context/OrderContext'

const AdminAllOrders = () => {
  const [query, setQuery] = useState('')
  const { fetchAdminOrders, adminOrders } = useOrderContext()
  const [editingOrderId, setEditingOrderId] = useState(null)

  useEffect(() => {
    fetchAdminOrders()
  }, [])

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:3002/orders/update-status/${orderId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: newStatus,
            isRefunded: newStatus === 'Refunded',
          }),
        }
      )
      const data = await response.json()
      console.log('Order status updated', data)
      fetchAdminOrders()
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  const handleEditClick = (orderId) => {
    setEditingOrderId(orderId)
  }

  const handleStatusChange = (orderId, newStatus) => {
    console.log(orderId, newStatus)
    updateOrderStatus(orderId, newStatus)
    setEditingOrderId(null)
  }

  console.log({ adminOrders })

  const filteredOrders = adminOrders
    .filter((order) => {
      const searchQuery = query.toLowerCase()
      return (
        order._id.toLowerCase().includes(searchQuery) ||
        order.user.toLowerCase().includes(searchQuery) ||
        order.totalAmount.toString().includes(searchQuery) ||
        order.totalDiscount.toString().includes(searchQuery) ||
        order.paymentMethod.toLowerCase().includes(searchQuery) ||
        order.status.toLowerCase().includes(searchQuery) ||
        new Date(order.createdAt)
          .toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
          .toLowerCase()
          .includes(searchQuery) ||
        new Date(order.updatedAt)
          .toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          })
          .toLowerCase()
          .includes(searchQuery)
      )
    })
    .map((order) => ({
      _id: order._id,
      user: order.user,
      totalAmount: order.totalAmount.toString(),
      totalDiscount: order.totalDiscount.toString(),
      paymentMethod: order.paymentMethod,
      status: order.status,
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }))

  function Orders({ currentOrders }) {
    return (
      <table className="min-w-full border border-gray-200 bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Order ID
            </th>
            <th className="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
              User ID
            </th>
            <th className="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Total Items
            </th>
            <th className="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Total Amount
            </th>
            <th className="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Total Discount
            </th>
            <th className="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Payment Method
            </th>
            <th className="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Status
            </th>
            <th className="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Created At
            </th>
            <th className="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Last Updated Date
            </th>
            <th className="border-b border-gray-200 px-6 py-3 text-left text-xs font-medium uppercase text-gray-500">
              Edit
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentOrders.map((order) => (
            <tr key={order._id}>
              <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {order._id}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {order.user}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {order.products
                    ? order.products.reduce(
                        (total, product) => total + product.quantity,
                        0
                      )
                    : 0}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  ${order.totalAmount}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  ${order.totalDiscount}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {order.paymentMethod}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {editingOrderId === order._id ? (
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                  ) : (
                    <>{order.status}</>
                  )}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {new Date(order.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  {new Date(order.updatedAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  })}
                </div>
              </td>
              <td className="whitespace-no-wrap border-b border-gray-200 px-6 py-4">
                <div className="text-sm leading-5 text-gray-900">
                  <button
                    onClick={() => handleEditClick(order._id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  return (
    <div className="h-full">
      <h2 className="mb-4 font-satoshi_regular text-2xl font-bold">
        All Orders
      </h2>
      <div className="mt-8 h-1/2 w-full overflow-y-auto rounded-lg bg-background p-4 md:p-8">
        <div className="my-3">
          <form className=" w-3/4 lg:w-1/3">
            <input
              type="text"
              placeholder="Search User"
              className="w-full rounded-xl border-2 border-slate-500/40 px-4 py-2"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value)
              }}
            />
          </form>
        </div>
        <div className="overflow-x-auto">
          <Orders currentOrders={query ? filteredOrders : adminOrders} />
        </div>
      </div>
    </div>
  )
}

export default AdminAllOrders
