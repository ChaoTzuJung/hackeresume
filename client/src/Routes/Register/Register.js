import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../actions/auth';
import TextFeildGroup from '../../components/TextFeildGroup';

const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  })

  const { name, email, password, password2 } = formData;

  // copy old state and add new state to place old state
  const handleChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    if(password !== password2) {
      console.log('password do not match');
    } else {
      console.log(formData);
    }
  }

  // 不希望登入後，還能透過修改網址，進入到register頁面
  componentDidMount() {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  // 重要: error不要變成props原因
  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
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

    this.props.registerUser(newUser, this.props.history)
  }

    return (
      <Fragment>
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create your DevConnector account</p>
              {/* noValidate  */}
              <form noValidate onSubmit={e => handleSubmit(e)}>
                <TextFeildGroup 
                  placeholder="Name"
                  name="name"
                  value={name}
                  onChange={e => handleChange(e)}
                  error={errors.name}
                />
                <TextFeildGroup 
                  type="email"
                  placeholder="Email Address"
                  name="email"
                  value={email}
                  onChange={e => handleChange(e)}
                  error={errors.email}
                  info="This site uses Gravatar so if you want a profile image, use a Gravatar email"
                />
                <TextFeildGroup 
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={e => handleChange(e)}
                  error={errors.password}
                />
                <TextFeildGroup 
                  type="password"
                  placeholder="Confirm Password"
                  name="password2"
                  value={password2}
                  onChange={e => handleChange(e)}
                  error={errors.password2}
                />
                <input
                  type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    )
};

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

export default connect(mapStateToProps, { registerUser })(withRouter(Register));