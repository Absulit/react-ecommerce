import { combineReduces } from 'redux';

import userReducer from './user/user.reducer';

export default conbineReducers({
    user: userReducer
});