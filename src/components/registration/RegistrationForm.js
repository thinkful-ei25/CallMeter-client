import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {Link} from 'react-router-dom'
import {registerUser} from '../../actions/users';
import {login} from '../../actions/auth';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed, emailCheck} from '../../validators';
import './Registration.css';
const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('password');


export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {username, password, firstName, lastName} = values;
        const user = {username, password, firstName, lastName};
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    render() {
        return (
            
            <form
                className="loginForm"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                
                <label htmlFor="firstName">Company name</label>
                <Field
                    component={Input}
                    type="text"
                    name="companyName"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                
                <label htmlFor="email">Email Address</label>
                <Field
                    component={Input}
                    type="text"
                    name="email"
                    validate={[required, nonEmpty, isTrimmed, emailCheck]}
                />
                <label htmlFor="password">Password</label>
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    placeholder="Make it Secure!"
                    validate={[required, passwordLength, isTrimmed]}
                />
                <label htmlFor="passwordConfirm">Confirm password</label>
                <Field
                    component={Input}
                    type="password"
                    name="passwordConfirm"
                    placeholder="Make it Secure!"
                    validate={[required, nonEmpty, matchesPassword]}
                />
                <div className="bottom-buttons">
                <button
                    className="signUpButton"
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Sign Up
                </button>
                <Link class="login-link" to="/">Login</Link>
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
