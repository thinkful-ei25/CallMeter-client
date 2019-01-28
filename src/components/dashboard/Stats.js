import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { Line, Bar } from 'react-chartjs-2';
import { fetchCallStats } from '../../actions/callStats.action';

export class Stats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          labels: [],
          data: [],
          options: {
            rectangle: {
              borderWidth: 1,
              borderColor: 'rgb(255,255,255)'
            },
            title: {
              display: true,
              text: 'You Call Stats'
            }
          }
        };
    }
    componentDidMount() {
        this.props.dispatch(fetchCallStats());
        console.log()
    }

    createChart() {
      const data = {
        labels: this.props.datesArr,
        datasets: [
          {
            label: 'Total Calls',
            backgroundColor: '#003f5',
            data: this.props.callsArr,
          },
          {
            label: 'Total Time',
            backgroundColor: '#ff6361',
            data: this.props.durationArr
          }

        ]
      }
      if(!this.props.loading) {
        return (
          <div>
            <h2></h2>
            <Bar
              data={data}
              options={this.props.options
              }
            />
          </div>
        )
      } 
    }

    rerender(){
      return <div>
        {this.createChart()}
      </div>
    }


    render() {
  if(this.props.loading) {
    return <h2>Loading....</h2>
  } else {
    return this.rerender();
  }

    }
}
const mapStateToProps = state => {
    const { currentUser } = state.auth;
    console.log(state);
    return {
        loading: state.callStats.loading,
        error: state.callStats.error,
        datesArr: state.callStats.datesArr,
        durationArr: state.callStats.durationArr,
        callsArr: state.callStats.callsArr,
        durationTotal: state.callStats.durationTotal,
        callsTotal: state.callStats.callsTotal,
        hasAuthToken: state.auth.authToken !== null,
        loggedIn: state.auth.currentUser !== null
    };
};

export default requiresLogin()(connect(mapStateToProps)(Stats));
