import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './Input';
import { login } from '../../actions/auth';
import { required, nonEmpty } from '../../validators';
import { Link } from 'react-router-dom';
import './forms.css';

export class LoginForm extends React.Component {
  onSubmit(values) {
    return this.props.dispatch(login(values.organizationName, values.password));
  }

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    return (
      <form
        className="form validate"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <span className="form-title pad-bottom-50">Welcome Back!</span>
        <Field
          component={Input}
          label="Organization Name"
          type="text"
          name="organizationName"
          validate={[required, nonEmpty]}
          placeholder="Name..."
        />
        <Field
          component={Input}
          label="Password"
          type="password"
          name="password"
          id="password"
          placeholder="************"
          validate={[required, nonEmpty]}
        />
        <div className="form-button-container">
					<div className="form-button-wrapper">
          <button
            className="form-button"
            disabled={this.props.pristine || this.props.submitting}
          >
            Login
          </button>
					</div>
					<Link className="link-text pad-right-30 pad-left-30 pad-top-10 pad-bottom-10" to="/register">
						or Sign-up
					</Link>
        </div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('login', 'organizationName'))
})(LoginForm);
