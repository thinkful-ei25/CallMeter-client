import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
// import { fetchProtectedData } from '../../actions/protected-data';
import './dashboard.css'


export class MakeCall extends React.Component {
    // componentDidMount() {
    //     this.props.dispatch(fetchProtectedData());
    // }

    render() {
        return (
<div>
            <h1>Make Call</h1>

            <div className="callinput">
                
                <label htmlFor="callPhone">Choose Client:</label>
                <select>
                    <option value="client1">Client 1</option>
                    <option value="client2">Client 2</option>
                    <option value="client3">Client 3</option>
                    <option value="client4">Client 4</option>
                </select>
              
                
                <button className="callbutton" type="submit">Call</button>
            </div>
            </div>

        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        // username: state.auth.currentUser.username,
        // name: `${currentUser.firstName} ${currentUser.lastName}`,
        // protectedData: state.protectedData.data
    };
};

export default requiresLogin()(connect(mapStateToProps)(MakeCall));

// export default connect(mapStateToProps)(MakeCall);
