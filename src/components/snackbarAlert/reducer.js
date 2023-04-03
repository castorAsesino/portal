import { actionTypes } from "./actions";

const INITIAL_STATE = {
    open: false,
    message_type: '',
    message: '',
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.SNACKBAR_OPEN:
            return {
                message_type: action.message_type,
                message: action.message,
                open: true
            }
        case actionTypes.SNACKBAR_CLOSE:
            return {
                ...INITIAL_STATE
            }
        default:
            return state
    }
}
