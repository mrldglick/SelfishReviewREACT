import React from 'react';
import ReactDOM from 'react-dom';
import 'bulma/css/bulma.css';
import './scss/style.scss';

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import SecureRoute from './components/common/SecureRoute';
import FlashMessages from './components/common/FlashMessages';
import FilmsIndex from './components/films/Index';
import FilmsShow from './components/films/Show';
import FilmsNew from './components/films/New';
import FilmsEdit from './components/films/Edit';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AuthLogin from './components/auth/Login';
// import AuthRegister from './components/auth/Register';


class App extends React.Component {
  render() {
    return(
      <main>
        <Header />
        <FlashMessages />
        <Switch>
          <Route exact path="/login" component={AuthLogin} />
          {/* <Route exact path="/register" component={AuthRegister} /> */}
          <Route exact path="/films" component={FilmsIndex} />
          <SecureRoute exact path="/films/new" component={FilmsNew} />
          <SecureRoute path="/films/:id/edit" component={FilmsEdit} />
          <Route path="/films/:id" component={FilmsShow} />
        </Switch>
  
        <Footer />
      </main>
    );
  }
}

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root'));
