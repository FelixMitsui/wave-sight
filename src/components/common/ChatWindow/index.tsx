import React, { useRef, useState, useEffect } from "react";
import { InputGroup, Form, Button, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { sendMessage } from "../../../socketio/client";

const ChatWindow = () => {

    const inputRef = useRef(null);
    const messageWindowRef = useRef(null);
    const [isShow, setIsShow] = useState(true);


    const rooms = JSON.parse(sessionStorage.getItem('rooms'));

    const { _id: user_id } = useSelector((state: RootState) => state.user.info);
    const { messages } = useSelector((state: RootState) => state.chat);

    const handleSendMessage = () => {

        sendMessage({ roomId: rooms[0].roomId, messages: { content: inputRef.current.value, user_id } });
        inputRef.current.value = "";
    }

    useEffect(() => {

        if (messageWindowRef.current) {
            messageWindowRef.current.scrollTop = messageWindowRef.current.scrollHeight;
        }

    }, [messages]);

    return (
        messages[0] &&
        <div className={`p-2 d-flex flex-column position-fixed bottom-0 start-30  bg-light-gray border-2  ${isShow ? "chat-room-open  h-50" : "chat-room-close"} w-sm-50 w-md-25 index-4`}>
            <div className="d-flex w-100 border-2">
                <h3 className="font-title text-center flex-grow-1">service window</h3>
                {isShow ? <i className='ms-2  bx bx-chevron-down fs-3' onClick={() => setIsShow(prev => !prev)} /> :
                    <i className='ms-2  bx bx-chevron-up fs-3' onClick={() => setIsShow(prev => !prev)} />
                }
            </div>
            <div style={{ height: "85%" }} className="d-flex flex-column w-100">
                <div className="bg-white d-flex flex-column flex-grow-1 overflow-auto h-100" ref={messageWindowRef}>
                    {messages?.map((message, index) => (

                        message.user_id === user_id ? <ListGroup key={index} className={`mx-1 align-self-end  ${isShow ? "" : "d-none"}`}>
                            <ListGroup.Item className="p-1 m-1 bg-khaki text-break border-2"><p className="m-0 text-normal">{message.content}</p></ListGroup.Item>
                        </ListGroup> :
                            <ListGroup key={index} className={`mx-1 align-self-start  ${isShow ? "" : "d-none"}`}>
                                <ListGroup.Item className="lh-1 p-1 m-1 bg-light-blue text-break border-2 ">{message.content}</ListGroup.Item>
                            </ListGroup>
                    ))}
                </div>
                <InputGroup style={{ height: "15%" }} className={`mt-2 align-items-end  ${isShow ? "" : "d-none"}`}>
                    <Form.Control
                        placeholder="input..."
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                        ref={inputRef}
                    />
                    <Button variant="outline-secondary" id="button-addon2" onClick={() => handleSendMessage()}>
                        Send
                    </Button>
                </InputGroup>
            </div>
        </div>
    )
}

export default ChatWindow;