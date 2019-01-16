import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

import FilmForm from './Form';

class FilmsEdit extends React.Component {
  state= {}

  handleSubmit = (event) => {
    event.preventDefault();
    const filmId = this.props.match.params.id;
    console.log('Form submitted!', this.state);
    console.log(this.props);
    axios.put(`/api/films/${filmId}`, this.state, Auth.bearerHeader())
      .then(() => this.props.history.push(`/films/${filmId}`));
  }

  handleChange = ({ target: { name, value }}) => {
    // console.log('Handle Change is called', event.target.value);
    // const { target: { name, value }} = event;
    this.setState({ [name]: value });
  }

  componentDidMount() {
    axios.get(`/api/films/${this.props.match.params.id}`)
      .then(res => this.setState(res.data));
  }

  render() {
    console.log('this.state is', this.state);
    return(
      <section>
        <h2 className="title is-2">The Edit Page</h2>
        <FilmForm
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          film={this.state}
        />
      </section>
    );
  }
}

export default FilmsEdit;
