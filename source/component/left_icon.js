import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Dimensions,
	ActivityIndicator
} from 'react-native';

class Icon extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View>
				<View style={styles.go}>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {

	},
	go: {
		width: 15,
		height: 15,
		borderLeftWidth: 2,
		borderBottomWidth: 2,
		borderColor: '#fff',
		marginLeft: 10,
		transform: [{rotate: '45deg'}]  //将一个矩形框旋转了45度
	}
});

export default Icon;