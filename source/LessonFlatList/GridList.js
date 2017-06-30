import React, { Component, PureComponent } from 'react';
import { 
	View, Text, StyleSheet,
	FlatList, TouchableHighlight,
	Dimensions
} from 'react-native';

class MyListItem extends PureComponent {

	_onPress = () => {
		this.props.onPressItem(this.props.id);
	};

	render() {
		return (
			<TouchableHighlight style={styles.itemContainer}
				onPress={this._onPress}
				underlayColor="#909090">
				<Text>{this.props.selected?"true":"false"}--{this.props.title}</Text>
			</TouchableHighlight>
		);
	}
}


const datas = [
	{ id: 0, title: "第一项" },
	{ id: 1, title: "第二项" },
	{ id: 2, title: "第三项" },
	{ id: 3, title: "第四项" },
	{ id: 4, title: "第五项" },
	{ id: 5, title: "第六项" },
	{ id: 6, title: "第七项" },
	{ id: 7, title: "第八项" },
	{ id: 8, title: "第九项" },
	{ id: 9, title: "第十项" },
	{ id: 10, title: "第一项" },
	{ id: 11, title: "第二项" },
	{ id: 12, title: "第三项" },
	{ id: 13, title: "第四项" },
	{ id: 14, title: "第五项" },
	{ id: 15, title: "第六项" },
	{ id: 16, title: "第七项" },
	{ id: 17, title: "第八项" },
	{ id: 18, title: "第九项" },
	{ id: 19, title: "第十项" },
];

class GridList extends Component {

	state = {
		selected: (new Map(): Map<string, boolean>)
	};

	_keyExtractor = (item, index) => item.id;

	_onPressItem = (id: string) => {

		this.setState((state) => {
			//复制一份改变引用地址，而不是直接修改state，否则可能界面不刷新
			const selected = new Map(state.selected);
			selected.set(id, !selected.get(id));
			return {selected};
		});
	};

	_renderItem = ({item}) => (
		<MyListItem
			id = {item.id}
			onPressItem = {this._onPressItem}
			selected={!!this.state.selected.get(item.id)}
			title={item.title}
		/>
	);

	_renderHeader = () => (
		<View style={styles.headerContainer}>
			<Text style={styles.title}>列表头部</Text>
		</View>
	);

	/**
	 * 分隔组件
	 */
	_renderSeparator = () => (
		<View style={styles.separator}></View>
	);

	_renderFooter = () => (
		<View style={styles.footer}>
			<Text>已经到底了哦</Text>
		</View>
	);

	render() {
		return (
			<FlatList
				data={datas}
				extraDate={this.state}
				keyExtractor={this._keyExtractor}
				renderItem={this._renderItem}
				ListHeaderComponent={this._renderHeader}
				ItemSeparatorComponent={this._renderSeparator}
				ListFooterComponent={this._renderFooter}
				numColumns={3}
			/>
		);
	}
}

const styles = StyleSheet.create({
	itemContainer: {
		flex: 1,
		padding: 10,
		alignItems: 'center',
		justifyContent: 'center',
		height: Dimensions.get('window').width / 3,
		borderRightWidth: StyleSheet.hairlineWidth,
		borderColor: '#ccc'
	},
	separator: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: '#ccc'
	},
	footer: {
		padding: 5,
		alignItems: 'center',
		borderColor: '#ccc',
		borderTopWidth: StyleSheet.hairlineWidth
	},
	headerContainer: {
		padding: 10,
		alignItems: 'center',
		borderColor: '#ccc',
		borderBottomWidth: 1
	},
	title: {
		fontWeight: 'bold'
	},
});

export default GridList;