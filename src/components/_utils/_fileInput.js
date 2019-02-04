import React from 'react'
import { change } from 'redux-form';
import { connect } from 'react-redux';

class FileInput extends React.Component {
	constructor(props) {
		super(props)
		this.onChange = this.onChange.bind(this)
	}

	getBase64(file) {

		return new Promise(function (resolve, reject) {
			let dataurl = null
			var img = document.createElement("img");
			var reader = new FileReader();

			reader.onload = function () {
				img.src = reader.result;

				img.onload = function () {
					var canvas = document.createElement("canvas");
					var ctx = canvas.getContext("2d");
					ctx.drawImage(img, 0, 0);

					var MAX_WIDTH = 75;
					var MAX_HEIGHT = 75;
					var width = img.width;
					var height = img.height;

					if (width > height) {
						if (width > MAX_WIDTH) {
							height *= MAX_WIDTH / width;
							width = MAX_WIDTH;
						}
					} else {
						if (height > MAX_HEIGHT) {
							width *= MAX_HEIGHT / height;
							height = MAX_HEIGHT;
						}
					}
					canvas.width = width;
					canvas.height = height;
					ctx.drawImage(img, 0, 0, width, height);
					console.log('canvas', canvas)

					dataurl = canvas.toDataURL("image/jpeg");
					console.log('dataurl', dataurl)
					resolve(dataurl);
				}
			};
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});

	}

	onChange(e) {
		const { input: { onChange } } = this.props
		onChange(e.target.files[0])
		this.getBase64(e.target.files[0]).then(res => {
			console.log('res', res)
			this.props.dispatch(change("addClient", "photo64", res))
		})
	}

	render() {


		return (
			<div>
				<input
					accept='.jpg, .png, .jpeg'		
					type="file"
					onChange={this.onChange}
				/>
			</div>)
	}
}

export default connect()(FileInput)
