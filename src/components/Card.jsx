import { FaStar } from "react-icons/fa";


const Card = ({ product }) => {
  return (
    <>
      <div className="">
		  <img src={product.image} alt={product.title} className="pointer-events-none" />
		  <h3 className="pt-4 font-satoshi_bold text-base md:text-lg">{product.title}</h3>
		  <p className="font-satoshi_regular flex flex-row items-center text-xs md:text-sm">{
			[...Array(product.stars)].map((star, index) => {
			  return <FaStar key={index} className="text-yellow-400 mr-1" />;
			}
			)
		  } {product.stars}/5 </p>
		  {product.isDiscounted ? (
			<div className="flex flex-row items-center">
			  <span className="font-satoshi_bold text-lg md:text-xl">${product.discountedPrice}</span>
			  <span className="line-through px-2 font-satoshi_bold opacity-40 text-lg md:text-xl">${product.price}</span>
			  <span className="bg-[#FF3333] bg-opacity-10 text-xs rounded-xl px-1 md:px-3 py-1 text-red-500">-{product.discountPercentage}%</span>
			</div>
		  ) : (
			<p className="font-satoshi_bold text-lg md:text-xl">${product.price}</p>
		  )}
		</div>
    </>
  )
}

export default Card
