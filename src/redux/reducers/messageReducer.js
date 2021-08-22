import ACTIONS from "../actions/actionsList";

const initialState = {
    success_message: '',
    error_message: ''
};

const MessageReducer = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {

        case ACTIONS.SUCCESS_MESSAGE: {

            return { ...state, success_message: payload };

        }
        case ACTIONS.ERROR_MESSAGE: {

            return { ...state, error_message: payload };

        }
        default: return state;
    }

}

export default MessageReducer;