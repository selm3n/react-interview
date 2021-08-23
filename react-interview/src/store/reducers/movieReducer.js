import {
    GET_MOVIES,
    MOVIES_LOADING,
    DELETE_MOVIE,
    LIKE_MOVIE,
    DISLIKE_MOVIE
    
  } from '../actions/actionTypes';
  
  const initialState = {
    movies: [],
    moviesloading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {
      case MOVIES_LOADING:
        return {
          ...state,
          moviesloading: action.moviesloading
        };
      case GET_MOVIES:
        return {
          ...state,
          movies: action.payload,
        };
        case DELETE_MOVIE:
          return {
            ...state,
            movies: state.movies.filter((item) => item.id !== action.id),
        };
        case LIKE_MOVIE:
          return {
            ...state,
            movies: state.movies.map((item) => {
              if( item.id == action.element.id){
                if(!item.liked)
                {
                  item.likes++
                  item.liked= true
                  if(item.disliked){
                    item.dislikes--
                    item.disliked= false
                  }
                }else{
                  item.likes--
                  item.liked= false
                }
              }
              return item;
              
            }),
        };
        case DISLIKE_MOVIE:
          return {
            ...state,
            movies: state.movies.map((item) => {
              if( item.id == action.element.id){
                if(!item.disliked){
                  item.dislikes++;
                  item.disliked= true
                  if(item.liked){
                    item.likes--
                    item.liked= false
                  }
                }else{
                  item.dislikes--;
                  item.disliked= false
                }
              }
              return item;
              
            }),
        };
      default:
        return state;
    }
  }
  
