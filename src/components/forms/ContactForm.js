import React from 'react';
import { Field, reduxForm, focus, Form } from 'redux-form';
import { Input, FileInput } from '../_utils/index._utils';
import { required, nonEmpty, phoneCheck, normalizePhone, emailCheck, isTrimmed } from '../../_utils/index.utils';
import { addClient } from '../../actions/index.actions'



export class AddClient extends React.Component {
  onSubmit(values) {
    this.props.incrementStep();
    this.props.dispatch(addClient(values))
    //this.props.toggle()
    // console.log('testing working on contact form');
  }

  render() {
    return (
      <div>
        <div>
          <h1 className="formHeader">Add a Contact</h1>
          <h2><button className="backButton" onClick={() => this.props.toggle()}>Cancel ⬅</button></h2>

          <Form
            className="loginForm"
            onSubmit={this.props.handleSubmit(values => {
              // console.log("values printing", values);
              this.onSubmit(values)
            }
            )}>
            <Field
              component={Input}
              label="Company Name"
              type="text"
              name="company"
              id="companyName"
              validate={[required, nonEmpty]}
              placeholder="Where do they work?"
            />
            <Field
              component={Input}
              label="First Name"
              type="text"
              name="firstName"
              id="firstName"
              validate={[required, nonEmpty]}
              placeholder="Jessica"
            />
            <Field
              component={Input}
              label="Last Name"
              type="text"
              name="lastName"
              id="lastName"
              validate={[required, nonEmpty]}
              placeholder="Rodgers"
            />
            <Field
              component={Input}
              label="Phone Number"
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              validate={[required, nonEmpty, phoneCheck]}
              normalize={normalizePhone}
              placeholder="555-678-1267"
            />
            <Field
              component={Input}
              label="Email Address"
              type="email"
              name="email"
              id="email"
              validate={[emailCheck, isTrimmed]}
              placeholder="Jessica@billable.com"
            />
            <Field
              component={Input}
              label="Street Address"
              type="text"
              name="streetOne"
              id="streetOne"
              placeholder="1600 Pennslyvania Avenue. NW"
            />
            <Field
              component={Input}
              label="Suite/Apt."
              type="text"
              name="streetTwo"
              id="streetTwo"
              placeholder="Suite 320"
            />
            <Field
              component={Input}
              label="City"
              type="text"
              name="city"
              id="city"
              placeholder="Washington"
            />
            <Field
              component={Input}
              label="State"
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
            <Field
              component={Input}
              label="Hourly Rate"
              type="number"
              name="hourlyRate"
              id="hourlyRate"
              placeholder="Leave blank if default rate/"
            />

            <label className="clientFormPhotoLabel" htmlFor="category">Category</label>
            <Field
              component="select"
              name="category"
              id="category"
            >
              <option value="Client">Client</option>
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

          </Form>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'addClient',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('addClient', Object.keys(errors)[0]))
})(AddClient);