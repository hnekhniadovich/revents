import { LOGIN_USER, SIGN_OUT_USER } from './authConstants';
import { createReducer } from '../../app/common/utils/reducerUtil';

const initialState = {
    currentuser: {}
}

export const loginUser = (state, payload) => {
    return {
        ...state, 
        authenticated: true,
        currentUser: payload.creds.email
    }
}

export const signOutUser = (state, payload) => {
    return {
        ...state, 
        authenticated: false,
        currentUser: {}
    }
}

export default createReducer(initialState, {
    [LOGIN_USER]: loginUser,
    [SIGN_OUT_USER]: signOutUser
})