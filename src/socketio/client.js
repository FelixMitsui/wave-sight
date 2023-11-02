import { io } from "socket.io-client";
import store from "../redux/store";
import { chatTypes } from "../redux/chatModule";
import { triggerSessionStorageChange } from "../utils/tools/customEvent";


export let socket = null;

export function initSocketConnection() {

    socket = io(`${process.env.NODE_ENV === 'production' ? 'https://wave-sight-server.vercel.app' : 'http://localhost:3000'}`);

}

socket.on('updateServicers', (servicers) => {

    sessionStorage.setItem('servicers', JSON.stringify(servicers));

    triggerSessionStorageChange();

    console.log(`Current servicer list ${servicers}`)

})

socket.on('receiveServicers', (servicers) => {

    sessionStorage.setItem('servicers', JSON.stringify(servicers));

    triggerSessionStorageChange();

    console.log(`Current servicer list ${servicers}`)
})

socket.on('sendInfoOfTheRoom', (rooms) => {

    sessionStorage.setItem('rooms', JSON.stringify(rooms));

    triggerSessionStorageChange();
})

socket.on('closeTheRoom', (roomId) => {

    socket.emit('disconnectOfSocket', roomId);

    sessionStorage.removeItem('rooms');

    store.dispatch({ type: chatTypes.CLEAN_MESSAGE });

})

socket.on('message', (messages) => {

    store.dispatch({ type: chatTypes.RECEIVE_MESSAGE, payload: messages });

})

//general user  

export function getServicers() {

    socket.emit('getServicers');
}

export function createRoom(userInfo) {

    store.dispatch({ type: chatTypes.CONNECT });

    socket.emit('createRoom', userInfo);
}

export function disconnectOfSocket(roomId) {

    sessionStorage.removeItem('rooms');

    store.dispatch({ type: chatTypes.CLEAN_MESSAGE });

    socket.emit('disconnectOfSocket', roomId);
}


//servicer 
export function servicerOnline(servicerInfo) {

    socket.emit('servicerOnline', servicerInfo);
}

export function servicerOffline(servicerId) {

    socket.emit('servicerOffline', servicerId);
}

export function addToTheRoom({ roomId, userInfo }) {

    store.dispatch({ type: chatTypes.CONNECT });

    socket.emit('addToTheRoom', { roomId, userInfo });
}

//common
export function sendMessage(messages) {

    socket.emit('sendMessage', messages);
} 