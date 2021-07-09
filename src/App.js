import { useState } from "react";
import Navbar from "./components/navbar/navbar-component";
import CardList from "./components/card-list/card-list.component";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [heading, setHeading] = useState("Please insert a movie title!");
  const [formValue, setFormValue] = useState("Point Break");
  const [decadeValue, setDecadeValue] = useState("All");
  const [sortType, setSortType] = useState("Rating");

  async function getFromApi() {
    console.log("fetch");
    setHeading("Loading");
    let searchLenght = "?l=20";
    const omdbURL =
      "https://movie-api-bt.herokuapp.com/" + formValue + searchLenght;
    const res = await fetch(omdbURL);
    const json = await res.json();
    const data = await json;
    setHeading("Movies like " + formValue);
    let filteredData = data.filter((movie) => !movie.Error);
    if (filteredData.length === 0) {
      setHeading("No result");
      return;
    }
    setMovies(filteredData);
  }

  function orderByType(data) {
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
    return data;
  }

  const filteredMovies = movies.filter((movie) => {
    if (decadeValue === "All") {
      return true;
    }
    return +decadeValue < movie.Year && movie.Year < +decadeValue + 9;
  });

  const orderedMovies = orderByType(filteredMovies);
  console.log(orderedMovies);

  return (
    <>
      <Navbar
        getFromApi={getFromApi}
        formValue={formValue}
        setFormValue={setFormValue}
        setDecadeValue={setDecadeValue}
        decadeValue={decadeValue}
        setSortType={setSortType}
      />
      <main className="container d-flex align-items-center flex-column">
        <h1 className="mt-4 mb-5">{heading}</h1>
        <CardList movies={orderedMovies}></CardList>
      </main>
    </>
  );
};

export default App;
