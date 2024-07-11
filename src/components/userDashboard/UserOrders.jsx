import { useEffect, useState } from 'react'
import { useShopContext } from '../../context/ShopContext'

const UserOrders = () => {
  const { userData } = useShopContext()
  const [userOrders, setUserOrders] = useState([])
  const userId = userData._id

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(
        `http://localhost:3002/orders/myorders/${userId}`
      )
      const data = await response.json()
      setUserOrders(data)
    }
    fetchOrder()
  }, [])

  console.log(userOrders)

  return (
    <div className="scroll">
      <div className="mb-2">My Orders</div>
      <div className="max-h-96 space-y-4 overflow-y-auto">
        {userOrders.map((order, index) => (
          // all orders of the user
          <div key={order._id} className="border-2">
            <div className="flex   justify-between border-2 border-black p-2">
              <p>Order Date: {order.createdAt}</p>
              <p>Total: {order.totalAmount}$</p>
              <p>Status: {order.status}</p>
            </div>

            {/* all prodcts of the order */}
            <div className="flex flex-wrap gap-x-4 p-2">
              {order.products.map((product) => (
                <img
                  src={product.productId.mainImage}
                  alt="product image"
                  className="flex h-20"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserOrders
