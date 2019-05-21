import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import LoginForm from '../LoginForm';
import * as userActions from '../../actions/userActions';

export class HomePage extends React.Component {
  constructor(props) {
    super(props);

    const { token } = this.props.user;

    if (token) {
      this.querySelfAndRedirectToMissions(token);
    }
  }

  loginOrRegister(userData, isLogin) {
    this.props.actions.authenticate(userData, isLogin)
      .then(token => this.querySelfAndRedirectToMissions(token))
      .catch(e => alert(e) );
  }

  querySelfAndRedirectToMissions(userToken) {
    this.props.actions.querySelf(userToken)
      .then(() => this.props.history.push('/missions'));
  }

  render() {
    return (
      <div className="container">
        <h2 className="d-flex justify-content-center">Welcome to Super Soldiers!</h2>

          <div className="container row">
            <div className="col">
              <h3>Login</h3>
              <LoginForm onSubmit={(userData) => this.loginOrRegister(userData, true)} />
            </div>
            <div className="col">
              <h3>Sign Up</h3>
              <LoginForm showRegisterFields onSubmit={(userData) => this.loginOrRegister(userData, false)} />
            </div>
          </div>

      </div>
    )
  }
}

HomePage.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
