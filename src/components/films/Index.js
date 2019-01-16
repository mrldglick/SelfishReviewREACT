import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import SearchBar from '../common/SearchBar';
import FilterSelect from '../common/FilterSelect';
import FilterSidebar from '../common/FilterSidebar';
import Sorter from '../common/Sorter';
import Options from '../../lib/Options';

class FilmsIndex extends React.Component {
  state = {
    sortString: Options.get('sortString') || 'title asc',
    sortOptions: [
      { value: 'title asc', label: 'Title (A to Z)'},
      { value: 'title desc', label: 'Title (Z to A)'},
      { value: 'releaseYear asc', label: 'Release Year (Oldest to Newest)'},
      { value: 'releaseYear desc', label: 'Release Year (Newest to Oldest)'},
      { value: 'director asc', label: 'Director (Coolest to Lamest)'},
      { value: 'director desc', label: 'Director (Lamest to Coolest)'}
    ],
    filterOptions: [
      { label: '1970s', value: '1970-1979', active: true},
      { label: '1980s', value: '1980-1989', active: true},
      { label: '1990s', value: '1990-1999', active: true},
      { label: '2000s', value: '2000-2009', active: true},
      { label: '2010s', value: '2010-2019', active: true}
    ]
  }
  componentDidMount() {
    console.log('Component mounted');
    axios.get('/api/films')
      .then(res => this.setState({ films: res.data, filteredFilms: res.data }));
  }
  sortedFilteredFilms = () => {
    const sortedFilms = this.sortFilms(this.state.films);
    return this.filterFilms(sortedFilms);
  }
  sortFilms = (films) => {
    const [ fieldName, direction ] = this.state.sortString.split(' ');
    return _.orderBy(films, fieldName, direction);
  }
  filterFilms = (films) => {
    const { searchTerm } = this.state;
    return films.filter(film =>
      [film.title, film.director].some(field => {
        const re = new RegExp(searchTerm, 'i');
        return re.test(field);
      })
    );
  }

  filterByOptions = (films) => {
    return films.filter(film =>
      this.state.filterOptions.some(option => {
        const [startYear, endYear] = option.value.split('-');
        return option.active && film.releaseYear >= startYear && film.releaseYear <= endYear;
      })
    );
  }

  handleSearchChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  }
  handleSortChange = (event) => {
    Options.set('sortString', event.target.value);
    this.setState({ sortString: event.target.value });
  }

  handleFilterOptionChange = (event) => {
    console.log(event.target.checked, event.target.name);
    //need to make a copy of the filterOptions array
    const filterOptions = this.state.filterOptions.slice();
    filterOptions.forEach(option => {
      if(option.value === event.target.name || event.target.name === 'all'){
        option.active = event.target.checked;
      }
    });

    this.setState({filterOptions});
  }

  // handleFilterOptionChange = (event) => {
  //   console.log(event.target.checked, event.target.name);
  //   const filterOptions = this.state.filterOptions.slice();
  //
  //
  //   // If user checks all
  //   if (event.target.name === 'all') {
  //     // if some are not already checked, check all
  //     if (filterOptions.some(option => option.active)) {
  //       filterOptions.forEach(option => {
  //         option.active = event.target.checked;
  //       });
  //       // if check all is checked, and all other options checked, uncheck all
  //     } else if (event.target.checked && filterOptions.every(option => option.active)) {
  //       filterOptions.forEach(option => {
  //         option.active = !event.target.checked;
  //       });
  //       //otherwise, e.g if some options are unchecked, check all.
  //     } else {
  //       filterOptions.forEach(option => {
  //         option.active = event.target.checked;
  //       });
  //     }
  //
  //     // If user checks other buttons
  //   } else {
  //     // Need a copy of the array
  //     filterOptions.forEach(option => {
  //       if(option.value === event.target.name) {
  //         option.active = event.target.checked;
  //       }
  //     });
  //   }
  //
  //   filterOptions.every(option => option.active) ?
  //     filterOptions[0].active = true : filterOptions[0].active = false;
  //   this.setState({ filterOptions });
  // }

  render() {
    console.log('Filter options are', this.state.filterOptions);
    const allFilms = this.state.films;
    const sortedFilms = this.sortFilms(allFilms);
    const filteredByDecade = this.filterByOptions(sortedFilms);
    return (
      <section className="columns">
        <div className="column is-2">
          <FilterSidebar options={this.state.filterOptions} handleChange={this.handleFilterOptionChange}x/>
        </div>
        <div className="column is-10">
          <div className="columns">
            <div className="column is-8">
              <SearchBar handleChange={this.handleSearchChange}
                searchTerm={this.state.searchTerm}/>
              {this.state.searchTerm &&
                  <FilterSelect  films={this.filterFilms(this.filterByOptions(sortedFilms))} />}
            </div>
            <div className="column is-4">
              <Sorter
                defaultValue={this.state.sortString}
                handleChange={this.handleSortChange}
                options={this.state.sortOptions}/>
            </div>
          </div>
          {/* THIS IS A LIST OF FILMS */}
          <div className="columns is-multiline">
            {this.state.films && filteredByDecade.map(film =>
              <Link key={film._id} to={`/films/${film._id}`}
                className="column is-4 card">
                <h3 className="title is-3"
                  style={{ color: 'steelblue' }}>
                  {film.title} {film.releaseYear && <span>({film.releaseYear})</span>}
                </h3>
                <h4 className="subtitle is-4">{film.director}</h4>
                <img src={film.imgUrl} />
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }
}
export default FilmsIndex;
