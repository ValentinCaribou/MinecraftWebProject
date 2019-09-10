import actions from "./actions"

export const balanceTonToast = (type, message,timeout=5000,closeCallback) => {
    return (dispatch) => {
        dispatch(actions.showToast({
            type,
            message,
            timeout,
            closeCallback
        }));
    }
}