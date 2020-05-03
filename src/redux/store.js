import { createStore } from 'redux';
import reducer from './reducers';

const initialState = {
  form: {
    isLoaded: false,
    recommendation: '',
    value: ''
  }
}

export const store = createStore(
    reducer,
    initialState,
    // для просмотре с помощью расширения chrome надо добавить следующую строку (https://github.com/zalmoxisus/redux-devtools-extension#usage)
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);