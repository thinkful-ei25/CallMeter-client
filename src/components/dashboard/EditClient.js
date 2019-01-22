import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from '../registration/input';
import { required, nonEmpty, phoneCheck, normalizePhone } from '../../validators';
import { editClient } from '../../actions/client'



export class EditClient extends React.Component {


    componentDidMount() {

    }

    onSubmit(values) {
        console.log('values', values)
        return this.props.dispatch(editClient(values))
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
                <h1 className="formHeader">Edit a Client</h1>

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

                        validate={[required]}
                    />

                    <label htmlFor="password">First Name</label>
                    <Field
                        component={Input}
                        type="text"
                        name="firstName"
                        id="firstName"

                        validate={[required]}
                    />
                    <label htmlFor="lastName">Last Name</label>
                    <Field
                        component={Input}
                        type="text"
                        name="lastName"
                        id="lastName"

                        validate={[required]}
                    />
                    <label htmlFor="password">Hourly Rate</label>
                    <Field
                        component={Input}
                        type="number"
                        name="hourlyRate"
                        id="hourlyRate"

                        validate={[required]}
                    />
                    <label htmlFor="password">Phone Number</label>
                    <Field
                        component={Input}
                        type="text"
                        name="phoneNumber"
                        id="phoneNumber"

                        validate={[required, phoneCheck]}
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
    form: 'editClient',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(EditClient);