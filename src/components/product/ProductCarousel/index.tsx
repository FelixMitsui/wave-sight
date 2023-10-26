
import React, { useEffect, useState, useRef } from 'react';
import { Row, Container, Button, Col } from 'react-bootstrap';
import ProductCard from '../ProductCard';
import CardPlaceholder from '../../common/placeholder/CardPlaceholder';
import { debounce } from 'lodash';

const ProductCarousel = ({ products }) => {

    const [width, setWidth] = useState(document.body.clientWidth);

    const [containerWidth, setContainerWidth] = useState<number>();

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
    }, [width, products]);

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
                const diff = document.body.clientWidth - parseInt(breakpoint);

                return diff >= 0 && diff < prev.diff ? { count, diff } : prev;
            },
            { count: 1, diff: Infinity }
        ).count;

        setVisiblePage({
            currentPage: 0,
            finalPage: Math.max(0, Math.ceil(products.length / itemsPerPage - 1)),
        });
    };

    const handleChangePage = event => {

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
                {products[0] ? products?.map(product => (
                    <Col className="mx-auto" key={product._id}>
                        <ProductCard product={product} />
                    </Col>
                )) :
                    [0, 1, 2, 3, 4, 5].map((item) =>
                        <Col className="mx-auto" key={item}>
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
