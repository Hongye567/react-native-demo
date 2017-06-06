import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	WebView
} from 'react-native';

import HeaderBar from './HeaderBar';

class CustomWebView extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={{backgroundColor: 'white',flex:1}}>
				<HeaderBar
					navigator={this.props.navigator}
					initObj={{backName: this.props.backName,barTitle: this.props.title}} />
				<WebView
					startInLoadingState={true}
					source={{uri: this.props.url}} />
			</View>
		);	
	}
}

export default CustomWebView;