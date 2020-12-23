import { Redirect, Route, Switch } from 'react-router-dom';

import AdminLayout from './layouts/Admin'
import AuthPage from './pages/authpage.component';
import React from 'react';
import Spinner from './components/spinner/spinner.component';
import { connect } from 'react-redux';
import { logoutUser } from './redux/actions/authActionCreators';

const App = ({ user, dispatchLogoutAction }) => {

  return (
    <React.Fragment>
      <Spinner/>
      {!user.isLoggedIn ?
        <Switch>
          <Route exact path="/auth" component={AuthPage} />
          <Redirect to="/auth" />
        </Switch>
        :
        <Switch>
          <Route path="/admin" render={(props) => <AdminLayout {...props} isLoggedIn={user.isLoggedIn} onLogout={dispatchLogoutAction}/>} />
          <Redirect to="/admin/notes" />
        </Switch>
      }
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  user: state.user
});

const mapDispatchToProps = (dispatch) => ({
  dispatchLogoutAction: () => dispatch(logoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);