import { useEffect, useState } from 'react'
import { useShopContext } from '../../context/ShopContext'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { FaStar } from 'react-icons/fa'
import Card from '../Card'

const UserReviews = () => {
  const { userData } = useShopContext()
  const [reviews, setReviews] = useState([])

  const fetchReviewsById = async () => {
    const userID = userData._id

    const response = await fetch(`http://localhost:3002/reviews/${userID}`)

    const data = await response.json()

    return setReviews(data)
  }

  useEffect(() => {
    fetchReviewsById()
  }, [])

  return (
    <>
      {reviews.length > 0 ? (
        // stars
        reviews.map((review) => {
          const stars = [...Array(review.stars)].map((star, index) => {
            return <FaStar key={index} className="mr-1 text-yellow-400" />
          })

          return (
            <div key={review._id} className="flex gap-4">
              <div className="mx-2  mb-16 mt-10 flex h-[240px] w-1/2 flex-col items-start  space-y-3 rounded-2xl border border-black/10 px-8 pt-7 font-satoshi_regular text-base">
                <div className="flex">{stars}</div>
                <div className="flex items-center">
                  <h4 className="font-satoshi_bold text-xl">
                    {review.createdBy.first_name} {review.createdBy.last_name}
                  </h4>
                  <div className="pl-2">
                    {review.verified && (
                      <IoCheckmarkCircle className="text-xl text-green-600" />
                    )}
                  </div>
                </div>
                <p className="text-overflow-ellipsis max-h-[120px] overflow-hidden opacity-60">
                  {review.review}
                </p>
              </div>

              <div className="flex w-1/2">
                {' '}
                <Card product={review.productId} />
              </div>
            </div>
          )
        })
      ) : (
        <div>Keine Reviews vorhanden</div>
      )}
    </>
  )
}

export default UserReviews
