import React from 'react';
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirmation: ''
    }
  }

  updateField = (e, attr) => {
    const {value} = e.target;
    const pojo = {};
    pojo[attr] = value;
    this.setState(pojo);
  }

  render() {
    return (
      <div>
        <form onSubmit={e => {
          e.preventDefault();
          this.props.onSubmit(this.state)
          e.target.reset();
        }}>
          <div className="form-group">
            <label>Email</label>
            <input type="text" value={this.state.email} onChange={(e) => this.updateField(e, 'email')} className="form-control" required />
          </div>

            <div className="form-group">
            <label>Password</label>
            <input type="password" value={this.state.password} onChange={(e) => this.updateField(e, 'password')} className="form-control" required />
          </div>

          {this.props.showRegisterFields && <div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" value={this.state.password_confirmation} onChange={(e) => this.updateField(e, 'password_confirmation')} className="form-control" required />
            </div>

            <div className="form-group">
              <label>Name</label>
              <input type="text" value={this.state.name} onChange={(e) => this.updateField(e, 'name')} className="form-control" required />
            </div>
          </div>}

          <div className="row d-flex justify-content-center">
            <input type="submit" className="btn btn-primary" value={this.props.showRegisterFields ? 'Sign up' : 'Login'} />
          </div>
        </form>
      </div>
    )
  }
}

LoginForm.propTypes = {
  showRegisterFields: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
}

export default LoginForm;
