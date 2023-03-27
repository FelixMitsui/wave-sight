/** @format */

import React from 'react'
import Carousel from 'react-bootstrap/Carousel'
import '../../../src/index'

class SingleCarousel extends React.Component {
  constructor() {
    super()
    this.state = {
      index: 0,
    }
  }

  handleSelect = (selectedIndex, e) => {
    this.setState({ index: selectedIndex })
  }

  render() {
    return (
      <Carousel activeIndex={this.state.index} onSelect={this.handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100 "
            src={`${process.env.ASSETS_PATH}/i-banner-fz-20211116-1.jpg` || require("assets/carousel/i-banner-fz-20211116-1.jpg")}
            alt="First slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`${process.env.ASSETS_PATH}/i-banner-fz-20211116-3.jpg` || require("assets/carousel/i-banner-fz-20211116-3.jpg")}
            alt="Second slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`${process.env.ASSETS_PATH}/i-bn20180717-2-07.jpg` || require("assets/carousel/i-bn20180717-2-07.jpg")}
            alt="Third slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`${process.env.ASSETS_PATH}/i-bn20180717-2-09.jpg` || require("assets/carousel/i-bn20180717-2-09.jpg")}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    )
  }
}
export default SingleCarousel
