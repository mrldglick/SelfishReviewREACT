import React from 'react';

function FilmForm({handleSubmit, handleChange, film}) {
  return(
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title" className="label">Title</label>
        <input className="input" name="title"
          value={film.title || ''}
          onChange={handleChange}
          placeholder="e.g. Star Wars"
        />
      </div>
      <div className="field">
        <label htmlFor="releaseYear" className="label">Release Year</label>
        <input className="input" name="releaseYear"
          value={film.releaseYear || ''}
          onChange={handleChange}
          placeholder="e.g. 1979"
        />
      </div>
      <div className="field">
        <label htmlFor="director" className="label">Director</label>
        <input className="input" name="director"
          value={film.director || ''}
          onChange={handleChange}
          placeholder="e.g. George Lucas"
        />
      </div>
      <div className="field">
        <label htmlFor="imgUrl" className="label">Image (URL)</label>
        <input className="input" name="imgUrl"
          value={film.imgUrl || ''}
          onChange={handleChange}
          placeholder="e.g. http://...."
        />
      </div>
      <button className="button is-info is-outlined">Submit</button>
    </form>
  );
}

export default FilmForm;
