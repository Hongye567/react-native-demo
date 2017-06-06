import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	ScrollView,
	ListView
} from 'react-native';

import Util from '../../util/util';
import SearchBar from '../../component/SearchBar';
import ServiceURL from '../../common/service';
import MovieItem from './MovieItem';
import CustomWebView from '../../component/CustomWebview';;

class MovieList extends Component {

	constructor(props) {
		super(props);
		let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state = {
			dataSource: ds,
			//网络请求状态标识
			show: false,
			keyWord: 'Android'
		};
	}

	componentDidMount() {
		//网络请求
		this.getData();
	}

	getData() {
		//每次搜索都需要重新下载显示数据
		this.setState({
			show: false
		});
		//请求数据
		let there = this;
		let url = ServiceURL.movie_search + "?count=20&q=" + this.state.keyWord;
		Util.getRequest(
			url, 
			(data) => {
				if (!data.subjects || data.subjects.length == 0) {
					return alert("未查询到相关电影");
				}

				let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
				there.setState({
					show: true,
					dataSource: ds.cloneWithRows(data.subjects)
				});
			},
			(error) => {
				alert(error);
			}
		);
	}

	_renderRow(movie) {
		return <MovieItem movie={movie} onPress={this._showDetail.bind(this,movie.title,movie.alt)} />;
	}

	_renderSeparator(sectionId, rowId) {
		const style = {
			height: 1,
			backgroundColor: '#ccc'
		};
		return <View style={style}></View>;
	}

	_onChangeText(value) {
		this.setState({
			keyWord: value
		});
	}

	_onSearchPress() {
		this.getData();
	}

	/*进入图书详情*/
	_showDetail(title, url) {
		let detailRoute = {
			component: CustomWebView,
			passProps: {
				backName: "电影",
				title: title,
				url: url
			}
		}

		this.props.navigator.push(detailRoute);
	}

	render() {
		return (
			<ScrollView>
				<SearchBar
					placeholder="请输入影名或者演员"
					onPress={this._onSearchPress.bind(this)}
					onChangeText={this._onChangeText.bind(this)} />
				{
					this.state.show ?
						<ListView
							dataSource={this.state.dataSource}
							initialListSize={10}
							renderRow={this._renderRow.bind(this)}
							renderSeparator={this._renderSeparator} />
					: Util.loading
				}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({

});

export default MovieList;