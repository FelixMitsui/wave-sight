
import React, { useEffect, useState, useRef } from 'react';
import { Row, Container, Button, Col, Placeholder, Card } from 'react-bootstrap';
import ProductCard from '../ProductCard';
import CardPlaceholder from '../../common/placeholder/CardPlaceholder';
import { debounce } from 'lodash';

const ProductCarousel = ({ items = [] }) => {

    const [width, setWidth] = useState(document.body.clientWidth);
    const [containerWidth, setContainerWidth] = useState();
    const [visiblePage, setVisiblePage] = useState({
        currentPage: 0,
        finalPage: 0,
    });

    const containerRef = useRef(null);

    useEffect(() => {
        const handleResize = debounce(() => {
            setWidth(prev => (prev = document.body.clientWidth));
        }, 1000);
        handleCheckTotalPage();
        window.addEventListener('resize', handleResize);

        if (containerRef.current) {
            setContainerWidth(containerRef.current.getBoundingClientRect().width);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [width, items]);

    const handleCheckTotalPage = () => {
        const pageItemCount = {
            0: 2,
            576: 2,
            768: 3,
            992: 4,
            1200: 5,
        };
        const itemsPerPage = Object.entries(pageItemCount).reduce(
            (prev, [breakpoint, count]) => {
                const diff = document.body.clientWidth - breakpoint;

                return diff >= 0 && diff < prev.diff ? { count, diff } : prev;
            },
            { count: 1, diff: Infinity }
        ).count;

        setVisiblePage(prev => ({
            currentPage: 0,
            finalPage: Math.max(0, Math.ceil(items.length / itemsPerPage - 1)),
        }));
    };

    const handleChangePage = event => {
        console.log(visiblePage.finalPage)
        if (event.currentTarget.name === 'prev') {
            if (visiblePage.currentPage !== 0) {
                setVisiblePage(prev => ({
                    ...prev,
                    currentPage: prev.currentPage - 1,
                }));
            }
        } else if (event.currentTarget.name === 'next') {
            if (visiblePage.currentPage < visiblePage.finalPage) {
                setVisiblePage(prev => ({
                    ...prev,
                    currentPage: prev.currentPage + 1,
                }));
            }
        }
    };

    return (

        <Container
            className="border border-1 border-light-gray mt-2 overflow-hidden p-0 position-relative rounded"
        >
            <Row
                xs={2}
                sm={2}
                md={3}
                lg={4}
                xl={5}
                style={{
                    position: 'relative',
                    transition: 'transform 0.5s ease-in-out',
                    transform: `translateX(${-containerWidth * visiblePage.currentPage}px)`,
                }}
                ref={containerRef}
                className="m-1 py-1 d-flex flex-nowrap index-2"
            >
                {items[0] ? items?.map(item => (
                    <Col className="mx-auto" key={item._id}>
                        <ProductCard item={item} />
                    </Col>
                )) :
                    [0, 1, 2, 3, 4, 5].map((item, index) =>
                        <Col className="mx-auto" key={index}>
                            <CardPlaceholder />
                        </Col>)
                }
            </Row>
            <Button
                name="prev"
                onClick={event => handleChangePage(event)}
                size="sm"
                variant="secondary"
                className={`position-absolute top-50 start-0 ${visiblePage.currentPage === 0 ? 'opacity-50' : 'none'
                    } d-flex  index-3`}
            >
                <i className='bx bxs-chevron-left fs-5'></i>
            </Button>
            <Button
                name="next"
                onClick={event => handleChangePage(event)}
                size="sm"
                variant="secondary"
                className={`position-absolute top-50 end-0 ${visiblePage.currentPage === visiblePage.finalPage ? 'opacity-50' : 'none'
                    } d-flex index-3`}
            >
                <i className='bx bxs-chevron-right fs-5' />
            </Button>
        </Container>
    );
};
export default ProductCarousel;
