import { reviews } from '../data/products'
import { AiFillStar } from 'react-icons/ai'

function CustomerCard() {
  return (
    <div className="flex gap-10">
      {reviews.map((review) => {
        const n = review.stars
        const stars = [...Array(n)].map((i) => {
          return (
            <div>
              <AiFillStar className="text-yellow-400" key={i} />
            </div>
          )
        })

        return (
          <div className="mb-16 mt-10 flex h-fit w-[400px] flex-col justify-center space-y-3 rounded-2xl border border-black px-8 font-satoshi_regular text-base">
            <div className="flex">{stars}</div>
            <h4 className="font-satoshi_bold text-xl">{review.name}</h4>

            <p>{review.review}</p>
          </div>
        )
      })}
    </div>
  )
}
export default CustomerCard
