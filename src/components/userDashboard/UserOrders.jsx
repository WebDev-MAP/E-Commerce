import { useEffect, useState } from 'react'
import { useShopContext } from '../../context/ShopContext'
import Button from '../../components/Button'
import Modal from '../Modal'
import { IoIosArrowDown } from 'react-icons/io'

const UserOrders = () => {
  // context
  const { userData, reviews } = useShopContext()
  // state
  const [currentProductId, setCurrentProductId] = useState('')
  const [userOrders, setUserOrders] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [rating, setRating] = useState(0)
  const [description, setDescription] = useState('')
  const [userReviews, setUserReviews] = useState([])

  const [query, setQuery] = useState('')
  const [categoryOpen, setCategoryOpen] = useState(false)
  // variables
  const userId = userData._id

  const alreadyReviewed = (productId) =>
    userReviews.filter((review) => {
      return review.productId._id === productId
    })

  useEffect(() => {
    fetchReviews()
  }, [])

  // fetch all reviews from user
  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:3002/reviews/${userId}`)
      const data = await response.json()
      setUserReviews(data)
      console.log(data)
    } catch (error) {
      console.error('Error fetching orders', error.message)
    }
  }

  // send review
  const sendReview = async (description, rating) => {
    try {
      const response = await fetch('http://localhost:3002/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          review: description,
          stars: rating,
          createdBy: userId,
          productId: currentProductId,
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      console.log('Review submitted successfully:', data)
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
    }
  }

  const handleClick = (id) => {
    setShowModal(true)
    setCurrentProductId(id)
  }

  const handleClose = () => {
    setShowModal(false)
    setRating(0)
    setDescription('')
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    sendReview(description, rating)
    fetchReviews()
    console.log(rating, description, e.target)
    setShowModal(false)
    setRating(0)
    setDescription('')
  }

  const actionbar = (
    <div>
      <Button onClick={handleClose} danger>
        Cancel Review
      </Button>
    </div>
  )

  console.log(userOrders, query)

  const filteredProducts = userOrders.filter((order) => {
    const orderString = Object.values(order)
      .map((value) => value.toString())
      .join(' ')
    return orderString.includes(query)
  })

  console.log(filteredProducts)

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(
        `http://localhost:3002/orders/myorders/${userId}`
      )
      const data = await response.json()
      setUserOrders(data.userOrders)
    }
    fetchOrder()
  }, [])

  return (
    <div className="scroll font-satoshi_regular">
      <h2 className="my-6 text-2xl font-bold">My Orders</h2>
      <div className="h-[45rem] space-y-4 overflow-y-auto rounded-lg bg-background p-4 md:p-8">
        {/* searchbar and filter by category */}
        <div className=" rounded-lg  px-2  ">
          <div className="flex w-full flex-row justify-between">
            <form className=" w-3/4 lg:w-1/3">
              <input
                type="text"
                placeholder="Search Product"
                className="w-full rounded-xl border-2 border-slate-500/40 px-4 py-2"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value)
                }}
              />
            </form>
            <div className="hidden pl-4 md:block lg:pl-0">
              <div
                className="relative flex w-full cursor-pointer items-center gap-2 rounded-xl border-2 border-slate-500/30 px-3 py-2"
                onClick={() => setCategoryOpen(!categoryOpen)}
                onBlur={() => setTimeout(() => setCategoryOpen(false), 300)}
                tabIndex="0"
              >
                Category <IoIosArrowDown />
                <div
                  className={`absolute left-0 top-10 z-50 mt-2 flex flex-col  items-center justify-start font-satoshi_regular ${categoryOpen ? ' block h-full w-full' : 'hidden h-0 w-0'}`}
                >
                  <ul
                    className={`flex w-full flex-col items-start justify-center rounded-md bg-white hover:cursor-pointer`}
                  >
                    <li className="w-full px-4 py-2 hover:rounded-md hover:bg-gray-50">
                      T-shirts
                    </li>
                    <li className="w-full px-4 py-2 hover:rounded-md hover:bg-gray-50">
                      Shorts
                    </li>
                    <li className="w-full px-4 py-2 hover:rounded-md hover:bg-gray-50">
                      Shirts
                    </li>
                    <li className="w-full px-4 py-2 hover:rounded-md hover:bg-gray-50">
                      Hoodies
                    </li>
                    <li className="w-full px-4 py-2 hover:rounded-md hover:bg-gray-50">
                      Jeans
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {userOrders.map((order, index) => (
          // all orders of the user

          <div key={order._id} className="rounded-md  border-2">
            <div className="flex justify-between rounded-md border-2 border-black p-2">
              <p>Order Date: {order.createdAt.slice(0, 10)}</p>
              <p>Total: {order.totalAmount}$</p>
              <p>Status: {order.status}</p>
            </div>

            {/* all products of the order */}
            <div className="flex gap-2">
              {order.products.map((product) => (
                <div className="flex flex-col items-center p-2">
                  <img
                    src={product.productId.mainImage}
                    alt="product image"
                    className="flex h-36"
                    key={product._id}
                  />{' '}
                  {alreadyReviewed(product.productId._id).length > 0 ? (
                    <Button
                      key={product.productId._id}
                      secondary
                      onClick={() => handleClick(product.productId._id)}
                      disabled={true}
                      className="cursor-auto"
                    >
                      Already Reviewed
                    </Button>
                  ) : (
                    <Button
                      key={product.productId._id}
                      primary
                      onClick={() => handleClick(product.productId._id)}
                    >
                      Write a review
                    </Button>
                  )}
                </div>
              ))}
            </div>
            {showModal && (
              <Modal onClose={handleClose} actionbar={actionbar}>
                <div className="flex  flex-col items-center gap-8 text-center font-satoshi_regular text-lg">
                  <h5 className="font-integral_cf">
                    Schreibe ein Review zum Produkt.{' '}
                  </h5>
                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center gap-4"
                  >
                    <textarea
                      id="description"
                      name="description"
                      rows="4"
                      cols="50"
                      placeholder="Enter your text here"
                      className=" w-full rounded-md border-2 border-gray-300 p-2 outline-2 lg:w-max"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                    {/* <Stars /> */}
                    <div>
                      {[1, 2, 3, 4, 5].map((star, index) => {
                        return (
                          <span
                            className="start cursor-pointer text-3xl"
                            key={index}
                            style={{
                              color: rating >= star ? 'gold' : 'gray',
                            }}
                            onClick={() => {
                              setRating(star)
                            }}
                          >
                            {' '}
                            ★{' '}
                          </span>
                        )
                      })}
                    </div>
                    <Button primary>Send</Button>
                  </form>
                </div>
              </Modal>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default UserOrders
