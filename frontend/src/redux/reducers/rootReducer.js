import { combineReducers } from "redux";
import ArticlesReducer from "./articlesReducer";
import AuthReducer from "./authReducer";
import MessageReducer from "./messageReducer";
import SourcesReducer from "./sourcesReducer";
import UserReducer from "./userReducer";
"./messageReducer";

const rootReducer = combineReducers({
    articles: ArticlesReducer,
    messages: MessageReducer,
    user: UserReducer,
    sources: SourcesReducer,
    auth: AuthReducer
})

export default rootReducer;