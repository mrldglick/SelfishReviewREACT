import React from 'react';
import { Link } from 'react-router-dom';

const FilterSelect = ({ films }) => {

  const parentStyle = { position: 'absolute',
    width: '100%',
    height: 'auto',
    maxHeight: 500,
    overflow: 'scroll',
    backgroundColor: 'white' ,
    zIndex: 2
  };

  return(
    <div style={{ position: 'relative'}}>
      <div style={parentStyle}>
        {films.map(film =>
          <Link key={film._id} className="media" to={`/films/${film._id}`}>
            <div className="media-left">
              <img style={{ height: 60 }} src={film.imgUrl} />
            </div>
            <div className="media-content">
              <p>{film.title}</p>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default FilterSelect;
