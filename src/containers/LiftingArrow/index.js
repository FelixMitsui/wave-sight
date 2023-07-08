/** @format */

import React, { useState, useEffect } from 'react';
import ArrowUpCircleIcon from '../../Icons/ArrowUpCircleIcon';
import ArrowDownCircleIcon from '../../Icons/ArrowDownCircleIcon';
const LiftingArrow = () => {
 const [scrollPosition, setScrollPosition] = useState(0);
 useEffect(() => {
  const handleScroll = () => {
   setScrollPosition(window.pageYOffset);
  };

  window.addEventListener('scroll', handleScroll);
  return () => {
   window.removeEventListener('scroll', handleScroll);
  };
 }, []);

 const hanleLifting = () => {
  if (window.pageYOffset !== 0) {
   window.scrollTo({
    top: 0,
    behavior: 'smooth',
   });
  } else if (window.pageYOffset === 0) {
   window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
   });
  }
 };
 return (
  <button
   className="border-0 bottom-0 end-0 index-3 m-3 position-fixed rounded-circle text-deep-gray"
   onClick={() => hanleLifting()}
  >
   {scrollPosition === 0 ? (
    <ArrowDownCircleIcon viewBox="0 0 16 16" width="2.5rem" height="2.5rem" />
   ) : (
    <ArrowUpCircleIcon viewBox="0 0 16 16" width="2.5rem" height="2.5rem" />
   )}
  </button>
 );
};
export default LiftingArrow;
