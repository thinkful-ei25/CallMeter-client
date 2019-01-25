import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { Link } from 'react-router-dom';
import { registerUser } from '../../../actions/users';
import { login } from '../../../actions/auth';
import Input from '../Input';
import {
  required,
  nonEmpty,
  matches,
  length,
  isTrimmed,
  emailCheck
} from '../../../validators';
import '../forms.css';
const passwordLength = length({ min: 10, max: 72 });
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    const { organizationName, password, email } = values;
    const user = { organizationName, password, email };
    return this.props
      .dispatch(registerUser(user))
      .then(() => this.props.dispatch(login(organizationName, password)));
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
        className="login-signup-form validate"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <span className="login-signup-form-title pad-bottom-50">
          Signup For Billable!
        </span>
        <Field
          component={Input}
					label="Organization Name"
          type="text"
          name="organizationName"
          validate={[required, nonEmpty, isTrimmed]}
          placeholder="Where do you work?"
        />
        <Field
          component={Input}
					label="Email Address"
          type="text"
          name="email"
          validate={[required, nonEmpty, isTrimmed, emailCheck]}
          placeholder="Where can we reach you?"
        />
        <Field
					component={Input}
					label="Password"
          type="password"
					name="password"
					id="password"
          validate={[required, passwordLength, isTrimmed]}
          placeholder="************"
        />
        <Field
					component={Input}
					label="Password"
          type="password"
          name="passwordConfirm"
          placeholder="************"
          validate={[required, nonEmpty, matchesPassword]}
        />
				<div className="login-signup-form-button-container">
					<div className="login-signup-form-button-wrapper">
          <button
							className="login-signup-form-button"
            	type="submit"
            	disabled={this.props.pristine || this.props.submitting}
          >
            Sign Up
          </button>
        </div>
					<Link className="link-text pad-right-30 pad-left-30 pad-top-10 pad-bottom-10" to="/login">
						or Login
          </Link>
				</div>
      </form>
    );
  }
}

export default reduxForm({
  form: 'registration',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
