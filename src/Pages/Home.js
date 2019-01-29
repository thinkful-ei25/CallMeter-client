import React from 'react';
import { connect } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { RequiresLogin } from '../components/_utils/index._utils';
import { fetchCallStats } from '../actions/index.actions';
import { Sparklines, SparklinesCurve } from 'react-sparklines';
import '../styles/Dashboard.css';
import '../styles/Contacts.css'; 

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
          text: 'Your Call Stats'
        },
        maintainAspectRation: true
      }
    };
  }
  componentDidMount() {
    this.props.dispatch(fetchCallStats());
    console.log();
  }

  createSparklines(arr) {
    console.log('Data ', arr);
    return (
      <Sparklines width={250} height={130} data={arr}>
        <SparklinesCurve color="#ff6e54" width={230} height={130} />
      </Sparklines>
    );
  }

  createChart() {
    const data = {
      labels: this.props.datesArr,
      datasets: [
        {
          label: 'Total Calls',
          backgroundColor: '#003f5',
          data: this.props.callsArr.reverse()
        },
        {
          label: 'Total Time',
          backgroundColor: '#ff6361',
          data: this.props.durationArr.reverse()
        }
      ]
    };
    if (!this.props.loading) {
      return (
        <div>
          {/* TOP CHART */}
          <div className="panel-body">
            <Bar
              width={1200}
              height={500}
              data={data}
              options={this.props.options}
            />
          </div>
          {/* END OF TOP CHART //START OF CARDS */}
          <div className="row">
            {/* START OF First CARD */}
            <div className="col-md-6 card-row">
              <div className="stats-card">
                <div className="sparkline">
                  {this.createSparklines(this.props.durationArr)}
                </div>
                <div className="stats-text">
                  <div className="stats-title">Lifetime Minutes</div>
                </div>
                <div className="stats-data">
                  {this.props.durationTotal.toFixed(1)}
                </div>
              </div>
            </div>
            {/* END OF FIRST CARD */}
            {/* START OF SECOND CARD */}
            <div className="col-md-6 card-row">
              <div className="stats-card">
                <div className="sparkline">
                  {this.createSparklines(this.props.callsArr)}
                </div>
                <div className="stats-text">
                  <div className="stats-title">Lifetime Calls</div>
                </div>
                <div className="stats-data">{this.props.callsTotal}</div>
              </div>
            </div>
            {/* END OF SECOND CARD */}
          </div>
        </div>
      );
    }
  }

  rerender() {
    return <div>{this.createChart()}</div>;
  }

  render() {
    if (this.props.loading) {
      return (
        <div>
          <h2>Loading....</h2>
        </div>
      );
    } else {
      return (
        <div className="app-container">
          <section className="contacts">
            <div className="section-container">
              {/* START OF CHART AND CARDS */}
              <div className="chart-panel">
                {/* START OF PANEL HEADER */}
                <div className="panel-header">
                  <div className="panel-title">
                    <h3>Da Stats</h3>
                  </div>
                </div>
                 {/* END OF PANEL HEADER */}
                {this.rerender()}
              </div>
            </div>
          </section>
        </div>
      );
    }
  }
}
const mapStateToProps = state => {
  return {
    loading: state.callStats.loading,
    error: state.callStats.error,
    datesArr: state.callStats.datesArr
      ? state.callStats.datesArr.reverse()
      : [],
    durationArr: state.callStats.durationArr
      ? state.callStats.durationArr.reverse()
      : [],
    callsArr: state.callStats.callsArr
      ? state.callStats.callsArr.reverse()
      : [],
    durationTotal: state.callStats.durationTotal / 60,
    callsTotal: state.callStats.callsTotal,
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
  };
};

export default RequiresLogin()(connect(mapStateToProps)(Stats));