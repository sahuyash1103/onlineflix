import React, { useState, useEffect } from 'react'
import axios_instance from '../../services/axios';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';
import "./Row.css";

function Row({ title, fetchUrl, isLargeRow }) {
    const [trailerID, setTrailerID] = useState('');
    const [movies, setMovies] = useState([]);
    const baseURL1 = 'https://image.tmdb.org/t/p/w500'; //https://image.tmdb.org/t/p/original/

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 0,
        },
    };

    useEffect(() => {
        async function fetchData() {
            const request = await axios_instance.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const showTrailer = (movie) => {
        if (trailerID) {
            setTrailerID('');
        } else {
            movieTrailer(movie?.name || "")
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerID(urlParams.get('v'));
                })
                .catch((error) => {
                    console.log(error);
                    movieTrailer(movie?.title || "")
                        .then((url) => {
                            const urlParams = new URLSearchParams(new URL(url).search);
                            setTrailerID(urlParams.get('v'));
                        })
                        .catch((error) => {
                            console.log(error);
                            movieTrailer(movie?.original_name || "")
                                .then((url) => {
                                    const urlParams = new URLSearchParams(new URL(url).search);
                                    setTrailerID(urlParams.get('v'));
                                })
                                .catch((error) => console.log(error));
                        });
                });
        }
    }

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='row__posters'>
                {
                    movies.map(movie => (
                        <img
                            key={movie.id}
                            className={`row__poster ${isLargeRow && "row_posterLarge"}`}
                            onClick={() => showTrailer(movie)}
                            src={`${baseURL1}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                            alt={movie.name}
                        />
                    ))
                }
            </div>
            {trailerID && <YouTube videoId={trailerID} opts={opts} />}
        </div>
    )
}

export default Row