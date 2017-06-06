import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	ActivityIndicator,
	Button
} from 'react-native';

class Loading extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			animating: true
		};
		this.timer = null;
	}

	setToggleTimeout() {
	    this.timer = setTimeout(() => {
	      this.setState({animating: !this.state.animating});
	      this.setToggleTimeout();
	    }, 2000);
	 }

	componentDidMount() {
		this.setToggleTimeout();
	}

	componentUnMount() {
		this.timer && clearTimeout(this.timer);
	}

	render() {
		let visibale = this.state.animating;
		return (
			visibale?
			<View style={styles.container} >
				<ActivityIndicator
					animating={this.state.animating}
					size="large"
					color="green" />
				<Text>玩命加载中...</Text>
			</View>
			:
			null
		);
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});

export default Loading;