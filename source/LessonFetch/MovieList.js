import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	ListView,
	Platform,
	Alert,
	Image
} from 'react-native';

//豆瓣电影热映API
const GET_URL = "https://api.douban.com/v2/movie/in_theaters";

class Name extends Component {

	constructor(props) {
		super(props);
		let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			loaded: false, //是否加载完成
			dataSource: ds
		};
	}

	render() {
		if (!this.state.loaded) {
			return this._renderLoadingView()
		}

		return (
			<View>
				<ListView
					dataSource={this.state.dataSource}
					renderHeader={this._renderHeader}
					renderRow={this._renderRow}
					initialListSize={10}
					renderSeparator={this._renderSeparator} />
			</View>
		);
	}

	componentDidMount() {
		this._getData();
	}

	/*网络获取数据*/
	_getData() {
		fetch(GET_URL)
		.then((response) => response.json())
		.then((responseJson) => {
			this.setState({
				loaded: true,
				dataSource: this.state.dataSource.cloneWithRows(responseJson.subjects)
			});
		})
		.catch((err) => {
			Alert.alert(
				"错误警告", 
				err.toString(), 
				[
					{text: "确定", style: 'cancel'}
				],
				{ cancelable: false }
			);

			console.error(err);
		});

	}

	/*等待加载*/
	_renderLoadingView() {
		return (
			<View style={styles.loadingContainer}>
				<Text>加载中...</Text>
			</View>
		);
	}

	/*渲染头部*/
	_renderHeader() {
		return (
			<View style={styles.headerContainer}>
				<Text style={styles.headerTitle}>电影列表</Text>
			</View>
		);
	}

	/*渲染行*/
	_renderRow(rowData, i) {
		return (
			<View style={styles.itemContainer}
				key={rowData.id}>
				<View style={styles.movieItem}>
					<Image style={styles.coverImg}
						source={{uri:rowData.images.large}}></Image>
					<View style={styles.info}>
						<Text style={styles.introText}>{rowData.title}</Text>
						<Text style={styles.introText}>{rowData.year}</Text>
						<Text style={styles.introText}>{rowData.genres}</Text>
					</View>
				</View>
			</View>
		);
	}

	/*渲染分割线*/
	_renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
		return (
			<View style={styles.separator}
				key={rowID}>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	loadingContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 30
	},
	headerContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
		padding: 5
	},
	headerTitle: {
		fontWeight: 'bold',
		fontSize: 28
	},
	container: {
		backgroundColor: '#D5D4D4'
	},
	itemContainer: {
		margin: 5,
		borderRadius: 5,
		backgroundColor: '#fff',
		overflow: 'hidden'
	},
	movieItem: {
		flexDirection: 'row'
	},
	coverImg: {
		width: 100,
		height: 180,
		borderTopLeftRadius: 5,
		borderBottomLeftRadius: 5
	},
	info: {
		padding: 10
	},
	introText: {
		lineHeight: 30
	},
	separator: {
		height: 1,
		backgroundColor: '#0FEB8B'
	}
});

export default Name;