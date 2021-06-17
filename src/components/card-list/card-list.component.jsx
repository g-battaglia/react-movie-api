import React from 'react';
import './card-list.styles.css'
import MovieCard from '../movie-card/movie-card.component';

const CardList = ({ movies }) => {
    return (
        <div className="movie-container d-grid gap-5 justify-content-center">
        {movies.map((movie) => (
            <MovieCard
              title={movie.Title}
              description={movie.Plot}
              director={movie.Director}
              year={movie.Year}
              rating={movie.imdbRating}
              poster={movie.Poster}
              key={movie.imdbID}
            />
          ))}
        </div>
    )
}

export default CardList

