import { isAutheticated } from "../../users/helper/userhelper";

const initialState = isAutheticated();

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN": {
            return true;
        }
        case "LOGOUT": {
            return false;
        }
        default:
            return state;
    }
}

export default AuthReducer;