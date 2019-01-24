import React from 'react';
import { fetchCapabilityToken } from '../../actions/token';

export default class TempLogin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accountSid: 'ACbbf902dfacb0654fedfb48ebf3ad4ea9',
      accountSidValidationError: '',
      authToken: 'b9c94d86a2215101d5eaac484589df32',
      authTokenValidationError: '',
      tokenRequestError: '',
    }
  }

/**
* Validates all form input and sets validation error messages as required.
* @returns {boolean} true if form submission is valid
*/

  validateForm = () => {
    if (!this.state.accountSid) {
      this.setState({ accountSidValidationError: 'Account SID is required'})
    }

    if (!this.state.authToken) {
      this.setState({ authTokenValidationError: 'Auth Token is required'})
    }
    return !(this.state.accountSidValidationError || this.state.authTokenValidationError);
  };

  handleInputChange = (event) => {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  };

  handleSubmit = () => {
    if (this.validateForm()) {
      fetchCapabilityToken(this.state.accountSid, this.state.authToken)
        .then(capabilityToken => {
          console.log('#### Returns Cadpabilitsillwilly Token #### ' + capabilityToken);
          
          //STORE THIS ON THE STORE
          this.props.onLogin(capabilityToken);
        })
        .catch(error => {
          console.log('Request failezzzz', error);
          this.setState({ tokenRequestError: error.toString() });
        });
    }
  };

  loginFailureMessage = () => {
    // Login failure will be caused either  by failure of token API...
    if (this.state.tokenRequestError) return this.state.tokenRequestError;

    // ...or by resulting token failing to initialise the Device.
    else if (this.props.deviceState === 'offline') return "Failed to initialise device with given credentials. Please check and try again.";

    else return;
  };

  render() {
    let showForm = '';
    if(this.props.visible) {
      showForm = (
        <div>
          <div>
            <header>
              <p>Login to Twilio</p>
            </header>
            <section>
              {this.loginFailureMessage() &&
                <div>
                  {this.loginFailureMessage()}
                </div>
              }
              <p>Login with your Twilio Account SID.</p>
              <div id="accountSidField">
                <label>Account SID</label>
                <div>
                  <div>
                    <div >
                      <input name="accountSid" type="text"
                        onChange={this.handleInputChange}/>
                    </div>
                    {this.state.accountSidValidationError &&
                      <p>{this.state.accountSidValidationError}</p>
                    }
                  </div>
                </div>
              </div>
              <div id="authTokenField">
                <label>Auth Token</label>
                <div>
                  <div>
                    <div>
                      <input name="authToken" type="password"
                        onChange={this.handleInputChange} />
                    </div>
                    {this.state.authTokenValidationError &&
                      <p>{this.state.authTokenValidationError}</p>
                    }
                  </div>
                </div>
              </div>
            </section>
            <footer>
              <button onClick={this.handleSubmit}>Login</button>
            </footer>
          </div>
        </div>
      )
    }
    return (

      <div>
        {showForm}
        </div>
    );
  };
}
