import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Ionicons';

class HomePage extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <View style={styles.homeContainer}>
			<Text>首页</Text>
		</View>;
	}
}

class MorePage extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return <View style={styles.moreContainer}>
			<Text>更多</Text>
		</View>;
	}
}

class MainPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			selectedTab: 'home'
		};
	}

	render() {
		return <TabNavigator
			tabBarStyle={styles.tabBar}
			sceneStyle={styles.scene}
			tabBarShadowStyle={styles.tabBarShadow}
			hidesTabTouch={true}>
			<TabNavigator.Item
				selected={this.state.selectedTab === 'home'}
				title='首页'
				titleStyle={{fontSize: 18,color: '#35CF7D'}}
				selectedTitleStyle={{fontSize: 18,color: '#ffffff'}}
				onPress={() => this.setState({selectedTab: 'home'})}
				tabStyle={[styles.tab,{backgroundColor: (this.state.selectedTab === 'home')?('#36CE79'):('#8DEBB6')}]}>
				<HomePage />
			</TabNavigator.Item>
			<TabNavigator.Item
				selected={this.state.selectedTab === 'more'}
				title='更多'
				titleStyle={{fontSize: 18,color: '#35CF7D'}}
				selectedTitleStyle={{fontSize: 18,color: '#ffffff'}}
				onPress={() => this.setState({selectedTab: 'more'})}
				tabStyle={[styles.tab,{backgroundColor: (this.state.selectedTab === 'more')?('#36CE79'):('#8DEBB6')}]}>
				<MorePage />
			</TabNavigator.Item>
		</TabNavigator>;
	}
}

const styles = StyleSheet.create({
	tabBar: {
		
	},
	scene: {

	},
	tab: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	homeContainer: {
		backgroundColor: '#F1B9B9',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	moreContainer: {
		backgroundColor: '#90F8DE',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default MainPage;