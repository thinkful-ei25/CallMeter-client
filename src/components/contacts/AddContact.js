import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import FileInput from '../_utils/_fileInput'
import Input from '../_utils/_input'
import { required, nonEmpty, phoneCheck, normalizePhone, emailCheck } from '../../_utils/_validators';
import { contacts } from '../../images/forms/index.forms'
import { addClient } from '../../actions/index.actions'


export class AddContact extends React.Component {
  onSubmit(values) {
    // console.log('values', values)

    this.props.dispatch(addClient(values))
    this.props.toggle()
  }



  render() {
    let imgStyle = {
      backgroundImage: 'url(' + contacts + ')'
    };
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );

    }
    return (
      <div className="form-container">
        <div className="img-sized" style={imgStyle} />
        <div className="form-wrapper pad-50">
          <h1 className="formHeader">Add a Contact</h1>
          <h2><button className="backButton" onClick={() => this.props.toggle()}>Cancel ⬅</button></h2>

          <form
            className="loginForm"
            onSubmit={this.props.handleSubmit(values =>
              this.onSubmit(values)
            )}>
            {error}
            <label htmlFor="company">Company</label>
            <Field
              component={Input}
              type="text"
              name="company"
              validate={[required, nonEmpty]}
            />

            <label htmlFor="password">First Name</label>
            <Field
              component={Input}
              type="text"
              name="firstName"
              id="firstName"
              validate={[required, nonEmpty]}
            />
            <label htmlFor="lastName">Last Name</label>
            <Field
              component={Input}
              type="text"
              name="lastName"
              id="lastName"
              validate={[required, nonEmpty]}
            />

            <label htmlFor="password">Phone Number</label>
            <Field
              component={Input}
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              validate={[required, nonEmpty, phoneCheck]}
              normalize={normalizePhone}
            />
            <label htmlFor="email">Email</label>
            <Field
              component={Input}
              type="email"
              name="email"
              id="email"
              validate={[emailCheck]}
            />
            <label htmlFor="street1">Street 1</label>
            <Field
              component={Input}
              type="text"
              name="streetOne"
              id="streetOne"

            />
            <label htmlFor="street2">Street 2</label>
            <Field
              component={Input}
              type="text"
              name="streetTwo"
              id="streetTwo"

            />
            <label htmlFor="city">City</label>
            <Field
              component={Input}
              type="text"
              name="city"
              id="city"

            />
            <label htmlFor="state">State</label>
            <Field
              component={Input}
              type="text"
              name="state"
              id="state"

            />
            <label htmlFor="zip">Zip</label>
            <Field
              component={Input}
              type="text"
              name="zip"
              id="zip"

            />

            <label htmlFor="password">Hourly Rate</label>
            <Field
              component={Input}
              type="number"
              name="hourlyRate"
              id="hourlyRate"
              validate={[required, nonEmpty]}
            />

            <label className="clientFormPhotoLabel" htmlFor="category">Category</label>
            <Field
              component="select"
              name="category"
              id="category"

            >
              <option selected value="Client">Client</option>
              <option value="Friend">Friend</option>
              <option value="Enemy">Enemy</option>
            </Field>

            <label className="clientFormPhotoLabel" htmlFor="photo">Photo</label>
            <Field
              component={FileInput}
              type="file"
              name="photo"
              id="photo"
            />
            <Field
              component={Input}
              type="hidden"
              name="photo64"
              id="photo64"
            />
            <button className="signUpButton" disabled={this.props.pristine || this.props.submitting}>
              Submit
                  </button>

          </form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'addClient',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('addClient', Object.keys(errors)[0]))
})(AddContact);
