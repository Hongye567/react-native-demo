import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Dimensions,
	ActivityIndicator
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';

class Navigation extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let rootRoute = {
			component: this.props.component,
			passProps: {

			}
		};
		return (
			<Navigator
				initialRoute={rootRoute}
				configureScene={() => {return Navigator.SceneConfigs.PushFromRight}}
				renderScene={(route, navigator) => {
					let Component = route.component;
					return (
						<View style={{flex:1}}>
							<Component
								navigator={navigator}
								route={route}
								{...route.passProps} />
						</View>
					);
				}} />
		);
	}
}

export default Navigation;