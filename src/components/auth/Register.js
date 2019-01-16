// import React from 'react';
// import axios from 'axios';
// import Auth from '../../lib/Auth';
//
// class AuthRegister extends React.Component {
//   state = {
//     email: 'p@p.com',
//     password: 'pass',
//     passwordHidden: true
//   }
//
//   handleSubmit = event => {
//     event.preventDefault();
//     console.log(('this.state is', this.state));
//     axios.post('/api/register', this.state)
//       .then(res => {
//         const token = res.data.token;
//         Auth.setToken(token);
//         //localStorage.getItem('token') - this is how you access it.
//         this.props.history.push('/films');
//       })
//       .catch(err => console.log(err.response));
//   }
//
//   handleChange = ({ target: { name, value }}) => {
//     this.setState({ [name]: value });
//   }
//
//   togglePasswordShow = () => {
//     const passwordHidden = !this.state.passwordHidden;
//     this.setState({ passwordHidden });
//   }
//
//   render() {
//     return(
//       <section>
//         <form onSubmit={this.handleSubmit}>
//           <input onChange={this.handleChange} name="username" placeholder="e.g Bananaface" value={this.state.username || ''}/>
//           <input onChange={this.handleChange} name="email" placeholder="example@email.com" value={this.state.email || ''}/>
//           <input onChange={this.handleChange} name="password" type={this.state.passwordHidden ? 'password' : 'text'} value={this.state.password || ''}/>
//           <input onChange={this.handleChange} name="passwordConfirmation" type={this.state.passwordHidden ? 'password' : 'text'} value={this.state.passwordConfirmation || ''} placeholder="Confirm password"/>
//           <button>Submit</button>
//         </form>
//         <button onClick={this.togglePasswordShow}>{this.state.passwordHidden ? 'Show password' : 'Hide password'}</button>
//       </section>
//     );
//   }
// }
//
// export default AuthRegister;

import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';

export default class AuthRegister extends React.Component {
  state = {
    passwordHidden: true,
    username: 'Karan',
    email: 'rob.levy@email.com',
    password: 'pass',
    passwordConfirmation: 'whatever',
    errors: {}
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('this.state is', this.state);
  }

  togglePasswordShow = () => {
    const passwordHidden = !this.state.passwordHidden;
    this.setState({ passwordHidden });
  }

  handleSubmit = event => {
    event.preventDefault();
    if(this.state.password !== this.state.passwordConfirmation) {
      const errors = this.state.errors;
      errors.passwordConfirmation = 'Passwords do not match';
      return this.setState({ errors });
    }
    axios.post('/api/register', this.state)
      .then(res => {
        const token = res.data.token;
        Auth.setToken(token);
        this.props.history.push('/');
      })
      .catch(err => {
        const oldErrors = this.state.errors;
        const newErrors = err.response.data.response;
        const errors = { ...oldErrors, ...newErrors };
        console.log(err.response.data.response);
        this.setState({ errors });
      });
  }

  handleChange = ({target: {name, value}}) => {
    const errors = this.state.errors;
    delete errors[name]; // Remove the error for this field
    this.setState({ [name]: value });
  }

  render() {
    return(
      <section>
        <form onSubmit={this.handleSubmit}>
          <input
            name="username"
            placeholder="e.g. Bananaface"
            value={this.state.username || ''}
            onChange={this.handleChange}/>
          <span style={{ color: 'red' }}>{this.state.errors.username}</span>

          <input
            name="email"
            placeholder="example@email.com"
            value={this.state.email || ''}
            onChange={this.handleChange}/>
          <span style={{ color: 'red' }}>{this.state.errors.email}</span>

          <input
            name="password"
            type={this.state.passwordHidden? 'password' : 'text'}
            value={this.state.password || ''}
            onChange={this.handleChange}/>
          <span style={{ color: 'red' }}>{this.state.errors.password}</span>

          <input
            name="passwordConfirmation"
            type={this.state.passwordHidden? 'password' : 'text'}
            value={this.state.passwordConfirmation || ''}
            onChange={this.handleChange}
            placeholder="Confirm your password"/>
          <span style={{ color: 'red' }}>{this.state.errors.passwordConfirmation}</span>

          <button>Submit</button>
        </form>
        <button onClick={this.togglePasswordShow}>👁</button>
      </section>
    );
  }
}
