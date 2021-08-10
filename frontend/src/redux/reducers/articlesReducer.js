import ACTIONS from "../actions/actionsList";

const initialState = []

const ArticlesReducer = (state = initialState, action) => {

    console.log("Coming to Articles Reducer", state)

    const { type, payload } = action;

    switch (type) {
        case ACTIONS.ARTICLES: {
            return payload;
        }
        default: return state;
    }

}

export default ArticlesReducer;