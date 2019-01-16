import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';

import axios from 'axios';

class FilmsShow extends React.Component {
  state={
    showNewTagForm: false
  }

  deleteTag = tagId => {
    return () => {
      // console.log(`Delete tag ${tagId}`);
      const filmId = this.props.match.params.id;
      axios.delete(`/api/films/${filmId}/tags/${tagId}`)
        .then(film => this.setState({ film: film.data }))
        .catch(err => console.log('Error deleting.', err));
    };
  }

  componentDidMount(){
    axios.get(`/api/films/${this.props.match.params.id}`)
      .then(res => this.setState({film: res.data}));
  }

  handleDelete = () => {
    axios.delete(`/api/films/${this.props.match.params.id}`, Auth.bearerHeader())
      .then(() => this.props.history.push('/films'));
  }
  toggleNewTagForm = () => {
    const showNewTagForm = !this.state.showNewTagForm;
    this.setState({ showNewTagForm });
  }

  createTag = event => {
    event.preventDefault();
    console.log('Creating new', this.state.newTag);
    const filmId = this.props.match.params.id;
    const tagData = {
      tagname: this.state.newTag,
      addedBy: Auth.currentUserId()
    };
    axios.post(`/api/films/${filmId}/tags`, tagData)
      .then(res => this.setState( {film: res.data, showNewTagForm: false, newTag: null }))
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  render() {
    const film = this.state.film;
    return(
      <section>
        {film &&
          <div className="card has-text-centered">
            <h2 className="title is-2">{film.title}</h2>
            {film.releaseYear && <h3 className="subtitle is-3">({film.releaseYear})</h3>}
            <img src={film.imgUrl} />

// reviews

            {/* TAGS */}
            <div>
              <span onDoubleClick={this.toggleNewTagForm}>Tag</span>
              {this.state.showNewTagForm ?
                <form onSubmit={this.createTag}>
                  <input name="newTag" onChange={this.handleChange} value={this.state.newTag || ''} />
                </form>
                :
                film.tags.map(tag =>
                  <span key={tag._id} className="tag">{tag.tagname}<button className="delete" onClick={this.deleteTag(tag._id)}></button></span>
                )}

            </div>
            <div className="columns">
              <div className="column is-half">
                <Link to={`/films/${film._id}/edit`} className="button is-warning is-rounded">Edit</Link>
              </div>
              <div className="column is-half">
                <button onClick={this.handleDelete} className="button is-danger is-rounded">Delete</button>
              </div>
            </div>
          </div>
        }
      </section>
    );
  }

}

export default FilmsShow;
