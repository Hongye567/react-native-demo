import React, {Component} from 'react';
import {StyleSheet, View, Image, Text, Dimensions, ListView} from 'react-native';
const {width, height} = Dimensions.get('window');

const menus = [
	{title: "累计使用"},
	{title: "发布明细"},
	{title: "购买明细"},
	{title: "个人中心"}
];

class ListGridView extends Component {

	constructor(props) {
		super(props);
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds.cloneWithRows(menus)
		}
	}

	render() {
		return (
			<ListView
				dataSource={this.state.dataSource}
				renderRow={this._renderRow}
				contentContainerStyle={styles.contentContainer}
				showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false} />
		);
	}

	_renderRow(rowData, sectionID, rowID, highlightRow) {
		return (
			<View style={styles.itemContainer}
				key={rowID}>
				<Text>{rowData.title}</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {

	},
	contentContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		borderBottomWidth: 0.5,
		borderColor: 'gray'
	},
	itemContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: width/2,
		height: width/3,
		borderWidth: 0.5,
		borderColor: 'gray'
	}
});

export default ListGridView;