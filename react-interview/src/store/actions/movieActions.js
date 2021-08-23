import {movies$} from "./movies.js"
import {
    GET_ERRORS,
    GET_MOVIES,
    MOVIES_LOADING,
    


} from "./actionTypes";

export const setMoviesLoading = value => {
    return {
        type: MOVIES_LOADING,
        moviesloading: value
    };
};

export const getMovies = () => dispatch => {

    dispatch(setMoviesLoading(true));

    movies$.then((res)=>{
        dispatch({
            type: GET_MOVIES,
            payload: res
        })
    
        dispatch(setMoviesLoading(false));

    })
    .catch(err =>{
        console.log('err', err);
        dispatch(setMoviesLoading(false));
        if(err && err.response){
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        }
      }
    )
    
    




   

    

};
