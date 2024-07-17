import { useEffect, useState } from 'react'
import { useShopContext } from '../../context/ShopContext'
import { IoCheckmarkCircle } from 'react-icons/io5'
import { FaStar } from 'react-icons/fa'
import Card from '../Card'
import { IoIosArrowDown } from 'react-icons/io'

const UserReviews = () => {
  const { userData } = useShopContext()
  const [reviews, setReviews] = useState([])
  const [query, setQuery] = useState('')
  const [categoryOpen, setCategoryOpen] = useState(false)

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
    <div className="scroll flex flex-col  font-satoshi_regular">
      <h2 className="my-6 text-2xl font-bold">My Reviews</h2>
      <div className="h-[45rem] space-y-4 overflow-y-auto rounded-lg bg-background p-4 md:p-8">
        <div className="rounded-lg  px-2 ">
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

        {reviews.length > 0 ? (
          // stars
          reviews.map((review) => {
            const stars = [...Array(review.stars)].map((star, index) => {
              return <FaStar key={index} className="mr-1 text-yellow-400" />
            })

            return (
              <div
                key={review._id}
                className="flex  rounded-md border border-black p-4 px-4 py-2"
              >
                {/* product */}

                <div className="flex ">
                  {' '}
                  <Card product={review.productId} />
                </div>
                {/* review */}
                <div className="mx-2  mb-16  flex h-[240px] w-1/2 flex-col items-start  space-y-3 rounded-2xl border border-black/10 px-8 pt-7 font-satoshi_regular text-base">
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
              </div>
            )
          })
        ) : (
          <div>Keine Reviews vorhanden</div>
        )}
      </div>
    </div>
  )
}

export default UserReviews
