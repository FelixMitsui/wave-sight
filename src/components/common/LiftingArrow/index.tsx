import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';

export default function LiftingArrow() {
    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleLifting = () => {
        if (window.scrollY !== 0) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        } else if (window.scrollY === 0) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            });
        }
    };
    return (
        <Button
            className="m-2 p-2 d-flex rounded-circle position-fixed bottom-0 end-0 index-3 opacity-50 btn-deep-gray text-black"
            onClick={() => handleLifting()}
        >
            {scrollPosition === 0 ? (
                <i className="bx bxs-down-arrow-alt fs-3" />
            ) : (
                <i className="bx bxs-up-arrow-alt  fs-3" />
            )}
        </Button>
    );
};

