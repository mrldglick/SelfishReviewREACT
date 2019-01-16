import React from 'react';

function SearchBar({ handleChange, searchTerm }) {
  return(
    <section>
      <div className="field">
        <label htmlFor="searchTerm" className="label">Search the films:</label>
        <input name="searchTerm"
          className="input"
          onChange={handleChange}
          value={searchTerm || ''}
        ></input>
      </div>
    </section>
  );
}

export default SearchBar;
