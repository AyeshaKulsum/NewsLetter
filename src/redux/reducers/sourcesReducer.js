import ACTIONS from "../actions/actionsList";

const initialState = []

const SourcesReducer = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case ACTIONS.SOURCES: {
            return payload;
        }
        default: return state;
    }

}

export default SourcesReducer;