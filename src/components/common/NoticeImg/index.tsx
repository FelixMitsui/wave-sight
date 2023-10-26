import React from "react";
import { Image, Figure } from "react-bootstrap";

const NoticeImg = ({ img, text }) => {

    return (
        <Figure>
            <Image
                className="object-fit-cover w-100"
                src={require(`/public/assets/images/${img}`).default}
            ></Image>
            <Figure.Caption
                className="end-0 position-absolute start-0 text-center top-50 text-white bg-light-gray fs-3 opacity-75">
                {text}
            </Figure.Caption>
        </Figure>
    )
}
export default NoticeImg;
