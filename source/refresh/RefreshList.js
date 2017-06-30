import React, { Component } from 'react';
import { View, StyleSheet, ListView, RefreshControl, Text } from 'react-native';


const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const movies = [];
class RefreshList extends Component {

	constructor(props){
		super(props);
		this.state = {
			dataSource: ds,
			isRefreshing: false,
			isLoadMore: true,
			isFullData: false
		};
		this.currentPage = 0;
		this.isFullData = false;
	}

	componentDidMount() {
		this.getData(false);
	}

	render() {
		return (
			<View>
				<ListView
					dataSource={this.state.dataSource}
					renderRow={this._renderRow.bind(this)}
					automaticallyAdjustContentInsets={false}
					onEndReachedThreshold={5}
					onEndReached={this.state.isLoadMore ? this._onLoadMore.bind(this) : null}
					renderSeparator={this._renderSeparator.bind(this)}
					renderFooter={this.state.isLoadMore ? this._footerView.bind(this) : null}
					refreshControl={
			            <RefreshControl
			                refreshing={this.state.isRefreshing}
			                onRefresh={this._onRefresh.bind(this)}
			                tintColor='#AAAAAA'
			                title='下拉刷新'
			                progressBackgroundColor='#FFFFFF'/>} 
			    />
			</View>
		);
	}

	getData(isLoadMore) {
		this.setState({ isRefreshing: !isLoadMore });
		fetch(`https://api.douban.com/v2/movie/in_theaters?start=${this.currentPage * 10}&count=10`)
			.then((response) => response.json())
			.then((responseJSON) => responseJSON.subjects)
			.then((res) => {
				this.currentPage++;
				if (res.length < 10) {
					// this.setState({
					// 	isFullData: true
					// });
					
					this.isFullData = true; 
				}
				if (isLoadMore) {
					movies = movies.concat(res);
				} else {
					movies = res;
				}
				this.setState({
					isRefreshing: false,
					dataSource: ds.cloneWithRows(movies)
				});
			})
			.catch((error) => console.error(error))
	}

	_renderRow(rowData, sectionID, rowID, highlightRow) {
		const style = {
			height: 80,
			justifyContent: 'center',
			alignItems: 'center'
		};
		return (
			<View style={style} key={rowID}>
				<Text>{rowData.title}</Text>
			</View>
		);
	}

	_onRefresh() {
		this.currentPage = 0;
		this.isFullData = false;
		this.getData(false);
	}

	_onLoadMore() {
		this.getData(true);
	}

	_renderSeparator() {
		const style = {
			height: 1,
			backgroundColor: '#ccc'
		};
		return (
			<View style={style}></View>
		);
	}

	_footerView() {
		const style = {
			padding: 10,
			alignItems: 'center'
		};
		if (this.isFullData) {
			return (
				<View style={style}> 
	        		<Text>
	          			没有更多了
	        		</Text>
	      		</View>
			);
		} else {
			return (
	      		<View style={style}> 
	        		<Text>
	          			玩命加载中...
	        		</Text>
	      		</View>
	    	);
		}
  	}
}


export default RefreshList;