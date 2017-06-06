import React, {Component} from 'react';
import {
	View,
	StyleSheet,
	Text,
	TouchableOpacity,
	TextInput
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';
import BackComponent from '../common/BackComponent';
import ParamsPage from './NavigatorWithParams';

/*第一屏*/
class FirstPage extends BackComponent {

	constructor(props) {
		super(props);
		this.state = {
			content: ""
		}
	}

	render() {
		return (
			<View style={[styles.container,styles.firstContainer]}>
				<TextInput style={styles.inputText}
					underlineColorAndroid="transparent"
					placeholder="请输入"
					onChangeText={this._onChangeText.bind(this)} />
				<TouchableOpacity style={[styles.btnBorder,styles.firstBtn]}
					onPress={this._push.bind(this)}>
					<Text style={styles.btnText}>点击推出下一级页面</Text>
				</TouchableOpacity>
			</View>
		);
	}

	//获取输入内容
	_onChangeText(value) {
		this.setState({
			content: value
		});
	}

	//推出下一页面
	_push() {
		let nextRoute = {
			component: SecondPage,
			/*需要传递给下一页面的参数*/
			paramsProps: {
				content: this.state.content
			}
		};
		this.props.navigator.push(nextRoute);
	}
}

/*第二屏*/
class SecondPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			hello: '',
			replyText: ''
		};
	}

	render() {
		return (
			<View style={[styles.container,styles.secondContainer]}>
				{/*接收上一级页面传递的参数*/}
				<Text style={{marginBottom: 10,color:'white'}}>{this.props.content}</Text>
				<TouchableOpacity style={[styles.btnBorder,styles.secondBtn]}
					onPress={this._pop.bind(this)}>
					<Text style={styles.btnText}>点击返回上一级页面</Text>
				</TouchableOpacity>
				<TextInput style={[styles.inputText,{marginTop: 10}]}
					underlineColorAndroid="transparent"
					placeholder="输入问候语"
					onChangeText={this._setHello.bind(this)} />
				<TouchableOpacity style={[styles.btnBorder,styles.secondBtn]}
					onPress={this._sayHello.bind(this)}>
					<Text style={styles.btnText}>say hello</Text>
				</TouchableOpacity>
				{/*接收下一级页面回传*/}
				<Text style={{color:'white', marginTop:10}}>{this.state.replyText}</Text>
			</View>
		);
	}

	//返回上一级页面
	_pop() {
		this.props.navigator.pop()
	}

	/*设置问候语*/
	_setHello(value) {
		this.setState({
			hello: value
		});
	}

	/*进入下一页面并传递问候语*/
	_sayHello() {
		let {navigator} = this.props;

		let router = {
			component: ParamsPage,
			paramsProps: {
				hello: this.state.hello,
				getReply: (replyText) => {
					this.setState({
						replyText: replyText
					});
				}
			}
		};

		if (navigator) {
			navigator.push(router);
		}
	}
}

/*主界面*/
class NavigatorMain extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		let rootRoute = {
			component: FirstPage,
			paramsProps: {

			}
		}

		return (
			<Navigator
				/*
				  第一步：initialRoute
				  指定默认页面，也就是启动APP之后会看到界面的第一屏。
				  对象属性是自定义的，这个对象中的内容会在renderScene方法中处理。

				  备注：必须包含的属性，即component，表示需要渲染的页面组件
				 */
				initialRoute={rootRoute}
				/*
				  第二步：configureScene
				  场景渲染配置
				 */
				configureScene={(route) => {
					return Navigator.SceneConfigs.PushFromRight;
				}}
				/*
				  第三步：renderScene
				  渲染场景
				  参数：route(第一步创建并设置给导航器的路由对象),navigator(导航器对象)
				  实现：给需要显示的组件设置属性
				 */
				renderScene={(route, navigator) => {
					//从route对象中获取页面组件
					let Component = route.component;
					return (
						<Component
							navigator={navigator}
							route={route}
							/*将需要传递的参数以属性的方式传递*/
							{...route.paramsProps} />
					);
				}}
				 />
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	btnBorder: {
		padding: 10,
		borderRadius: 5
	},
	btnText: {
		color: 'white'
	},
	inputText: {
		width: 200,
		borderWidth: 1,
		borderColor: '#434141',
		marginBottom: 10
	},
	firstContainer: {
		backgroundColor: '#13AB66',
	},
	firstBtn: {
		backgroundColor: '#C24F0E'
	},
	secondContainer: {
		backgroundColor: '#C24F0E'
	},
	secondBtn: {
		backgroundColor: '#13AB66'
	}
});

export default NavigatorMain;