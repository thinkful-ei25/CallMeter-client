import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../../actions/users';
import { login } from '../../actions/auth';
import Input from './input';
import { required, nonEmpty, matches, length, isTrimmed, emailCheck, phoneCheck } from '../../validators';
import './SetupPhone.css';
const passwordLength = length({ min: 10, max: 72 });
const matchesPassword = matches('password');


export class SetupPhone extends React.Component {
    onSubmit(values) {
        const { username, password, firstName, lastName } = values;
        const user = { username, password, firstName, lastName };
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    render() {
        return (
            <div className="background">
                <div className="navBar">
                    <div className="navBarLeft">
                        <img className="logo" src={require("../../resources/logo.jpg")}></img>
                    </div>
                    <div className="navBarMiddle">
                    </div>
                    <div className="navBarRight"></div>
                </div>
                <div className="setupFormContainer">
                <div className="registrationDescription">
                    <h3 className="title">Billable</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                       Nullam tortor nulla, rhoncus at laoreet quis, pretium at
                       elit. Nunc posuere vel metus a feugiat. Etiam dignissim erat
                        ut neque accumsan, mattis vestibulum ex auctor. Nam accumsan
                        sollicitudin odio id mollis. Nunc mi diam, convallis a nisi et,
                        molestie ultricies urna. Etiam sodales ut est ut</p>
                </div>
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
                        <label htmlFor="firstName">Name of Billable Number</label>
                        <Field
                            component={Input}
                            type="text"
                            name="companyName"
                            validate={[required, nonEmpty, isTrimmed]}
                        />
                        <button
                            type="submit"
                            className="signUpButton"
                            disabled={this.props.pristine || this.props.submitting}>
                            Sign Up
                                        </button>
                    </form>
                </div>
                <div className="footer">

                </div>
            </div >
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(SetupPhone);

