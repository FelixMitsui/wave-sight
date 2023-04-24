import React, { useEffect, useState } from 'react'
import { Row, Container, Button } from 'react-bootstrap'
import ProductCard from '../../../src/components/ProductCard'
import { ArrowLeftIcon, ArrowRightIcon } from '../../Icons'
import { debounce } from 'lodash';
const ProductCarousel = (props) => {
  const [width, setWidth] = useState(document.body.clientWidth);
  const { filterValue, products } = props
  const [visiblePage, setVisiblePage] = useState({
    currentPage: 0,
    finalPage: 0,
  })
  const [carouselItems, setCarouselItems] = useState([])


  useEffect(() => {
    handleItemDisplay()
  }, [products])

  useEffect(() => {
    const handleResize = debounce(() => {
      setWidth((prev) => prev = document.body.clientWidth)
    }, 1000);
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    checkTotalPage()
  }, [width, carouselItems])

  const checkTotalPage = () => {
    const pageItemCount = {
      0: 2,
      576: 3,
      768: 3,
      992: 4,
      1200: 5,
    };
    const itemsPerPage = Object.entries(pageItemCount)
      .reduce((prev, [breakpoint, count]) => {
        const diff = width - breakpoint;

        return (diff >= 0 && diff < prev.diff) ? { count, diff } : prev;
      }, { count: 1, diff: Infinity })
      .count;

    setVisiblePage((prev) => ({
      currentPage: 0,
      finalPage: Math.ceil((carouselItems.length / itemsPerPage) - 1),
    }));
  };

  const handleItemDisplay = () => {
    const filteredItems = Object.values(products).reduce((result, items) => {
      if (Array.isArray(items) && items !== products.search) {
        const filtered = items.filter(item => {
          if (filterValue === 'product_new' || filterValue === 'product_popularity') {
            return item[filterValue] === true;
          } else {
            return item[filterValue] !== 1;
          }
        });
        return result.concat(filtered);
      }
      return result;
    }, []);
    setCarouselItems(filteredItems);
  };

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
      className="overflow-hidden mt-2  border border-1 border-light-gray position-relative"
      style={{ minHeight: "250px" }}
    >
      <Row xs={2} sm={3} md={3} lg={4} xl={5}
        style={{
          position: "relative",
          left: `calc(${-100 * visiblePage.currentPage}% - ${24 * visiblePage.currentPage}px)`
        }}
        className="d-flex flex-nowrap">
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
