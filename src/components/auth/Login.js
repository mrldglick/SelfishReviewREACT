import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';

class AuthLogin extends React.Component {
  state = {
    email: 'email',
    password: 'password',
    passwordHidden: true
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log(('this.state is', this.state));
    axios.post('/api/login', this.state)
      .then(res => {
        const token = res.data.token;
        Auth.setToken(token);
        //localStorage.getItem('token') - this is how you access it.
        Flash.setMessage('info', res.data.message);
        this.props.history.push('/films');
      })
      .catch(err => {
        console.log(err.response);
        Flash.setMessage('danger', 'Invalid email/password');
        // redirect to the current page
        this.props.history.push(this.props.location.pathname);
      });
  }

  handleChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value });
  }

  togglePasswordShow = () => {
    const passwordHidden = !this.state.passwordHidden;
    this.setState({ passwordHidden });
  }

  render() {
    return(
      <section>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} name="email" placeholder="example@email.com" value={this.state.email}/>
          <input onChange={this.handleChange} name="password" type={this.state.passwordHidden ? 'password' : 'text'} value={this.state.password}/>
          <button>Submit</button>
        </form>
        <button onClick={this.togglePasswordShow}>{this.state.passwordHidden ? 'Show password' : 'Hide password'}</button>
      </section>
    );
  }
}

export default AuthLogin;
