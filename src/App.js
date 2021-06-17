import { useState } from "react";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";

const App = () => {
  // const desc = "Some quick example text to build on the card title and make up the bulk of the card's content.";
  // const a = <MovieCard title="Colorado" description={desc} />;
  const [heading, setHeading] = useState("Please insert a movie title!");
  const [movieCards, setMovieCards] = useState("");

  async function getFromApi(movieName, sortType, decade, stateFn) {
    let searchLenght = "?l=20";
    if (decade !== "All") {
      searchLenght = "?l=50";
      console.log("Long search.");
    }
    const omdbURL = "https://movie-api-bt.herokuapp.com/" + movieName + searchLenght;
    const res = await fetch(omdbURL);
    const data = await res.json();

    setHeading("Movies like " + movieName);
    switch (sortType) {
      case "Title":
        data.sort((a, b) => (a.Title > b.Title ? 1 : -1));
        break;
      case "Rating":
        data.sort((a, b) => (a.imdbRating > b.imdbRating ? -1 : 1));
        break;
      case "Year":
        data.sort((a, b) => (a.Year > b.Year ? -1 : 1));
        break;
      // no default
    }
    let filterdData = data.filter((movie) => !movie.Error);

    if (decade !== "All" && decade !== "All +50") {
      console.log(+decade + 9);
      filterdData = filterdData.filter((movie) => +decade < movie.Year && movie.Year < +decade + 9);
    }

    if (filterdData.length === 0) {
      setHeading("No result");
      return;
    }

    const mapData = filterdData.map((movie) => (
      <MovieCard
        title={movie.Title}
        description={movie.Plot}
        director={movie.Director}
        year={movie.Year}
        rating={movie.imdbRating}
        poster={movie.Poster}
        key={movie.imdbID}
      />
    ));
    console.log(data);
    stateFn(mapData);
  }

  function handleClick(e) {
    let formValue = e.target.querySelector(".movieName").value;
    let selectValue = e.target.querySelector(".sortTypeInput").value;
    let dacadeValue = e.target.querySelector(".sortDecadeInput").value;
    console.log(selectValue);
    console.log(formValue);
    setHeading("Loading");
    setMovieCards("");
    getFromApi(formValue, selectValue, dacadeValue, setMovieCards);
  }

  return (
    <>
      <Navbar onClickFn={handleClick} />
      <main className="container d-flex align-items-center flex-column">
        <h1 className="mt-4 mb-5">{heading}</h1>
        <div className="movie-container d-flex flex-wrap gap-5 justify-content-center">{movieCards}</div>
      </main>
    </>
  );
};

export default App;
