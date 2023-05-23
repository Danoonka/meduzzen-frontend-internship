import {authReducer} from '../store/reducers/authReducer';
import {authFalse, authTrue} from "../store/userActionCreators";

describe('authReducer', () => {
    test('should handle IS_AUTHORISED_TRUE action', () => {
        const initialState = {isAuthorised: false};
        const action = authTrue();

        const newState = authReducer(initialState, action);

        expect(newState.isAuthorised).toBe(true);
    });

    test('should handle IS_AUTHORISED_FALSE action', () => {
        const initialState = {isAuthorised: true};
        const action = authFalse();

        const newState = authReducer(initialState, action);

        expect(newState.isAuthorised).toBe(false);
    });
});
