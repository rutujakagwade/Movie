import React, { useState, useEffect } from 'react';
import Pagination from './Pagination';

function Favourites() {
  const [curGenre, setCurGenre] = useState('All genres');
  const [favourites, setFavourites] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  // Hardcoded genre names and their corresponding IDs
  const genres = ['All genres', 'Action', 'Drama', 'Comedy', 'Animation'];
  const genreMapping = {
    Action: [28],
    Drama: [18],
    Comedy: [35],
    Animation: [16],
  };

  // Load favourites from localStorage on component mount
  useEffect(() => {
    console.log('Loaded favourites:', favourites);
    let oldFav = localStorage.getItem('imdb');
    oldFav = JSON.parse(oldFav) || [];
    setFavourites(oldFav);
  }, []);

  // Function to remove a movie from favourites
  const removeMovie = (movie) => {
    const newArray = favourites.filter((m) => m.id !== movie.id);
    setFavourites(newArray);
    localStorage.setItem('imdb', JSON.stringify(newArray));
  };

  // Filter favourites by selected genre and search query
  const filteredFavourites = favourites.filter((movie) => {
    const matchesGenre =
      curGenre === 'All genres' ||
      genreMapping[curGenre]?.some((genreId) => movie.genre_ids.includes(genreId));
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesGenre && matchesSearch; // Return true only if both genre and search match
  });

  return (
    <>
      <div className='flex justify-center flex-wrap gap-2 mt-4 px-2'>
        {genres.map((genre) => (
          <button
            key={genre}
            className={
              curGenre === genre
                ? 'w-full sm:w-auto text-base px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-300'
                : 'w-full sm:w-auto text-base px-4 py-2 bg-gray-300 hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600 text-white rounded-lg shadow-md transition-shadow duration-300'
            }
            onClick={() => setCurGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      <div className='text-center mt-4'>
        <input
          type='text'
          placeholder='Search'
          className='border border-gray-400 p-2 m-2 text-center rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className='overflow-x-auto mt-6'>
        <table className='min-w-full bg-white border border-gray-300 shadow-xl rounded-lg overflow-hidden'>
          <thead>
            <tr className='bg-gradient-to-r from-gray-200 to-gray-300 text-gray-600 uppercase text-sm leading-normal'>
              <th className='py-3 px-6 text-left'>Image</th>
              <th className='py-3 px-6 text-left'>Title</th>
              <th className='py-3 px-6 text-left'>Rating</th>
              <th className='py-3 px-6 text-left'>Popularity</th>
              <th className='py-3 px-6 text-center'>Genre</th>
              <th className='py-3 px-6 text-center'>Remove</th>
            </tr>
          </thead>
          <tbody className='text-gray-600 text-sm font-light'>
            {filteredFavourites.map((movie) => (
              <tr key={movie.id} className='border-b border-gray-200 hover:bg-blue-50 transition duration-200'>
                <td className='py-3 px-6 text-left'>
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                    alt={movie.title}
                    className='h-16 w-12 rounded-lg shadow-md hover:scale-105 transition-transform duration-300'
                  />
                </td>
                <td className='py-3 px-6 text-left'>{movie.title}</td>
                <td className='py-3 px-6 text-left'>{movie.vote_average}</td>
                <td className='py-3 px-6 text-left'>{movie.popularity}</td>
                <td className='py-3 px-6 text-center'>
                  {movie.genre_ids
                    .map((id) =>
                      Object.keys(genreMapping).find((key) => genreMapping[key].includes(id))
                    )
                    .join(', ')}
                </td>
                <td className='py-3 px-6 text-center'>
                  <button
                    className='bg-red-500 text-white px-4 py-1 rounded text-xs shadow-sm hover:bg-red-600 hover:shadow-lg transition-shadow duration-300'
                    onClick={() => removeMovie(movie)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* <div className='mt-4'>
        <Pagination />
      </div> */}
    </>
  );
}

export default Favourites;
