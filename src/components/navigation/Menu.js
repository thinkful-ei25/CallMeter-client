import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import anime from 'animejs'; 
import '../../styles/Menu.css'; 
import { contacts, close, invoices, calls, settings, home, hamburger } from '../../images/menu/index.menu'; 

export class navBar extends React.Component {

  async startAnimation(e) {
    const buttons = document.getElementsByClassName('aniButton');
    const currentButton = e.currentTarget;
    if (buttons[0].style.visibility === 'visible') {
      currentButton.src = { hamburger };
      for (let i = 0; i < buttons.length; i++) {
        await anime({
          targets: buttons[i],
          translateY: 50 * (i + 1),
          duration: 300,
          complete: function () {
            buttons[i].style.visibility = 'hidden';
          }
        })
      }
    }
    else {
      currentButton.src = close;
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].style.visibility = "visible";
        anime({
          targets: buttons[i],
          translateY: -50 * (i + 1),
          duration: 2000
        })
      }
    }
  }

  render() {
    return (
      <div className="buttonContainer">
        <div className="fixed">
          <Link to="/app/invoices"><img alt='invoices' className="aniButton" src={invoices}></img></Link>
          <Link to="/app/clients"><img alt='clients' className="aniButton" src={contacts}></img></Link>
          <Link to="/dashboard"><img alt='home' className="aniButton" src={home}></img></Link>
          {/* <Link to="/dashboard/call"><img alt='calls' className="aniButton" src={calls}></img></Link> */}
          <Link to='/app/settings'><img alt='settings' className='aniButton' src={settings}></img></Link>
          <img alt='main' className="dots" src={hamburger} onClick={e => this.startAnimation(e)}></img>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
  });
}

export default withRouter(connect(mapStateToProps)(navBar));
