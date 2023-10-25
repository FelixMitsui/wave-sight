/** @format */

import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

class SingleCarousel extends React.Component {
    constructor() {
        super();
        this.state = {
            index: 0,
        };
    }

    handleSelectIndex = (selectedIndex, e) => {
        this.setState({ index: selectedIndex });
    };

    render() {
        return (
            <Carousel
                style={{ minHeight: '150px' }}
                className="border border-1 my-1 rounded"
                activeIndex={this.state.index}
                onSelect={this.handleSelectIndex}
            >
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require(`${process.env.ASSETS_PATH}i-banner-fz-20211116-1.jpg`).default}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require(`${process.env.ASSETS_PATH}i-banner-fz-20211116-3.jpg`).default}
                        alt="Second slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require(`${process.env.ASSETS_PATH}i-bn20180717-2-07.jpg`).default}
                        alt="Third slide"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src={require(`${process.env.ASSETS_PATH}i-bn20180717-2-09.jpg`).default}
                        alt="Third slide"
                    />
                </Carousel.Item>
            </Carousel>
        );
    }
}
export default SingleCarousel;
