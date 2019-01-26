import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import FileInput from '../forms/FileInput';
import Input from '../forms/Input';
import { addClient } from '../../actions/client';

import {
  required,
  nonEmpty,
  matches,
  length,
  isTrimmed,
  emailCheck
} from '../../validators';
import '../forms/forms.css';
const passwordLength = length({ min: 10, max: 72 });
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
  onSubmit(values) {
    this.props.dispatch(addClient(values));
    this.props.toggle();
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
          Personal Information Setup
        </span>
        <Field
          component={Input}
          label="Your First Name"
          type="text"
          name="firstName"
          validate={[required, nonEmpty, isTrimmed]}
          placeholder="What do you like to be called?"
        />
        <Field
          component={Input}
          label="Your Last Name"
          type="text"
          name="lastName"
          validate={[required, nonEmpty, isTrimmed, emailCheck]}
          placeholder="What's your family name?"
        />
        <Field
          component={Input}
          label="Your Hourly Rate"
          type="number"
          name="hourlyRate"
          id="hourlyRate"
          validate={[required, passwordLength, isTrimmed]}
          placeholder="100"
        />
        <Field
          component={FileInput}
          type="file"
          name="photo"
          id="photo"
          label="Profile Photo"
        />
        <Field component={Input} type="hidden" name="photo64" id="photo64" />
        <div className="login-signup-form-button-container">
          <div className="login-signup-form-button-wrapper">
            <button
              className="login-signup-form-button"
              type="submit"
              disabled={this.props.pristine || this.props.submitting}
            >
              Next Step
            </button>
          </div>
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
