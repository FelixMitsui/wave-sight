

export const chatTypes = {
    RECEIVE_MESSAGE: 'RECEIVE_MESSAGE',
    CLEAN_MESSAGE: 'CLEAN_MESSAGE',
    CONNECT: 'CONNECT'
};

type message = {
    user_id: string;
    content: string;

}

type ChatSelectState = {
    messages: [] | message[];
    isConnect: boolean;
}

const initialState: ChatSelectState = {
    messages: [],
    isConnect: false
};

export default function chatReducers(state = initialState, action) {

    switch (action.type) {

        case chatTypes.RECEIVE_MESSAGE:
            return { ...state, messages: [...state.messages, action.payload] };
        case chatTypes.CLEAN_MESSAGE:
            return { ...state, messages: [], isConnect: false };
        case chatTypes.CONNECT:
            return { ...state, isConnect: true };
        default:
            return state;
    }
}
