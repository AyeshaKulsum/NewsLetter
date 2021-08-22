import ACTIONS from "../actions/actionsList";

const initialState = []

const ArticlesReducer = (state = initialState, action) => {

    const { type, payload } = action;

    switch (type) {
        case ACTIONS.ARTICLES: {
            return payload;
        }
        default: return state;
    }

}

export default ArticlesReducer;