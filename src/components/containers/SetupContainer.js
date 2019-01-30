import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, withRouter } from 'react-router-dom';
import PhoneSetup from '../forms/PhoneSetup';
import AccountSetup from '../forms/AccountInfoForm';
import ContactForm from '../forms/ContactForm';
import {completeTutorial} from '../../actions/users.action'
import { API_BASE_URL } from '../../config';
import '../../styles/Setup.css'

export class SetupContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
    };
  }

  incrementStep = () => {
    console.log("incrementing step");
    this.setState({
      step : this.state.step + 1,
    })
  }

  content = () => {
    if(this.state.step === 0){
      return <AccountSetup incrementStep= {this.incrementStep}/>
    }
    else if(this.state.step === 1){
      return <PhoneSetup incrementStep={this.incrementStep}/>
    }
    else if(this.state.step === 2){
      return <ContactForm incrementStep={this.incrementStep}/>
    }
    else{
      this.props.dispatch(completeTutorial());
      return <Redirect to="/app" />;
    }
  }

  render(){
    console.log(this.state.step);
  return (
    <div className="setupFlexWrap">
      <div className="bracket bracketRight">
        {this.content()}
      </div>
    </div>
  );
  }
}

const mapStateToProps = state => {
  return ({
    authToken: state.auth.authToken,
    loggedIn: state.auth.currentUser !== null
  })
};

export default withRouter(connect(mapStateToProps)(SetupContainer));
