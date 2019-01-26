import React from 'react';
import { Redirect } from 'react-router-dom';
import {getPhoneNumbers} from '../../actions/users';
import { login } from '../../actions/auth';
import { connect } from 'react-redux';
import SetupPhoneForm from './setupPhoneForm';
import './SetupPhone.css';


export class SetupPhone extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			numbers: [],
			numberSearch: '',
			disabled: true,
			phoneNumber: '',
			lastButton: null
		}
	}

	componentDidMount() {
		//this.setupNumberArray();
	}

	setupNumberArray() {
		let array = [];
		for (let i = 0; i < 200; i++) {
			let string = '';
			for (let j = 0; j < 10; j++) {
				string += String(Math.floor(Math.random() * 10));
				if (j === 2 || j === 5) {
					string += '-';
				}
			}
			array.push(string);
		}
		this.setState({
			numbers: array
		})
	}

	onSubmit(values) {
		console.log('redirecting');
		return <Redirect to="/dashboard" />;
	}

	handleNumberSearchChange(e) {
		if (e.target.value.length === 3) {
			console.log('in handle number change');
			this.props.dispatch(getPhoneNumbers(e.target.value))
				.then(res => {
					if (res)
						console.log(res)
						this.setState({ numbers: res })
				})
				.catch(err => {
					console.log(err);
				})
		}
	}

	handleNumberClick(e) {
		this.setState({
			disabled: false,
			phoneNumber: e.target.value,
			lastButton: e.target,
		})
		if (this.state.lastButton){
			let tempObj = this.state.lastButton;
			tempObj.style = e.target.style;
			this.setState({
				lastButton : e.target
			})
		}
		e.target.style.border = "1px solid blue"
	}

	render() {
		console.log(this.state.numberSearch);
		return (
					<headerComponent/>
						<SetupPhoneForm/>
						<FooterComponent/>
		);
	}
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(SetupPhone);