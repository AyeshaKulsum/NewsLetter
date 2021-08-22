import ACTIONS from "../actions/actionsList";

const initialState = []

const AllSourcesReducer = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case ACTIONS.ALL_SOURCES: {
            return payload;
        }
        default: return state;
    }

}

export default AllSourcesReducer;