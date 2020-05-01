import { createStore } from 'redux';
import reducer from './reducers';

const initialState = {
  information: {
    isLoaded: false
  }
}

export const store = createStore(reducer, initialState);