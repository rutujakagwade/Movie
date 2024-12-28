import React,{ useState, useEffect } from 'react'
import Image from '../bannerimg.jpg'
import axios from 'axios';

function Banner() {

  const [movie, setMovie] = useState({});

  useEffect(() => {
      axios
          .get("https://api.themoviedb.org/3/trending/movie/week?api_key=4cfb158babe59e03638bcb86e775c0e3&page=2")
          .then((res) => {
              console.log(res.data.results);
              setMovie(res.data.results[1]);
          });
  }, []); 


  return (
   <>
   <div className={`bg-[url(https:/images.tmdb.org/t/p/original/${movie.backdrop_path})] h-[40vh] md:h-[80vh] bg-center bg-cover flex items-end justify-center  `}>
    <div className='md:text-3xl text-xl bg-black text-white p-6 w-full flex justify-center bg-opacity-50'>{movie.title}</div>
   </div>
   </>
  )
}

export default Banner