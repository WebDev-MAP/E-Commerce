import { products } from "../data/products"
import Card from "./Card";

const CardList = () => {
  return (
    <>
	 <section className="mx-4 lg:mx-24 ">
	 	<h2 className="font-integral_cf text-3xl md:text-5xl text-center mt-16 mb-12">NEW ARRIVALS</h2>
      <div className="flex flex-row gap-4 md:gap-8 justify-center">
			<div>
			<Card product={products[0]} />
			</div>
			<div>
			<Card product={products[1]} />
			</div>
			<div className="hidden md:block">
			<Card product={products[2]} />
			</div>
			<div className="hidden lg:block">
			<Card product={products[3]} />
			</div>
		</div>
		<div className="flex justify-center">
		<button className="mt-9 border-gray-300 border-[1px] rounded-full w-full md:w-auto py-3 px-20 font-satoshi_medium md:text-base mb-16">View All</button>
		</div>
		<div className="flex justify-center">
		<div className="border-b-[1px] border-gray-300 w-10/12 text-center"></div>
		</div>

		<h2 className="font-integral_cf text-3xl md:text-5xl text-center mt-16 mb-12">TOP SELLING</h2>
		<div className="flex flex-row gap-4 md:gap-8 justify-center">
			<div>
			<Card product={products[4]} />
			</div>
			<div>
			<Card product={products[5]} />
			</div>
			<div className="hidden md:block">
			<Card product={products[6]} />
			</div>
			<div className="hidden lg:block">
			<Card product={products[7]} />
			</div>
		</div>
		<div className="flex justify-center">
		<button className="mt-9 border-gray-300 border-[1px] rounded-full w-full md:w-auto py-3 px-20 font-satoshi_medium md:text-base mb-16">View All</button>
		</div>
		<div className="flex justify-center">
		<div className="border-b-[1px] border-gray-300 w-10/12 text-center"></div>
		</div>
		</section>
    </>
  )
}

export default CardList
