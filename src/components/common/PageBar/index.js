/** @format */

import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { useNavigate } from 'react-router-dom';

const PageBar = ({ currentIndex, totalPage, queryText = "", sortText }) => {

    const navigate = useNavigate();

    const isFirstPage = currentPage === 1;
    const isLastPage = currentPage === totalPage;

    const pages = Array.from({ length: totalPage - 1 }, (_, i) => `${i + 1}`);

    let currentPage = currentIndex || 1;

    const handlePageToNext = () => {
        if (currentPage < totalPage) {
            navigate(`?${queryText}page=${currentPage + 1}${sortText}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePageToPrev = () => {
        if (currentPage > 1) {
            navigate(`?${queryText}page=${currentPage - 1}${sortText}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handlePageToCurrent = page => {
        if (page === currentPage) {
            return;
        }
        navigate(`?${queryText}page=${page}${sortText}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <Pagination className="my-3 d-flex justify-content-center">
            <Pagination.First disabled={isFirstPage} className="mx-1" onClick={() => handlePageToCurrent(1)} />
            <Pagination.Prev disabled={isFirstPage} className="mx-1" onClick={() => handlePageToPrev()} />
            {pages.map((page, index) => (
                <Pagination.Item
                    key={index}
                    active={index + 1 === currentPage}
                    className="mx-1"
                    onClick={() => handlePageToCurrent(page)}
                >
                    {index + 1}
                </Pagination.Item>
            ))}
            <Pagination.Ellipsis disabled className="mx-1" />
            <Pagination.Item
                className="mx-1"
                onClick={() => handlePageToCurrent(totalPage)}
                active={totalPage === currentPage}
            >
                {totalPage}
            </Pagination.Item>
            <Pagination.Next disabled={isLastPage} className="mx-1" onClick={() => handlePageToNext()} />
            <Pagination.Last
                disabled={isLastPage}
                className="mx-1"
                onClick={() => handlePageToCurrent(totalPage)}
            />
        </Pagination>
    );
}

export default PageBar;
