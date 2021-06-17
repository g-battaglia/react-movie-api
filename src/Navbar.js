import { useState } from "react";
import React from "react";

const Navbar = ({ onClickFn }) => {
  const searchOptions = ["Rating", "Title", "Year", "none"];
  const [inputValue, setInputValue] = useState("Point Break");

  function submitHandler(e) {
    e.preventDefault();
    onClickFn(e);
    setInputValue(e.target.firstChild.value);
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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <select className="form-select me-2 sortTypeInput" aria-label="Default select example">
            {searchOptions.map((option) => (
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
