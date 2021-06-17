import { useState } from "react";
import Navbar from "./components/navbar/navbar-component";
import CardList from "./components/card-list/card-list.component";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [heading, setHeading] = useState("Please insert a movie title!");
  const [formValue, setFormValue] = useState("Point Break");
  const [decadeValue, setDecadeValue] = useState("All");
  const [sortType, setSortType] = useState("Title");

  async function getFromApi() {
    setHeading("Loading");
    let searchLenght = "?l=20";
    console.log(decadeValue);
    if (decadeValue !== "All") {
      searchLenght = "?l=50";
      console.log("Long search.");
    }
    const omdbURL =
      "https://movie-api-bt.herokuapp.com/" + formValue + searchLenght;
    const res = await fetch(omdbURL);
    const data = await res.json();

    setHeading("Movies like " + formValue);
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
    let filteredData = data.filter((movie) => !movie.Error);

    if (decadeValue !== "All" && decadeValue !== "All +50") {
      console.log(+decadeValue + 9);
      filteredData = filteredData.filter(
        (movie) => +decadeValue < movie.Year && movie.Year < +decadeValue + 9
      );
    }

    if (filteredData.length === 0) {
      setHeading("No result");
      return;
    }
    setMovies(filteredData);
  }

  return (
    <>
      <Navbar
        getFromApi={getFromApi}
        formValue={formValue}
        setFormValue={setFormValue}
        setDecadeValue={setDecadeValue}
        setSortType={setSortType}
      />
      <main className="container d-flex align-items-center flex-column">
        <h1 className="mt-4 mb-5">{heading}</h1>
        <CardList movies={movies}></CardList>
      </main>
    </>
  );
};

export default App;
