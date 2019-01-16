import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from '../requires-login';
import { fetchProtectedData } from '../../actions/protected-data';
import { Line } from 'react-chartjs-2';




export class Stats extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            arrays : {},
            singleArray : {},
            keys: [],
            option: 0,
            categories: ['minutes', 'hours', 'months', 'centuries']
        }
    }
    componentDidMount() {
        this.randomizeData();
        this.props.dispatch(fetchProtectedData());
    }

    randomizeData(){
        let obj = {};
        let keyArray = [];
        for(let i = 0; i < 10; i++){
            let array = [];
            let string = '';
            for(let k = 0; k < 4; k++){
                let tempArray = []
                for(let j = 0; j < 12; j++){
                    tempArray.push(Math.floor(Math.random() * 50 + 1))
                }
                array.push(tempArray)
            }
            for(let j = 0; j < 12; j++){
                array.push(Math.floor(Math.random() * 50 + 1))
                string += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
            }
            keyArray.push(string);
            obj[string] = array;
        }
        let test = {};
        test[keyArray[0]] = obj[keyArray[0]];
        this.setState({
            singleArray: test,
            arrays : obj,
            keys : keyArray
        })
        
    }

    setdataSets(){
        let returnArray = [];
        for(let keys in this.state.singleArray){
            let tempObj = {
                label: keys,
                backgroundColor: 'transparent',
                borderColor: `rgb(${Math.floor(Math.random() * 255 + 1)}, ${Math.floor(Math.random() * 255 + 1)}, ${Math.floor(Math.random() * 255 + 1)})`,
                data: this.state.singleArray[keys][this.state.option]
            }
            returnArray.push(tempObj);
        }
        return returnArray;
    }

    onSelectChange(e){
        let obj = {};
        obj[e.target.value] = this.state.arrays[e.target.value];
        this.setState({
            singleArray : obj
        })
    }

    onCategoryChange(e){
        this.setState({
            option: e.target.value
        })
    }

    render() {
        return (
            <div>
                <select onChange={e => this.onSelectChange(e)}>
                {
                    this.state.keys.map(key => {
                        return (
                            <option value={key}>{key}</option>
                        )
                    })
                }
                </select>
                <select onChange={e => this.onCategoryChange(e)}>
                    <option value={0}>Minutes</option>
                    <option value={1}>Hours</option>
                    <option value={2}>Months</option>
                    <option value={3}>Centuries</option>
                </select>
                < Line data={{
                    labels: ["January", "February", "March", "April", "May", "June", "July"],
                    datasets: this.setdataSets()
                }} options={{
                    scales: {
                        yAxes: [{
                            scaleLabel: {
                                display: true,
                                labelString: this.state.categories[this.state.option]
                            }
                        }]
                    }
                }}
                 />
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

// export default requiresLogin()(connect(mapStateToProps)(Dashboard));

export default connect(mapStateToProps)(Stats);
