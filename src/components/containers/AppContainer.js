import React from 'react'; 
// import { refreshAuthToken } from '../actions/auth';

export default class AppContainer extends React.Component{ 

  // componentDidUpdate(prevProps) {
  //   if (!prevProps.loggedIn && this.props.loggedIn) {
  //     this.startPeriodicRefresh();
  //   } else if (prevProps.loggedIn && !this.props.loggedIn) {
  //     this.stopPeriodicRefresh();
  //   }
  // }

  // componentWillUnmount() {
  //   this.stopPeriodicRefresh();
  // }

  // startPeriodicRefresh() {
  //   this.refreshInterval = setInterval(
  //     () => this.props.dispatch(refreshAuthToken()),
  //     60 * 60 * 1000 // One hour
  //   );
  // }

  // stopPeriodicRefresh() {
  //   if (!this.refreshInterval) return;
  //   clearInterval(this.refreshInterval);
  // }

  render(){ 
    return (
      <div>HI GOOBEY</div>
    )
  }
}
