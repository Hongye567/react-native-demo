import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Ionicons';

import Navigation from '../component/Navigation';
import SearchBook from '../book/SearBook';
import MovieList from './movies/MovieList';

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
				title='图书'
				titleStyle={styles.tabTitle}
				selectedTitleStyle={styles.selectedTitle}
				renderIcon={() => <Icon name="ios-book-outline" size={30} color="gray" />}
				renderSelectedIcon={() => <Icon name="ios-book" size={30} color="#16B77B" />}
				onPress={() => this.setState({selectedTab: 'home'})}
				tabStyle={styles.tab}>
				<Navigation component={SearchBook} />
			</TabNavigator.Item>
			<TabNavigator.Item
				selected={this.state.selectedTab === 'more'}
				title='电影'
				titleStyle={styles.tabTitle}
				selectedTitleStyle={styles.selectedTitle}
				renderIcon={() => <Icon name="ios-videocam-outline" size={30} color="gray" />}
				renderSelectedIcon={() => <Icon name="ios-videocam" size={30} color="#16B77B" />}
				onPress={() => this.setState({selectedTab: 'more'})}
				tabStyle={styles.tab}>
				<Navigation component={MovieList} />
			</TabNavigator.Item>
		</TabNavigator>;
	}
}

const styles = StyleSheet.create({
	tabBar: {
		
	},
	scene: {

	},
	tabTitle: {
		fontSize: 12,
		marginTop: 0,
		paddingTop: 0
	},
	selectedTitle: {
		color: '#16B77B'
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