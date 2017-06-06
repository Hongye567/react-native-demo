import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	View,
	Dimensions,
	ActivityIndicator,
	Text,
	TextInput,
	TouchableOpacity
} from 'react-native';

class SearchBar extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.inputContainer}>
					<TextInput style={styles.input} {...this.props}
					underlineColorAndroid="transparent" />
				</View>
				<TouchableOpacity style={styles.btn} {...this.props} >
					<Text style={styles.search} >搜索</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: 'center',
		height: 44,
		marginTop: 10
	},
	inputContainer: {
		flex: 1,
		marginLeft: 5
	},
	input: {
		flex: 1,
		height: 44,
		borderWidth: 1,
		borderRadius: 4,
		borderColor: "#cccccc",
		paddingLeft: 5
	},
	btn: {
		width: 55,
		height: 44,
		marginLeft: 5,
		marginRight: 5,
		backgroundColor: '#23beff',
		borderRadius: 4,
		justifyContent: 'center',
		alignItems: 'center'
	},
	search: {
		color: '#fff',
		fontSize: 15,
		fontWeight: 'bold',
		textAlign: 'center'
	}
});

export default SearchBar;