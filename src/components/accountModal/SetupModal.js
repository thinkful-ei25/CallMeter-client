import React from 'react';
import { Route } from 'react-router-dom'; 
import loginImg from '../forms/loginImg.jpg';
import '../forms/forms.css';
import PhoneSetup from './PhoneSetup';
import PersonalSetup from './PersonalSetup';
import OrganizationSetup from './OrganizationSetup';

export default function SetupModal(props) {
  
  const imgStyle = {
    backgroundImage: 'url(' + loginImg + ')'
  };

  return (
    <div>
      <div className="form-container">
        <div className="login-signup-img" style={imgStyle} />
        <div className="login-signup-form-wrapper pad-50">
          <Route path="/setup/personal" component={PersonalSetup} />
          <Route path="/setup/phone" component={PhoneSetup} />
          <Route path="/setup/organization" component={OrganizationSetup} />
        </div>
      </div>
    </div>
  );
}

// export class SetupModal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       numbers: [],
//       numberSearch: '',
//       disabled: true,
//       phoneNumber: '',
//       lastButton: null
//     }
//   }

//   if (props.loggedIn) {
//     return <Redirect to="/dashboard" />;
//   }
//   const imgStyle = {
//     backgroundImage: 'url(' + loginImg + ')'
//   };
//   return (
//     <div>
//       <div className="form-container">
//         <div className="login-signup-img" style={imgStyle} />
//         <div className="login-signup-form-wrapper pad-50">
//           <LoginForm />
//         </div>
//       </div>
//     </div>
//   );
// }

// const mapStateToProps = state => ({
//   loggedIn: state.auth.currentUser !== null
// });

// export default connect(mapStateToProps)(Login);
