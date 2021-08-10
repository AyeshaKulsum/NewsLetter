import ACTIONS from "../actions/actionsList";

const initialState = []

const SourcesReducer = (state = initialState, action) => {

    console.log("Coming to Sources Reducer", state)

    const { type, payload } = action;

    switch (type) {
        case ACTIONS.SOURCES: {
            return payload;
        }
        default: return state;
    }

}

export default SourcesReducer;