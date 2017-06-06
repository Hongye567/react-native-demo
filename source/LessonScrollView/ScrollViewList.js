import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	ScrollView,
	Image
} from 'react-native';

/*从本地读取文件*/
let movieData = require('./movies.json');
let movieList = movieData.subjects;

class MovieList extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let movieRows = [];
		/*评分: movieList.rating.average; 类型(arr): movieList.genres; 影名: movieList.title; 别名: original_title; 
		  标识: id; 图片(arr): images.large; 年份: year*/
		return (
			<View style={styles.container}>
				<ScrollView>
					{ movieList.map((item,i) => this.renderItem(item, i)) }
				</ScrollView>
			</View>
		);
	}

	renderItem(item,i) {
		return (
			<View style={styles.itemContainer}
				key={i}>
				<View style={styles.movieItem}>
					<Image style={styles.coverImg}
						source={{uri:item.images.large}}></Image>
					<View style={styles.info}>
						<Text style={styles.introText}>{item.title}</Text>
						<Text style={styles.introText}>{item.year}</Text>
						<Text style={styles.introText}>{item.genres}</Text>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
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
	}
});

export default MovieList;