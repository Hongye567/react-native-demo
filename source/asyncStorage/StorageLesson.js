import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

class StorageLeson extends Component {

	constructor(props) {
		super(props);
		this.state = {
			key: '',
			data: '',
			tips: ''
		};
	}

	_saveValue() {
		// 使用key来保存数据。这些数据一般是全局独有的，常常需要调用的。
		// 除非你手动移除，这些数据会被永久保存，而且默认不会过期。
		storage.save({
			key: this.state.key,  // 注意:请不要在key中使用_下划线符号!
		    data: this.state.data,
		    
		    // 如果不指定过期时间，则会使用defaultExpires参数
		    // 如果设为null，则永不过期
		    expires: 1000 * 3600
		});
		this.setState({ tips: "存储成功" });
	}

	_loadValue() {
		// 读取
		storage.load({
		    key: this.state.key,
		    
		    // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
		    autoSync: false,
		    
		    // syncInBackground(默认为true)意味着如果数据过期，
		    // 在调用sync方法的同时先返回已经过期的数据。
		    // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
		    syncInBackground: true,
		    
		    // 你还可以给sync方法传递额外的参数
		    syncParams: {
				extraFetchOptions: {
				// 各种参数
				},
				someFlag: true,
		    },
		}).then(ret => {
		    // 如果找到数据，则在then方法中返回
		    // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
		    // 你只能在then这个方法内继续处理ret数据
		    // 而不能在then以外处理
		    // 也没有办法“变成”同步返回
		    // 你也可以使用“看似”同步的async/await语法
		    
		    console.log(ret);
		    this.setState({ data: ret, tips: "成功读取" });
		}).catch(err => {
		    //如果没有找到数据且没有sync方法，
		    //或者有其他异常，则在catch中返回
			console.warn(JSON.stringify(err));
			switch (err.name) {
			    case 'NotFoundError':
			        // TODO;
			        this.setState({
			        	data: "不存在"
			        });
			        break;
		        case 'ExpiredError':
		            // TODO
		            this.setState({
		            	data: err
		            });
		            break;
			}
		});
	}

	render() {
		return (
			<View style={styles.container}>
				<TextInput placeholder="输入key" onChangeText={(value)=>this.setState({key:value})} />
				<TextInput placeholder="输入data" onChangeText={(value)=>this.setState({data:value})} />
				<View style={styles.buttons}>
					<Button style={styles.button}
						title="存储" onPress={this._saveValue.bind(this)} />
					<Button style={styles.button}
						title="读取" onPress={this._loadValue.bind(this)} />
				</View>
				<View style={styles.show}>
					<Text>Tips: {this.state.tips}</Text>
					<Text>data: {this.state.data || "未发现"}</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10
	},
	buttons: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 20
	},
	show: {
		padding: 20
	}
});

export default StorageLeson;