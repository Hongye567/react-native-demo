import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Dimensions,
	ActivityIndicator,
	Text,
	TouchableOpacity
} from 'react-native';
import Icon from './left_icon';

class HeaderBar extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let headerContent = this.props.initObj;
		return (
			<View style={styles.header}>
				<TouchableOpacity style={styles.left_btn}
					onPress={this._backPop.bind(this)}>
					<Icon />
					<Text style={styles.btn_text}>{headerContent.backName}</Text>
				</TouchableOpacity>
				<View style={styles.title_container}>
					<Text style={styles.title} numberOfLines={1}>{headerContent.barTitle}</Text>
				</View>
			</View>
		);
	}

	_backPop() {
		this.props.navigator.pop();
	}
}

const styles = StyleSheet.create({
	container: {

	},
	header: {
		height: 44,
		backgroundColor: '#3497ff',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	left_btn: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},
	btn_text: {
		color: '#fff',
		fontSize: 17,
		fontWeight: 'bold',
	},
	title_container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		color: '#fff',
		fontSize: 18,
		fontWeight: 'bold',
		lineHeight: 18,
		width: 200
	}
});

export default HeaderBar;