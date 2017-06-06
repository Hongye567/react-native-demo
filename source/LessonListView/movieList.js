import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	ListView,
	Image,
	ScrollView
} from 'react-native';

let movieData = require('../resource/movies');
let movieList = movieData.subjects;

class MovieList extends Component {

	constructor(props) {
		super(props);
		let ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});
		this.state = {
			dataSource: ds.cloneWithRows(movieList)
		};
	}

	render() {
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

	_renderHeader() {
		return (
			<View style={styles.headerContainer}>
				<Text style={styles.headerTitle}>电影列表</Text>
			</View>
		);
	}

	_renderRow(item) {
		return (
			<View style={styles.itemContainer}
				key={item.id}>
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

	_renderSeparator(sectionID: number, rowID: number, adjacentRowHighlighted: bool) {
		return (
			<View style={styles.separator}
				key={rowID}>
			</View>
		);
	}
}

const styles = StyleSheet.create({
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

export default MovieList;