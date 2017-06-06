import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	TextInput
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import BackComponent from '../common/BackComponent';

class ParamsPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			content: ''
		};
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={{color: 'white', marginBottom: 10}}>{this.props.hello}</Text>
				<TextInput style={styles.inputText}
					underlineColorAndroid="transparent"
					placeholder="输入回复内容"
					onChangeText={this._setReply.bind(this)} />
				<TouchableOpacity style={styles.button}
					onPress={this._backFunc.bind(this)}>
					<Text style={styles.btnText}>回复上一级页面</Text>
				</TouchableOpacity>
			</View>
		);
	}

	/*设置回复内容*/
	_setReply(value) {
		this.setState({
			content: value
		});
	}

	/*返回且实现回调*/
	_backFunc() {
		let {navigator} = this.props;

		if (this.props.getReply) {
			this.props.getReply(this.state.content);
		}

		if (navigator) {
			navigator.pop();
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0F9CD1',
		justifyContent: 'center',
		alignItems: 'center'
	},
	inputText: {
		width: 200,
		borderWidth: 1,
		borderColor: '#434141',
		marginBottom: 10
	},
	button: {
		borderRadius: 5,
		padding: 10,
		backgroundColor: '#C24F0E'
	},
	btnText: {
		color: '#fff'
	}
});

export default ParamsPage;