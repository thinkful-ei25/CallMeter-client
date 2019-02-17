import React, { Fragment } from 'react';
import { Field, reduxForm, focus, Form } from 'redux-form';
import { getPhoneNumbers } from '../../actions/users.action';
import { Input } from '../_utils/index._utils';
import { required, nonEmpty, isTrimmed, phoneCheck, normalizePhone } from '../../_utils/index.utils';


export class phoneSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numbers: [],
      numberSearch: '',
      disabled: true,
      phoneNumber: '',
    };
  }

  handleOptionChange = changeEvent => {
    this.setState({
      phoneNumber: changeEvent.target.value,
      disabled: false
    });
  };

  handleFormSubmit = formSubmitEvent => {
    this.props.incrementStep();
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
          // console.log('===========');
          // console.log(res);
          // console.log('===========');
          if (res) this.setState({ numbers: res });
        })
        .catch(err => {
          // console.log(err);
        });
    }
  };

  render() {
    // console.log('testing');
    return (
      <div>
        <Form className="form" onSubmit={this.handleFormSubmit}>
            <span className="form-title pad-bottom-50">
              Personal Information Setup
            </span>
            <Field
              component={Input}
              label="What's Your Phone Number"
              type="phone"
              name="phoneNumber"
              normalize={normalizePhone}
              validate={[required, nonEmpty, isTrimmed, phoneCheck]}
              placeholder="e.g. 941-231-3214"
            />
            <Field
              component={Input}
              label="Give This Number a Friendly Name"
              type="text"
              name="phoneNumberName"
              validate={[required, nonEmpty, isTrimmed]}
              placeholder="e.g. Jack's Phone or My Work Phone"
            />
            <span className="number-search-title pad-bottom-30">Your Billable Number</span>
            <div className="input-wrapper">
              <label className="label-input">Area Code</label>
              <input
                onChange={this.handleNumberSearch}
                className="input-fields"
                placeholder="Search by Area Code"
              />
            </div>
            <p className="label-input marg-bottom-10">Select an available phone number:</p>
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
                    <label
                      className="result-number num-across"
                      htmlFor={number.response}
                    >
                      {number.display}
                    </label>
                  </Fragment>
                );
              })}
            </div>
          <div className="form-button-container pad-top-30">
            <div className="form-button-wrapper">
              <button
                className="form-button"
                disabled={this.state.disabled}
              >
                Next Step
              </button>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'phoneSetup',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('phoneSetup', Object.keys(errors)[0]))
})(phoneSetup);
