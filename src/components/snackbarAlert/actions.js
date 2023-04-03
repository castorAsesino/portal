export const actionTypes = {
    SNACKBAR_OPEN: 'SNACKBAR_OPEN',
    SNACKBAR_CLOSE: 'SNACKBAR_CLOSE',
}

const actions = () => {
    return {
        snackBarOpen: (message_type, message) => ({
            type: actionTypes.SNACKBAR_OPEN,
            message_type,
            message
        }),
        snackBarClose: () => ({
            type: actionTypes.SNACKBAR_CLOSE
        })
    }
};
export const dispatches = (dispatch) => {
    const actionCreators = actions();
    return {
        snackBarOpen: (message_type, message) => dispatch(actionCreators.snackBarOpen(message_type, message)),
        snackBarClose: () => dispatch(actionCreators.snackBarClose())
    }
}
