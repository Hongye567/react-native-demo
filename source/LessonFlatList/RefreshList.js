import React, { Component, PureComponent } from 'react';
import { 
	View, Text, StyleSheet,
	FlatList, TouchableHighlight,
	Dimensions, ActivityIndicator,
	Image
} from 'react-native';

class MyListItem extends PureComponent {

	_onPress = () => {
		this.props.onPressItem(this.props.id);
	};

	render() {
		const style1 = this.props.selected ? {borderWidth: 2, borderRightWidth: 2, borderColor: '#23C941'} : {};
		return (
			<TouchableHighlight style={[styles.itemContainer,style1]}
				onPress={this._onPress}
				underlayColor="#909090">
					<View style={styles.contentContainer}>
						<Image 
							style={{flex: 1}}
							source={{uri: this.props.imgUrl}}
							resizeMode="cover">
						</Image>
						<Text 
							numberOfLines={1}>{this.props.title}</Text>
					</View>
			</TouchableHighlight>
		);
	}
}

class RefreshList extends Component {

	currentPage = 0;  //当前页
	isFullData = false;  //是否加载完全部
	needRenderFooter = false;  //是否需要渲染底部

	state = {
		selected: (new Map(): Map<string, boolean>),
		data: [],
		refreshing: false
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
			imgUrl={item.images.medium}
		/>
	);

	_renderHeader = () => (
		<View style={styles.headerContainer}>
			<Text style={styles.title}>列表头部</Text>
		</View>
	);

	_renderSeparator = () => (
		<View style={styles.separator}></View>
	);

	_renderFooter = () => {
		if (this.needRenderFooter) {
			return this.isFullData ?
			(
				<View style={styles.footer}>
					<Text>已经到底了哦</Text>
				</View>
			)
			: (
				<View style={styles.footer}>
					<ActivityIndicator size="small"/>
					<Text>玩命加载中</Text>
				</View>
			)
		} else {
			return null;
		}
	};

	getData(isLoadMore) {
		this.setState({ refreshing: !isLoadMore });
		fetch(`https://api.douban.com/v2/movie/in_theaters?start=${this.currentPage * 20}&count=20`)
			.then((response) => response.json())
			.then((responseJSON) => responseJSON.subjects)
			.then((res) => {
				this.currentPage++;
				this.needRenderFooter = true;
				if (res.length < 20) {
					this.isFullData = true; 
				}
				if (isLoadMore) {
					this.setState({ 
						refreshing: false,
						data: this.state.data.concat(res)
					});
				} else {
					this.setState({ 
						refreshing: false, 
						data: res
					});
				}
			})
			.catch((error) => console.error(error))
	}

	_onRefresh = () => {
		this.currentPage = 0;
		this.isFullData = false;
		this.getData(false);
	};

	_onEndReached = () => {
		if (!this.isFullData) {
			this.getData(true);
		}
	};

	componentDidMount() {
		this._onRefresh();
	}

	render() {
		return (
			<FlatList
				data={this.state.data}
				extraDate={this.state}
				keyExtractor={this._keyExtractor}
				renderItem={this._renderItem}
				ListHeaderComponent={this._renderHeader}
				ItemSeparatorComponent={this._renderSeparator}
				ListFooterComponent={this._renderFooter}
				numColumns={3}
				refreshing={this.state.refreshing}
				onRefresh={this._onRefresh}
				onEndReachedThreshold={0.125}
				onEndReached={this._onEndReached}
			/>
		);
	}
}

const styles = StyleSheet.create({
	itemContainer: {
		flex: 1,
		height: (Dimensions.get('window').width / 3) * (4/3),
		borderRightWidth: StyleSheet.hairlineWidth,
		borderColor: '#ccc'
	},
	contentContainer: {
		flex: 1,
		padding: 5,
	},
	separator: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: '#ccc'
	},
	footer: {
		flexDirection: 'row',
		padding: 5,
		alignItems: 'center',
		justifyContent: 'center',
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

export default RefreshList;