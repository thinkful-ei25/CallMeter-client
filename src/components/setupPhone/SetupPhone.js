import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../../actions/users';
import { login } from '../../actions/auth';
import Input from './input';
import { required, nonEmpty, matches, length, isTrimmed, emailCheck, phoneCheck } from '../../validators';
import './SetupPhone.css';


export class SetupPhone extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            numbers : [],
            numberSearch: ''
        }
    }

    componentDidMount(){
        this.setupNumberArray();
    }
    
    setupNumberArray(){
        let array = [];
        for(let i = 0; i < 200; i++){
            let string = '';
            for(let j = 0; j < 10; j++){
                string += String(Math.floor(Math.random() * 10));
                if(j === 2 || j === 5){
                    string+= '-';
                }
            }
            array.push(string);
        }
        this.setState({
            numbers:array
        })
    }

    onSubmit(values) {
        const { username, password, firstName, lastName } = values;
        const user = { username, password, firstName, lastName };
        return this.props
            .dispatch(registerUser(user))
            .then(() => this.props.dispatch(login(username, password)));
    }

    handleNumberSearchChange(e){
        this.setState({
            numberSearch : e.target.value
        })
    }

    render() {
        console.log(this.state.numberSearch);
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
                <div className="setupFormContainer shadow">
                <div style={{border:"none"}} className="topFormContainer">
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
                            <div className="lineBreak"></div>
                            <label style={{paddingTop:"100px"}} htmlFor="firstName">Name of Billable Number</label>
                            <Field
                                component={Input}
                                type="text"
                                name="companyName"
                                validate={[required, nonEmpty, isTrimmed]}
                            />
                        </form>
                        <div className="lineBreak"></div>
                        <h3>Select your Billable Phone Number</h3>
                        <p>Area Code</p>
                        <input onChange={e => this.handleNumberSearchChange(e)} className="digitInput" placeholder="Search by Digits (Optional)"></input>
                        <p>Select an available phone number: </p>
                        <div className="buttonContainer">
                            {
                                this.state.numbers.filter(number => number.startsWith(this.state.numberSearch)).map((number, index) => {
                                    return (
                                        <button className="numberButton" id={index}>{number}</button>
                                    )
                                })
                            }
                        </div>
                        <div className="submitButton">
                            <button className="phoneSubmitButton">Submit</button>
                        </div>
                    </div>
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

