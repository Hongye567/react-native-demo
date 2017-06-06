import React, {Component} from 'react';
import {
	StyleSheet,
	View,
	Text,
	ScrollView
} from 'react-native';
import ServiceURL from '../common/service';
import Util from '../util/util';
import HeaderBar from '../component/HeaderBar';
import BookItem from './BookItem';

class BookDetails extends Component {

	constructor(props) {
		super(props);
		this.state = {
			bookData: null
		};
	}

	componentDidMount() {
		//请求图书详情
		this.getData();
	}

	getData() {
		let there = this;
		let url = ServiceURL.book_detail_id + this.props.bookID;
		Util.getRequest(
			url,
			(data) => {
				there.setState({
					bookData: data
				});
			},
			(error) => {
				alert(error);
			}
		);
	}

	render() {
		return (
			<ScrollView style={styles.container}>
				{
					this.state.bookData
					? <View>
						<HeaderBar
							initObj={{
								backName: '图书',
								barTitle: this.state.bookData.title
							}}
							navigator={this.props.navigator} />
						<BookItem book={this.state.bookData} />
						<View>
							<Text style={styles.title}>图书简介</Text>
							<Text style={styles.text}>{this.state.bookData.summary}</Text>
						</View>
						<View style={{marginTop:10}}>
							<Text style={styles.title}>作者简介</Text>
							<Text style={styles.text}>{this.state.bookData.author_intro}</Text>
						</View>
						<View style={{height:55}}></View>
					</View>
					: Util.loading
				}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white'
	},
	title: {
		fontSize:16,
		marginTop: 10,
		marginLeft: 10,
		marginBottom: 10,
		fontWeight: 'bold'
	},
	text: {
		marginLeft: 10,
		marginRight: 10,
		color: 'gray'
	}
});

export default BookDetails;