import ACTIONS from "../actions/actionsList";

const initialState = {
    email: '',
    userName: '',
    subscribedSources: []
}

const UserReducer = (state = initialState, action) => {

    console.log("Coming to UserReducer", action)

    const { type, payload } = action;


    switch (type) {
        case ACTIONS.FETCH_USER_DETAILS: {
            const { email, userName, subscribedSources } = payload;
            return { ...state, email, userName, subscribedSources };
        }
        default: return state;
    }

}

export default UserReducer;