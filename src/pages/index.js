import React from "react"
import Layout from "../components/layout"
// import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
// import CarouselItem from "../components/CarouselItem"
import ErrorBoundary from "../components/ErrorBoundary"
import ProductListing from "../components/ProductListing"

// settings for image carousel
// const settings = {
//   dots: true,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 1,
//   slidesToScroll: 1,
// }

const ProductPage = () => {
  return (
    <>
      <Layout>
        <div>
          {/* <Slider {...settings}>
          <CarouselItem />
        </Slider> */}
          <ErrorBoundary>
            <ProductListing />
          </ErrorBoundary>
        </div>
      </Layout>
    </>
  )
}

export default ProductPage
