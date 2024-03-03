import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './slices/counter_slice';
import noteReducer from './slices/note_slice';
import authReducer from './slices/auth_slice';


const rootReducer = combineReducers({
    counter: counterReducer,
    notes: noteReducer,
    auth: authReducer,
});

export default rootReducer;
