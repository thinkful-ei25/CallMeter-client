import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../../actions/users';
import {login} from '../../actions/auth';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed, emailCheck, phoneCheck} from '../../validators';
import './SetupPhone.css';
const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('password');


export class SetupPhone extends React.Component {
    onSubmit(values) {
        const {username, password, firstName, lastName} = values;
        const user = {username, password, firstName, lastName};
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    render() {
        return (
            <div>
                <div className="vhHeader">

                </div>
                <div className="fullPage">
                    <div className="registrationPageContainer shadow">  
                        <div className="topFormContainer noLine">
                            <div className="registrationDescription">
                                <h3 className="title phoneMargin">Billable</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                                labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                                laboris nisi ut aliquip ex ea commodo consequat.</p>
                            </div>
                            <div className="phoneFormContainer">
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
                                    <label htmlFor="firstName">Company name</label>
                                    <Field
                                        component={Input}
                                        type="text"
                                        name="companyName"
                                        className="formInputHeight"
                                        validate={[required, nonEmpty, isTrimmed]}
                                    />
                                    <button
                                        type="submit"
                                        disabled={this.props.pristine || this.props.submitting}>
                                        Sign Up
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="vhFooter">

                </div>
            </div>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(SetupPhone);

