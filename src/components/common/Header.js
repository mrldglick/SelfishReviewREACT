// import React from 'react';
//
// import { Link, withRouter } from 'react-router-dom';
// import Auth from '../../lib/Auth';
//
// class Header extends React.Component {
//
//   handleLogout = () => {
//     Auth.removeToken();
//     this.props.history.push('/');
//   }
//   render(){
//     return(
//       <header className="navbar">
//         <Link className="navbar-item" to="/">Home</Link>
//         <Link className="navbar-item" to="/films">Films</Link>
//         <Link className="navbar-item" to="/films/new">Create a film</Link>
//         {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register">Sign up</Link>}
//         {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Log in</Link>}
//         {Auth.isAuthenticated() && <a className="navbar-item" onClick={this.handleLogout}>Log out {Auth.currentUsername()}</a>}
//       </header>
//     );
//   }
// }
//
// export default  withRouter(Header);

import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';

class Header extends React.Component {
  handleLogout = () => {
    Auth.removeToken();
    this.props.history.push('/');
  }
  render() {
    return(
      <header className="navbar">
        <h1>
          THE SELFISH REVIEW
        </h1>
        <Link className="navbar-item" to="/">Home</Link>
        <Link className="navbar-item" to="/films">Films</Link>
        <Link className="navbar-item" to="/films/new">Create a film</Link>
        {!Auth.isAuthenticated() && <Link className="navbar-item" to="/login">Log In</Link>}
        {/* {!Auth.isAuthenticated() && <Link className="navbar-item" to="/register">Sign up</Link>} */}
        {Auth.isAuthenticated() && <a className="navbar-item" onClick={this.handleLogout}>Log Out {Auth.currentUsername()}</a>}
      </header>
    );
  }
}

export default withRouter(Header);
