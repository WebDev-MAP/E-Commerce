import React, { useRef } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { reviews } from '../data/products'
import { AiFillStar } from 'react-icons/ai'

function Slick() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 2,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  const refSlider = useRef(null)

  const handleNextSlide = () => {
    ref.current.slickNext()
  }

  const handlePrevSlide = () => {
    ref.current.slickPrev()
  }

  return (
    <div className="mx-auto max-w-[1440px]  overflow-hidden">
      <Slider {...settings} ref={refSlider}>
        {reviews.map((review) => {
          const n = review.stars
          const stars = [...Array(n)].map((i) => {
            return (
              <div>
                <AiFillStar className="text-yellow-400" key={i} />
              </div>
            )
          })
          // card
          return (
            <div className="">
              <div className="mx-2  mb-16 mt-10 flex h-[240px]  flex-col items-start space-y-3 rounded-2xl border border-black px-8 pt-7 font-satoshi_regular text-base">
                <div className="flex">{stars}</div>
                <h4 className="font-satoshi_bold text-xl">{review.name}</h4>

                <p>{review.review}</p>
              </div>
            </div>
          )
        })}
      </Slider>
    </div>
  )
}

export default Slick
