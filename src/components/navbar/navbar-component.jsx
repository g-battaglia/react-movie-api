// import { useState } from "react";
import React from "react";

const Navbar = ({
  getFromApi,
  formValue,
  setFormValue,
  decadeValue,
  setDecadeValue,
  setSortType,
}) => {
  const searchOptions = ["Rating", "Title", "Year", "none"];
  const decadeOptions = [
    "All",
    "1900",
    "1910",
    "1930",
    "1940",
    "1950",
    "1960",
    "1970",
    "1980",
    "1990",
    "2000",
    "2010",
    "2020",
  ];

  function submitHandler(e) {
    e.preventDefault();
    getFromApi();
  }

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand color-dark" href="/">
          MovieAPI
        </a>
        <form className="d-flex" onSubmit={submitHandler}>
          <input
            aria-label="Search"
            className="form-control me-2 movieName"
            placeholder="Search"
            type="search"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
          <select
            className="form-select me-2 sortTypeInput"
            aria-label="Default select example"
            onChange={(e) => setSortType(e.target.value)}
          >
            {searchOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          <select
            className="form-select me-2 sortDecadeInput"
            aria-label="Default select example"
            onChange={(e) => setDecadeValue(e.target.value)}
          >
            {decadeOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>

          <button className="btn btn-outline-light searchBtn">Search</button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
