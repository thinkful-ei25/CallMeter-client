import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { Input } from '../_utils/index._utils';
import {
  matches,
  length,
  normalizePhone
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
          normalize={normalizePhone}
          name="organizationPhoneNumber"
          placeholder="Your New Phone"
        />
        <Field
          component={Input}
          label="Your Hourly Rate"
          type="number"
          name="hourlyRate"
          id="hourlyRate"
          placeholder="100"
        />
        <Field
          component={Input}
          label="Email Address"
          type="text"
          name="email"
          placeholder="Where can we reach you?"
        />
        <Field
					component={Input}
					label="Change Password"
          type="password"
					name="password"
					id="password"
          placeholder="************"
        />
        <Field
					component={Input}
					label="Confirm New Password"
          type="password"
          name="passwordConfirm"
          placeholder="************"
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
