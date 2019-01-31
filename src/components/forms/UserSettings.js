import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { Input } from '../_utils/index._utils';
import {
  required,
  nonEmpty,
  matches,
  length,
  isTrimmed,
  emailCheck
} from '../../_utils/index.utils';
const passwordLength = length({ min: 10, max: 72 });
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {

  //THIS HAS NOT BEEN SET UP YET
  onSubmit(values) {
    
  }

  render() {
    return (
      <form
        className="form validate"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <Field
          component={Input}
					label="Change Organization Phone Number"
          type="text"
          name="organizationPhoneNumber"
          validate={[required, nonEmpty, isTrimmed]}
          placeholder="Your New Phone"
        />
         <Field
          component={Input}
					label="Change Hourly Rate"
          type="text"
          name="email"
          validate={[required, nonEmpty, isTrimmed, emailCheck]}
          placeholder="Your New Email Address"
        />
        <Field
					component={Input}
					label="Change Password"
          type="password"
					name="password"
					id="password"
          validate={[required, passwordLength, isTrimmed]}
          placeholder="************"
        />
        <Field
					component={Input}
					label="Confirm New Password"
          type="password"
          name="passwordConfirm"
          placeholder="************"
          validate={[required, nonEmpty, matchesPassword]}
        />
				<div className="form-button-container">
					<div className="form-button-wrapper">
          <button
							className="form-button"
            	type="submit"
            	disabled={this.props.pristine || this.props.submitting}
          >
            Submit Changes
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
