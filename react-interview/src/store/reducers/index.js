import { combineReducers } from 'redux';

import errorReducer from './errorReducer';
import movieReducer from './movieReducer';



export default combineReducers({

  errors: errorReducer,
  movies: movieReducer,

 
});