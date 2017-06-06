import React, {Component} from 'react';
import {
	BackHandler,
	Platform,
	ToastAndroid
} from 'react-native';

/*带返回的基础组件*/
export default class BackComponent extends Component {

	constructor(props) {
		super(props);
	}

	componentWillMount() {
		if (Platform.OS === 'android') {
			BackHandler.addEventListener('hardwareBackPress', this._handleBack);
		}
	}

	componentWillUnmount() {
		if (Platform.OS === 'android') {
			BackHandler.removeEventListener('hardwareBackPress', this._handleBack);
		}
	}

	_handleBack = () => {
		const navigator = this.props.navigator;
		const routers = navigator.getCurrentRoutes();
		if (routers.length > 1) {
			navigator.pop();
			return true;
		}
		if (this.lastBackPressed && this.lastBackPressed+2000 >= Date.now() ) {
			return false;
		}
		this.lastBackPressed = Date.now();
		ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
		return true;
	};
}