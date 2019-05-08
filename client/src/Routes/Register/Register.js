import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { connect } from 'react-redux';
import { registerUser } from '../../actions/auth';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    } 
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // 重要 error不要變成props原因
  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    // 重要
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    }

    this.props.registerUser(newUser)
  }

  render() {
    // 重要 error要留著當state沒有變成props
    const { errors } = this.state;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              {/* noValidate  */}
              <form noValidate onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    // 重要: is-invalid 是  bootstrap 的 invalid 方法 可以接 state
                    className={classnames('form-control form-control-lg', { 'is-invalid': errors.name })}
                    placeholder="Name"
                    name="name"
                    required
                    value={this.state.name}
                    onChange={this.handleChange}
                  />
                  {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className={classnames('form-control form-control-lg', { 'is-invalid': errors.email })}
                    placeholder="Email Address"
                    name="email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                  {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', { 'is-invalid': errors.password })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className={classnames('form-control form-control-lg', { 'is-invalid': errors.password2 })}
                    placeholder="Confirm Password"
                    name="password2"
                    value={this.state.password2}
                    onChange={this.handleChange}
                  />
                  {errors.password2 && <div className="invalid-feedback">{errors.password2}</div>}
                </div>
                <input
                  type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

registerUser.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    errors: state.errors,
  }
};

export default connect(mapStateToProps, { registerUser })(Register);