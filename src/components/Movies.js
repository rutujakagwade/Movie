import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import Pagination from './Pagination';
import { json } from 'react-router-dom';

function Movies() {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1); // Corrected: Page should be initialized as a number
    const[hover,setHover] = useState('')
    const[favourites,setFavourites]=useState([])

    // Function to go to the next page
    function go() {
        setPage(prevPage => prevPage + 1);
    }

    // Function to go to the previous page
    function back() {
        if (page > 1) setPage(prevPage => prevPage - 1);
    }

    useEffect(() => {
        let oldFav = localStorage.getItem("imdb");
        // If oldFav is null, default it to an empty array
        oldFav = oldFav ? JSON.parse(oldFav) : [];
        setFavourites([...oldFav]);
    
        axios
            .get(`https://api.themoviedb.org/3/trending/movie/week?api_key=4cfb158babe59e03638bcb86e775c0e3&page=${page}`)
            .then((res) => {
                console.log(res.data.results);
                setMovies(res.data.results);
            });
    }, [page]);

    let add = (movie) =>{
        let newArray = [...favourites,movie]
        setFavourites([...newArray]);
        // console.log(newArray)
        localStorage.setItem("imdb",JSON.stringify(newArray))
    }

    let del = (movie) =>{
        let newArray = favourites.filter((m)=> m.id!=movie.id)
        setFavourites([...newArray])
        localStorage.setItem("imdb",JSON.stringify(newArray))
    }

    return (
        <>
            <div className='text-center'>
                <div className='mt-8 mb-8 font-bold text-3xl text-center'>Trending Movies</div>
                {
                    movies.length === 0 ? (
                        <div className='flex justify-center'>
                            <Oval
                                height="80"
                                width="80"
                                radius="9"
                                color="grey"
                                ariaLabel="loading"
                                secondaryColor='gray'
                            />
                        </div>
                    ) : (
                        <div className='flex flex-wrap justify-center mb-7'>
                            {
                                movies.map((movie) => (
                                    <div key={movie.id} className={`bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})] md:h-[30vh] md:w-[250px] h-[25vh] w-[150px] bg-center bg-cover rounded-xl flex items-end m-4 hover:scale-110 ease-out duration-300 relative`}
                                    onMouseEnter={()=>setHover(movie.id)

                                    }
                                    onMouseLeave={()=>
                                        setHover("")
                                    }>
                                        {
                                            hover == movie.id && 
                                           <>
                                           {
                                            !favourites.find((m)=>m.id==movie.id) ? 
                                            <div className='absolute top-2 right-2 bg-gray-800 rounded-xl text-xl cursor-pointer' onClick={()=>add(movie)}>❤️</div> : 
                                            <div className='absolute top-2 right-2 bg-gray-800 rounded-xl text-xl cursor-pointer' onClick={()=>del(movie)}>❌</div>
                                           }
                                        
                                      
                                            </>
                                        }
                                        <div className='bg-gray-900 w-full text-white p-2 text-center rounded-b-xl text-xl'>
                                            {movie.title}
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )
                }
            </div>
            <Pagination pageProp={page} go={go} back={back} />
        </>
    );
}

export default Movies;
