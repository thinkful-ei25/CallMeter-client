import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from '../registration/input';
import {required, nonEmpty, phoneCheck, normalizePhone} from '../../validators';
import {addClient} from '../../actions/client';


export class AddClient extends React.Component {
    onSubmit(values) {
        console.log('values', values)
        return this.props.dispatch(addClient(values))
        .then(this.props.toggle())
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
            <div>
            <h1>Add a Client</h1>
            <button onClick={() => this.props.toggle()}>Go Back</button>
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
                <label htmlFor="password">Hourly Rate</label>
                <Field
                    component={Input}
                    type="number"
                    name="hourlyRate"
                    id="hourlyRate"
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
                <button className="signUpButton" disabled={this.props.pristine || this.props.submitting}>
                    Submit
                </button>
               
            </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'addclient',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(AddClient);