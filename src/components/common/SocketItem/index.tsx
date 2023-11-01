import React, { FC } from "react";
import { ListGroup, Button } from "react-bootstrap";


type ItemProps = {
    name: string;
    btnName: string;
    roomId: string;
    onClick: () => void;
    children?: React.ReactNode;
}

const SocketItem: FC<ItemProps> = ({ name, roomId, btnName, onClick, children }) => {

    return (

        <div className="m-1 p-1 d-flex justify-content-around">
            <ListGroup.Item >{name}</ListGroup.Item>
            <Button disabled={!roomId} className="btn-deep-gray text-white" onClick={onClick}>
                {btnName}
            </Button>
            {children}
        </div>
    )
};

export default SocketItem;