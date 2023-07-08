/** @format */

import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import uuid from 'react-uuid';
import { CrossIcon } from '../../../src/Icons';

const ImgList = ({ imagesFile = [], remove }) => {
 const handleDeleteImg = imageFile => {
  const imgIndex = imagesFile.indexOf(imageFile);
  remove(imgIndex);
 };
 return (
  <Row>
   {imagesFile?.map(imageFile => (
    <Col sm={3} md={3} lg={3} key={uuid()} className="mt-2 position-relative">
     <div
      className="position-absolute start-80"
      onClick={() => handleDeleteImg(imageFile)}
     >
      <CrossIcon viewBox="0 0 18 18" width="30" height="30" />
     </div>
     <div className="d-flex justify-content-center py-2">
      <Image
       thumbnail={true}
       width={100}
       height={100}
       className=""
       src={imageFile.imageUrl || imageFile}
      />
     </div>
    </Col>
   ))}
  </Row>
 );
};

export default ImgList;
