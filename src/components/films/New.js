import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

import FilmForm from './Form';

class FilmsNew extends React.Component {
  state= {}

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted!', this.state);
    console.log(this.props);
    axios.post('/api/films', this.state , Auth.bearerHeader())
      .then(() => this.props.history.push('/films'));
  }

  handleChange = ({ target: { name, value }}) => {
    // console.log('Handle Change is called', event.target.value);
    // const { target: { name, value }} = event;
    this.setState({ [name]: value });
  }

  render() {
    return(
      <section>
        <h2 className="title is-2">Create a new film</h2>
        <FilmForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          film={this.state}
        />
      </section>
    );
  }
}

export default FilmsNew;
