/** @format */

import React, { useEffect, useState } from 'react'
import { Row, Container, Button } from 'react-bootstrap'
import ProductCard from '../../../src/components/ProductCard'
import { ArrowLeftIcon, ArrowRightIcon } from '../../Icons'

const ProductCarousel = (props) => {

  const { filterValue, products } = props

  const [visiblePage, setVisiblePage] = useState({
    currentPage: 0,
    finalPage: 0,
  })

  const [carouselItems, setCarouselItems] = useState([])

  let width = document.body.clientWidth

  useEffect(() => {
    handleItemDisplay()
  }, [products])

  useEffect(() => {
    checkTotalPage()
  }, [carouselItems, width])

  const checkTotalPage = () => {
    switch (true) {
      case width >= 1200:
        setVisiblePage((prev) => ({
          ...prev,
          finalPage: Math.ceil(carouselItems.length / 5 - 1)
        }))
        console.log("current carousel width more than 1200:" + "current" + width)
        break
      case width >= 992:
        setVisiblePage((prev) => ({
          ...prev,
          finalPage: Math.ceil(carouselItems.length / 4 - 1)
        }))
        console.log("current carousel width more than 992:" + "current" + width)
        break
      case width >= 768:
        setVisiblePage((prev) => ({
          ...prev,
          finalPage: Math.ceil(carouselItems.length / 3 - 1)
        }))
        console.log("carousel width more than 768:" + "current" + width)
        break
      case width >= 576:
        setVisiblePage((prev) => ({
          ...prev,
          finalPage: Math.ceil(carouselItems.length / 2 - 1)
        }))
        console.log("current carousel width more than 576:" + "current" + width)
        break
      case width < 576:
        setVisiblePage((prev) => ({
          ...prev,
          finalPage: Math.ceil(carouselItems.length / 1 - 1)
        }))
        console.log("current carousel width less than 576:" + "current" + width)
        break
      default:
        console.log("width did not change")
    }
  }

  const handleItemDisplay = () => {
    switch (filterValue) {
      case 'product_new':
        setCarouselItems(products.filter((item) => item.product_new === true))
        break
      case 'product_popularity':
        setCarouselItems(products.filter((item) => item.product_popularity === true))
        break
      case 'product_discount':
        setCarouselItems(products.filter((item) => item.product_discount !== 1))
        break
      default:
        console.log("can not be able to display items")
    }
  }

  const handleChangePage = (event) => {
    if (event.currentTarget.name === 'prev') {
      if (visiblePage.currentPage !== 0) {
        setVisiblePage((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }))
      }
    } else if (event.currentTarget.name === 'next') {
      if (visiblePage.currentPage < visiblePage.finalPage) {
        setVisiblePage((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }))
      }
    }
  }

  return (
    <Container
      className="overflow-hidden mt-2  border border-2 border-secondary position-relative "
    >
      <Row xs={1} sm={2} md={3} lg={4} xl={5}
        style={{
          position: "relative",
          left: `calc(${-100 * visiblePage.currentPage}% - ${24 * visiblePage.currentPage}px)`
        }}
        className="flex-nowrap">
        {Object.values(carouselItems).map((item) => (
          <ProductCard key={item._id} productItem={item} />
        ))}
      </Row>

      <Button
        name="prev"
        onClick={(event) => handleChangePage(event)}
        disabled={visiblePage.currentPage === 0}
        size="sm"
        variant="secondary"
        className="position-absolute top-50 start--1  "
      >
        <ArrowLeftIcon />
      </Button>
      <Button
        name="next"
        onClick={(event) => handleChangePage(event)}
        disabled={visiblePage.currentPage === visiblePage.finalPage}
        size="sm"
        variant="secondary"
        className="position-absolute top-50 end--1 "
      >
        <ArrowRightIcon />
      </Button>
    </Container>
  )
}
export default ProductCarousel
