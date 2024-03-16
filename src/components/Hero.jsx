import Button from './Button'

function Hero() {
  return (
    <div className="  text-left text-2xl">
      <h2 className="px-4 font-integral_cf">
        FIND CLOTHES THAT MATCHES YOUR STYLE
      </h2>
      <p className="px-4 font-satoshi_regular text-sm opacity-60">
        Browse through our diverse range of meticulously crafted garments,
        designed to bring out your individuality and cater to your sense of
        style.
      </p>
      <Button primary className="w-full">
        Shop Now
      </Button>
      <img src="./images/hero/hero-small.png" alt="" className="p-0" />
    </div>
  )
}
export default Hero
