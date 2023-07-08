/** @format */

import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { useNavigate } from 'react-router-dom';

function PageList({ currentIndex, totalPages }) {
 const isFirstPage = currentPage === 1;
 const isLastPage = currentPage === totalPages;
 const navigate = useNavigate();
 const pages = Array.from({ length: totalPages - 1 }, (_, i) => `${i + 1}`);
 let currentPage = currentIndex + 1;
 const handlePageToNext = () => {
  if (currentPage < totalPages) {
   navigate(`?page=${currentPage + 1}`);
   window.scrollTo({ top: 0, behavior: 'smooth' });
  }
 };
 const handlePageToPrev = () => {
  if (currentPage > 1) {
   navigate(`?page=${currentPage - 1}`);
   window.scrollTo({ top: 0, behavior: 'smooth' });
  }
 };
 const handlePageToCurrent = page => {
  if (page === currentPage) {
   return;
  }
  navigate(`?page=${page}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
 };
 return (
  <Pagination className="d-flex justify-content-center">
   <Pagination.First disabled={isFirstPage} onClick={() => handlePageToCurrent(1)} />
   <Pagination.Prev disabled={isFirstPage} onClick={() => handlePageToPrev()} />
   {pages.map((page, index) => (
    <Pagination.Item
     key={index}
     active={index + 1 === currentPage}
     onClick={() => handlePageToCurrent(page)}
    >
     {index + 1}
    </Pagination.Item>
   ))}
   <Pagination.Ellipsis disabled />
   <Pagination.Item
    onClick={() => handlePageToCurrent(totalPages)}
    active={totalPages === currentPage}
   >
    {totalPages}
   </Pagination.Item>
   <Pagination.Next disabled={isLastPage} onClick={() => handlePageToNext()} />
   <Pagination.Last
    disabled={isLastPage}
    onClick={() => handlePageToCurrent(totalPages)}
   />
  </Pagination>
 );
}

export default PageList;
