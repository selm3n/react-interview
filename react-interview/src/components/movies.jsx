import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { getMovies, setMoviesLoading } from "../store/actions/movieActions";
import {
    DELETE_MOVIE,
    LIKE_MOVIE,
    DISLIKE_MOVIE
} from "../store/actions/actionTypes";

import usePagination from "../hooks/Pagination";
import { Pagination } from "@material-ui/lab";


const Movies = () => {

    const content = useSelector((state) => state);
    const dispatch = useDispatch();
    const [filterItems, setFilterItems] = useState([]);
    const [filtedMovies, setFiltredMovies] = useState([]);
    const [bol, setBol] = useState(false);
    const Items = React.useRef();


    let [page, setPage] = useState(1);
    // const PER_PAGE = 4;
    const [PER_PAGE, setPER_PAGE] = useState(4);

    const count = Math.ceil(filtedMovies.length / PER_PAGE);
    const _DATA = usePagination(filtedMovies, PER_PAGE);

    const handleChange = (e, p) => {

        setPage(p);
        _DATA.jump(p);
    };


    useEffect(() => {

        dispatch(getMovies());

    }, []);


    useEffect(() => {
        let items = filterItems;


        for (let i = 0; i < content.movies?.movies.length; i++) {

            let found = false

            if (filterItems.length > 0) {
                for (let j = 0; j < filterItems.length; j++) {
                    if (filterItems[j].category == content.movies.movies[i].category) {
                        found = true
                    }

                }
                if (found == false) {
                    let item = { id: content?.movies?.movies[i].id, category: content.movies?.movies[i].category }
                    items.push({ id: content?.movies?.movies[i].id, category: content.movies?.movies[i].category })
                }




            } else {
                items.push({ id: content?.movies?.movies[i].id, category: content.movies?.movies[i].category })
            }


        }


        for (let j = 0; j < filterItems.length; j++) {
            let deleted = true;
            for (let i = 0; i < content.movies?.movies.length; i++) {
                if (filterItems[j].category == content.movies.movies[i].category) {
                    deleted = false
                }
            }

            if (deleted == true) {
                items.splice(j, 1);
            }

        }



        setFilterItems(items)
        setBol(!bol)


        setFiltredMovies(content.movies.movies)


    }, [content.movies.movies]);


    const deleteMovie = (e, element) => {

        dispatch(setMoviesLoading(true))
        dispatch({
            type: DELETE_MOVIE,
            id: element.id
        })
        dispatch(setMoviesLoading(false))

    }

    const handleLike = (e, element) => {
        dispatch(setMoviesLoading(true))
        dispatch({
            type: LIKE_MOVIE,
            element: element
        })
        dispatch(setMoviesLoading(false))
    }
    const handleDislike = (e, element) => {
        dispatch(setMoviesLoading(true))
        dispatch({
            type: DISLIKE_MOVIE,
            element: element
        })
        dispatch(setMoviesLoading(false))

    }
    const handleChangeFilter = (e,) => {


        if (e.target.value !== 'nofilter') {
            let movs = content.movies.movies;

            let filtred = movs.filter((item) => item.category == e.target.value)


            setFiltredMovies(filtred)
        } else {

            setFiltredMovies(content.movies.movies)
        }

        setPage(1);
        _DATA.jump(1);


    }

    const handleItemsPerPage = (e,) => {

        setPER_PAGE(e.target.value)

    }

    return (


        <div className="main-container container">

            {filterItems.length > 0 &&
                <select name="cars" id="cars"
                    onChange={(e) => handleChangeFilter(e)}
                    className="filter-select filters"
                >
                    <option value='nofilter'>no filter</option>
                    {
                        filterItems.map((element, index) => (
                            <option value={element.category} key={element.id}>{element.category}</option>
                        ))

                    }

                </select>
            }





            <div >


                {content.movies.moviesloading ? (
                    <div className="loading">Loading... </div>
                )
                    : (
                        <>
                            <div className="row filter-group">
                                <div className="filters col-10 col-md-4">
                                    <Pagination

                                        count={count}
                                        size="large"
                                        page={page}
                                        variant="outlined"
                                        shape="rounded"
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="filters col-10 col-md-4 filter-perpage">
                                    <select name="cars" id="cars"
                                        onChange={(e) => handleItemsPerPage(e)}
                                        className="filter-select "
                                    >

                                        <option value={4}>4 items per page</option>
                                        <option value={8}>8 items per page</option>
                                        <option value={12}>12 items per page</option>

                                    </select>
                                </div>
                            </div>

                            <div className="movies-container row">
                                {_DATA.currentData().map(v => {
                                    return (

                                        <div className="movie-card col-sm-12 col-md-4 col-12 col-lg-3" key={v.id} >
                                            <div className="movie-close">
                                                <button
                                                    type="button"
                                                    className="close-button"
                                                    data-dismiss="modal"
                                                    aria-label="Close"
                                                    value={v.id}
                                                    onClick={(e) => deleteMovie(e, v)}
                                                >
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>
                                            <div className="movie-images" ><img className="movie-image" src="http://news.jjc.edu/wp-content/uploads/2016/09/stock-film-photo.jpg" />
                                            </div>
                                            <div className="movie-text">
                                                <div className="movie-title">
                                                    {v.title}
                                                </div>
                                                <div className="movie-category">
                                                    {v.category}
                                                </div>
                                                <br />
                                                <div className="movie-reactions">
                                                    <div className="movie-react">
                                                        <i className={"fa fa-thumbs-up reaction-icon" + (v.liked ? 'reacted' : '')} style={{ fontSize: '30px' }} onClick={(e) => handleLike(e, v)}></i>
                                                        <span className="react-num">{v.likes}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <i className={"fa fa-thumbs-down reaction-icon" + (v.disliked ? 'reacted' : '')} style={{ fontSize: '30px' }} onClick={(e) => handleDislike(e, v)}></i>
                                                        <span className="react-num">{v.dislikes}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                    );
                                })}
                            </div>


                            <Pagination
                                className="filters filter-perpage"
                                count={count}
                                size="large"
                                page={page}
                                variant="outlined"
                                shape="rounded"
                                onChange={handleChange}
                            />

                        </>

                    )
                }



            </div>


            <div className="bottom-margin">

            </div>
        </div>


    );
};
export default Movies;