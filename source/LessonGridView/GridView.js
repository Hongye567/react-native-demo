import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

const menus = [
	{title: "累计使用"},
	{title: "发布明细"},
	{title: "购买明细"},
	{title: "个人中心"}
];
class GridView extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.container}>
				{
					menus.map((menu, index) => (
						<GridItem
							key={index}
							title={menu.title} />
					))
				}
			</View>
		);
	}
}

class GridItem extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<View style={styles.itemContainer}>
				<Text>{this.props.title}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between'
	},
	itemContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		borderRightWidth: 1,
		borderBottomWidth: 1,
		borderColor: 'gray',
		width: width/2,
		height: width/3
	}
});

export default GridView;