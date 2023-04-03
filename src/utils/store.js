import {combineReducers, createStore} from 'redux';
import snackbar from '../components/snackbarAlert/reducer';

const rootReducer = combineReducers({
    snackbar
});

const store = createStore(rootReducer);

export default store;

