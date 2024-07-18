import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import { FaStar } from 'react-icons/fa'
import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5'
import { NavLink } from 'react-router-dom'
import Button from '../Button'

const AdminReviews = () => {
  const [reviews, setReviews] = useState([])
  const [query, setQuery] = useState('')

  const notify = (message) => {
    toast.success(message, {
      position: 'bottom-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  const filteredReviews = reviews.filter((review) => {
    const searchQuery = query.toLowerCase()
    return (
      review._id.toLowerCase().includes(searchQuery) ||
      review.review.toLowerCase().includes(searchQuery) ||
      review.product.title.toLowerCase().includes(searchQuery) ||
      review.first_name.toLowerCase().includes(searchQuery) ||
      review.last_name.toLowerCase().includes(searchQuery) ||
      review.email.toLowerCase().includes(searchQuery) ||
      new Date(review.createdAt)
        .toLocaleDateString()
        .toLowerCase()
        .includes(searchQuery) ||
      new Date(review.updatedAt)
        .toLocaleDateString()
        .toLowerCase()
        .includes(searchQuery)
    )
  })

  console.log(filteredReviews)

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:3002/reviews')
      const data = await response.json()
      const _reviews = data.map((review) => ({
        _id: review._id,
        review: review.review,
        stars: review.stars,
        verified: review.verified,
        title: review.productId.title,
        image: review.productId.mainImage,
        product: review.productId,
        first_name: review.createdBy.first_name,
        last_name: review.createdBy.last_name,
        email: review.createdBy.email,
        createdAt: review.createdAt,
        updatedAt: review.updatedAt,
      }))
      setReviews(_reviews)
    } catch (error) {
      console.error('Error fetching reviews', error.message)
    }
  }

  const deleteReview = async (reviewId) => {
    try {
      const response = await fetch(
        `http://localhost:3002/reviews/${reviewId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      const data = await response.json()
      console.log('Review deleted', data)
      notify('Review deleted!')
      fetchReviews()
    } catch (error) {
      console.error('Error:', error.message)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  const ProductCard = ({ product }) => {
    return (
      <div className="flex flex-col gap-3 border-b pb-3 lg:flex-row lg:border-none lg:w-80 xl:w-96">
        <NavLink to={`/product/${product._id}`}>
          <img
            src={product.mainImage}
            alt={product.title}
            className="pointer-events-none m-auto max-h-[300px] w-36 h-36 lg:w-32 lg:h-32 xl:w-40 xl:h-40"
          />
        </NavLink>
        <div className="space-y-3">
          <NavLink to={`/product/${product._id}`}>
            <h3 className="font-satoshi_bold text-base md:text-lg">
              {product.title}
            </h3>
          </NavLink>
          <p className="flex flex-row items-center font-satoshi_regular text-xs md:text-sm">
            {[...Array(product.stars)].map((star, index) => {
              return <FaStar key={index} className="mr-1 text-yellow-400" />
            })}{' '}
            {product.stars}/5{' '}
          </p>
          {product.isDiscounted ? (
            <div className="flex flex-row items-center">
              <span className="font-satoshi_bold text-lg md:text-xl">
                ${product.discountedPrice}
              </span>
              <span className="px-2 font-satoshi_bold text-lg line-through opacity-40 md:text-xl">
                ${product.price}
              </span>
              <span className="rounded-xl bg-[#FF3333] bg-opacity-10 px-1 py-1 text-xs text-red-500 md:px-3">
                -{product.discountPercentage}%
              </span>
            </div>
          ) : (
            <p className="font-satoshi_bold text-lg md:text-xl">
              ${product.price}
            </p>
          )}
        </div>
      </div>
    )
  }

  const ReviewCard = ({ currentReviews }) => {
    return currentReviews.map((review) => (
      <div
        key={review._id}
        className="my-4 flex flex-col overflow-hidden rounded-lg bg-white p-4 shadow-lg xl:flex-row xl:gap-3"
      >
        <div className="flex flex-col xl:flex-row xl:gap-3 xl:w-full">
          <ProductCard product={review.product} />
          <div className="space-y-3 py-4 lg:border-none xl:w-2/3 xl:p-0">
            <p className="text-base text-gray-700">
              <span className="text-sm font-semibold text-gray-700">
                Review:{' '}
              </span>
              {review.review}
            </p>

            <div className="mb-2 flex items-center">
              <span className="text-sm font-semibold text-gray-700">
                Stars:{' '}
              </span>
              {[...Array(review.stars)].map((star, index) => (
                <FaStar key={index} className="ml-1 text-yellow-400" />
              ))}
            </div>
            <div className="mb-2 flex items-center">
              <span className="text-sm font-semibold text-gray-700">
                Verified:{' '}
              </span>
              {review.verified ? (
                <IoCheckmarkCircle className="ml-1 text-green-600" />
              ) : (
                <IoCloseCircle className="ml-1 text-red-600" />
              )}
            </div>
          </div>
        </div>
        <div className="xl:flex xl:w-3/4">
          <div className="mt-4 gap-3 lg:flex-col xl:m-0 xl:gap-0 xl:w-2/3">
            <div>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Reviewer: </span>
                {review.first_name} {review.last_name}
              </div>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Email: </span>
                {review.email}
              </div>
            </div>
            <div>
              <div className="mb-2 text-gray-700">
                <span className="font-semibold">Review Date: </span>
                {new Date(review.createdAt).toLocaleDateString()}
              </div>
              <div className="text-gray-700">
                <span className="font-semibold">Last Updated: </span>
                {new Date(review.updatedAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="flex w-full justify-center lg:max-h-10">
            <Button
              danger
              className="mt-2"
              onClick={() => deleteReview(review._id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    ))
  }

  return (
    <div className="h-full">
      <h2 className="font-integral_cf text-2xl font-bold">All Reviews</h2>
      <div className="h-full w-full overflow-y-auto rounded-lg bg-background p-4 md:p-8">
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
          <ReviewCard currentReviews={query ? filteredReviews : reviews} />
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}

export default AdminReviews


// Filter nach Datum neueste zuerst, ältetste zuletzt