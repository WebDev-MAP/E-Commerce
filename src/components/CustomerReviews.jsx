import CustomerCard from './CustomerCard'
import Slick from './Slick'
function CustomerReviews() {
  return (
    <>
      <section className="mx-4 lg:mx-24 ">
        <h2 className="mb-12 mt-16 text-start font-integral_cf text-3xl md:text-5xl">
          OUR HAPPY CUSTOMERS
        </h2>
        {/* <CustomerCard /> */}
      </section>
      <Slick />
    </>
  )
}
export default CustomerReviews
