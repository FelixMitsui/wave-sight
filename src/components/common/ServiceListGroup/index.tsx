import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ListGroup, Button } from "react-bootstrap";
import { createRoom, addToTheRoom, disconnectOfSocket, getServicers } from '../../../socketio/client';
import { RootState } from "redux/store";
import SocketItem from "../SocketItem";

type userInfo = {
    user_id: string;
    user_name: string;
}

type ServiceList = {
    userInfo: userInfo;
    servicerName?: string;
    servicerId?: string;
    status?: boolean;
    roomId?: string;
    user_name?: string;
    user: s
}

const ServiceListGroup = () => {

    const [isShowRedPointer, setIsShowRedPointer] = useState(false);

    const [isShowListGroup, setIsShowListGroup] = useState(false);

    const [serviceList, setServiceList] = useState<ServiceList[]>([]);

    const { _id, user_name, user_auth } = useSelector((state: RootState) => state.user.info);

    const { isConnect } = useSelector((state: RootState) => state.chat);

    const userInfo = { user_name, user_id: _id };

    const openAgentList = () => {

        setIsShowListGroup(prev => !prev);
        setIsShowRedPointer(false);
    }

    useEffect(() => {

        if (!(user_auth & 1)) {
            getServicers();
        }
    }, [user_auth])

    useEffect(() => {

        if (user_auth & 1) {

            const rooms = JSON.parse(sessionStorage.getItem('rooms'));

            setServiceList(rooms);

        } else {

            const servicers = JSON.parse(sessionStorage.getItem('servicers'));

            setServiceList(servicers);
        }

    }, [user_auth])

    useEffect(() => {

        if (!isConnect) {
            setServiceList([]);
        }

    }, [isConnect])

    useEffect(() => {

        const handleSessionStorageChange = () => {

            if (!isShowListGroup && serviceList && serviceList[0]) {
                setIsShowRedPointer(true);
            }
        };

        window.addEventListener('sessionStorageChange', handleSessionStorageChange);

        return () => {
            window.removeEventListener('sessionStorageChange', handleSessionStorageChange);
        };
    }, [serviceList]);

    const handleConnectToSocket = (roomId?) => {

        if (isConnect) {
            disconnectOfSocket(roomId);

        } else {

            if (user_auth & 1) {

                addToTheRoom({ roomId, userInfo });

            } else {

                createRoom(userInfo);
            }
        }
    };

    return (
        <div className="d-flex position-fixed top-25 end-0 index-4">
            {isShowListGroup && <ListGroup className="border border-deep-gray bg-light-gray">
                <ListGroup.Item className="p-1 text-center fw-bold font-content">Service</ListGroup.Item>
                {
                    serviceList?.map((item) => {
                        const color = item?.status ? 'text-green' : 'text-gray';
                        console.log(item)
                        return user_auth & 1 ?
                            <SocketItem
                                key={item.roomId}
                                name={item.userInfo.user_name}
                                btnName={`${isConnect ? "Disconnect" : "Connect"}`}
                                roomId={item.roomId}
                                onClick={() => handleConnectToSocket(item.roomId)} /> :

                            <SocketItem
                                key={item.servicerId}
                                name={item.servicerName}
                                btnName={`${isConnect ? "Disconnect" : "Connect"}`}
                                roomId={item.servicerId}
                                onClick={() => handleConnectToSocket()}>
                                <i className={`ms-1 bx bxs-circle ${color}`}></i>
                            </SocketItem>
                    })
                }
            </ListGroup >}
            <Button
                type="button"
                className="m-2 p-2 align-self-end rounded-circle d-flex opacity-50 btn-deep-gray text-black"
                variant="outline-light bg-deep-gray font-btn fw-bold"
                onClick={openAgentList}
            >
                <i className="bx bx-support fs-3" />
            </Button >
            {isShowRedPointer && <i className='bx bxs-circle position-absolute top-15 end-10 text-red' />}
        </div>
    );
}

export default ServiceListGroup;