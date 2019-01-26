import React, { Fragment } from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser, getPhoneNumbers } from '../../actions/users';
import { login } from '../../actions/auth';
import Input from '../forms/Input';
import { required, nonEmpty, isTrimmed, phoneCheck } from '../../validators';
import '../setupPhone/SetupPhone.css';
import './accountModal.css';

export class PhoneSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: [],
      numberSearch: '',
      disabled: true,
      phoneNumber: '',
      lastButton: null
    };
  }

  handleOptionChange = changeEvent => {
    this.setState({
      phoneNumber: changeEvent.target.value,
      disabled: false
    });
  };

  handleFormSubmit = formSubmitEvent => {
    // this.props.dispatch(addPhone(formSubmitEvent))
    // return <Redirect to="/setup/phone" />
  };

  //TODO: UPDATE THE CATCH
  //TODO: Should dispatch to get all numbers on mount?
  //TODO: Limit phone numbers returned

  handleNumberSearch = e => {
    if (e.target.value.length === 3) {
      this.props
        .dispatch(getPhoneNumbers(e.target.value))
        .then(res => {
          if (res) this.setState({ numbers: res });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

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
      <div>
        <form
          className="login-signup-form"
          onSubmit={this.handleFormSubmit}
        >
          <section className="personal-phone">
            <span className="login-signup-form-title pad-bottom-50">
              Personal Information Setup
            </span>

            <Field
              component={Input}
              label="What's Your Phone Number"
              type="phone"
              name="phoneNumber"
              validate={[required, nonEmpty, isTrimmed, phoneCheck]}
              placeholder="What number do you receive work calls?"
            />

            <Field
              component={Input}
              label="Give This Number a Friendly Name"
              type="text"
              name="phoneNumberName"
              validate={[required, nonEmpty, isTrimmed]}
              placeholder="e.g. Jack's Phone or My Work Phone"
            />
          </section>
          <section className="twilio-number clearfix">
            <span className="number-search-title pad-bottom-30">
              Your Billable Number
            </span>

            <div className="input-wrapper">
              <label className="label-input">Area Code</label>
              <input
                onChange={this.handleNumberSearch}
                className="input-fields"
                placeholder="Search by Area Code"
              />
            </div>
            <p className="label-input marg-bottom-10">
              Select an available phone number:{' '}
            </p>
            <div className="number-search-results pad-top-10">
              {this.state.numbers.map((number, index) => {
                return (
                  <Fragment key={index}>
                    <input
                      type="radio"
                      id={number.response}
                      name="number"
                      checked={this.state.phoneNumber === number.response}
                      value={number.response}
                      onChange={this.handleOptionChange}
                    />
                    <label className="result-number num-across" htmlFor={number.response}>
                      {number.display}
                    </label>
                  </Fragment>
                );
              })}
            </div>
          </section>
          <div className="login-signup-form-button-container pad-top-30">
            <div className="login-signup-form-button-wrapper">
              <button
                className="login-signup-form-button"
                disabled={this.props.invalid || this.state.disabled}
              >
                Next Step
            </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'phoneSetup',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('phoneSetup', Object.keys(errors)[0]))
})(PhoneSetup);
