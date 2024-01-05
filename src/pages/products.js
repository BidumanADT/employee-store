import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import CarouselItem from "../components/CarouselItem"
import ErrorBoundary from "../components/ErrorBoundary"
import ProductListing from "../components/ProductListing"

// settings for image carousel
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const ProductPage = () => {
  return (
    <>
      <div>
        <Slider {...settings}>
          <CarouselItem />
        </Slider>
        <ErrorBoundary>
          <ProductListing />
        </ErrorBoundary>
      </div>
    </>
  )
}

export default ProductPage