import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import anime from 'animejs';
import '../../styles/Menu.css';
import {
  contacts,
  close,
  invoices,
  calls,
  settings,
  home,
  hamburger,
  callsTwo,
  closeTwo,
  contactsTwo,
  dashboard,
  invoicesTwo,
  menu,
  profile
} from '../../images/menu/index.menu';

export class navBar extends React.Component {
  async startAnimation(e) {
    // console.log(e);
    const buttons = document.getElementsByClassName('aniButton');
    const currentButton = document.getElementsByClassName('dots')[0];
    // console.log(buttons);
    if (buttons[0].style.visibility === 'visible') {
      currentButton.src = menu;
      for (let i = 0; i < buttons.length; i++) {
        await anime({
          targets: buttons[i],
          translateY: 0,
          duration: 1000,
          complete: function() {
            buttons[i].style.visibility = 'hidden';
          }
        });
      }
    } else {
      currentButton.src = closeTwo;
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.visibility = 'visible';
        anime({
          targets: buttons[i],
          translateY: -50 * (i + 1),
          duration: 2000
        });
      }
    }
  }

  render() {
    return (
      <div className="buttonContainer">
        <div className="fixed">
          <Link to="/app">
            <img
              onClick={e => this.startAnimation()}
              alt="home"
              className="aniButton"
              src={dashboard}
            />
          </Link>
          <Link to="/app/contacts">
            <img
              onClick={e => this.startAnimation()}
              alt="contacts"
              className="aniButton"
              src={contactsTwo}
            />
          </Link>
          <Link to="/app/calls">
            <img
              onClick={e => this.startAnimation()}
              alt="calls"
              className="aniButton"
              src={callsTwo}
            />
          </Link>
          <Link to="/app/invoices">
            <img
              onClick={e => this.startAnimation()}
              alt="invoices"
              className="aniButton"
              src={invoicesTwo}
            />
          </Link>
          <Link to="/app/settings">
            <img
              onClick={e => this.startAnimation()}
              alt="settings"
              className="aniButton"
              src={profile}
            />
          </Link>
          <img
            alt="main"
            className="dots"
            src={menu}
            onClick={e => this.startAnimation(e)}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
  };
};

export default withRouter(connect(mapStateToProps)(navBar));


// import React from 'react';
// import { connect } from 'react-redux';
// import { Link, withRouter } from 'react-router-dom';
// import anime from 'animejs';
// import '../../styles/Menu.css';
// import { contacts, close, invoices, calls, settings, home, hamburger } from '../../images/menu/index.menu';

// export class navBar extends React.Component {

//   async startAnimation(e) {
//     const buttons = document.getElementsByClassName('aniButton');
//     const currentButton = document.getElementsByClassName('dots')[0];
//     if (buttons[0].style.visibility === 'visible') {
//       currentButton.src = hamburger;
//       for (let i = 0; i < buttons.length; i++) {
//         await anime({
//           targets: buttons[i],
//           translateY: 50 * (i + 1),
//           duration: 300,
//           complete: function () {
//             buttons[i].style.visibility = 'hidden';
//           }
//         })
//       }
//     }
//     else {
//       currentButton.src = close;
//       for (let i = 0; i < buttons.length; i++) {
//         buttons[i].style.visibility = "visible";
//         anime({
//           targets: buttons[i],
//           translateY: -50 * (i + 1),
//           duration: 2000
//         })
//       }
//     }
//   }

//   render() {
//     return (
//       <div className="buttonContainer">
//         <div className="fixed">
//           <Link to="/app/invoices"><img onClick={e => this.startAnimation()} alt='invoices' className="aniButton" src={invoices}></img></Link>
//           <Link to="/app/contacts"><img onClick={e => this.startAnimation()} alt='contacts' className="aniButton" src={contacts}></img></Link>
//           <Link to="/app"><img onClick={e => this.startAnimation()} alt='home' className="aniButton" src={home}></img></Link>
//           <Link to="/app/calls"><img onClick={e => this.startAnimation()} alt='calls' className="aniButton" src={calls}></img></Link>
//           <Link to='/app/settings'><img onClick={e => this.startAnimation()} alt='settings' className='aniButton' src={settings}></img></Link>
//           <img alt='main' className="dots" src={hamburger} onClick={e => this.startAnimation(e)}></img>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return ({
//     hasAuthToken: state.auth.authToken !== null,
//     loggedIn: state.auth.currentUser !== null
//   });
// }

// export default withRouter(connect(mapStateToProps)(navBar));