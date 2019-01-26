import React from 'react';
import { required, nonEmpty, isTrimmed, phoneCheck } from '../../validators';
import Input from './input';
import { Field, reduxForm, focus } from 'redux-form';


export class SetupPhoneForm extends React.Component {
  onSubmit(values){
    console.log(values);
  }
  
  render() {
    return (
      <form
        className="loginForm"
        onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
        )}>
        <label htmlFor="phone">What's your phone number?</label>
        <Field
          component={Input}
          type="text"
          name="phone"
          validate={[required, nonEmpty, isTrimmed, phoneCheck]}
        />
        <div className="lineBreak"></div>
        <label htmlFor="firstName">Name of Billable Number</label>
        <Field
          component={Input}
          type="text"
          name="companyName"
          validate={[required, nonEmpty, isTrimmed]}
        />
      </form>
    )
  }
}

export default reduxForm({
	form: 'registration',
	onSubmitFail: (errors, dispatch) =>
		dispatch(focus('registration', Object.keys(errors)[0]))
})(SetupPhoneForm);