import React, { Component } from 'react';
import {
	AppRegistry,
	StyleSheet,
	View,
	Dimensions,
	ActivityIndicator
} from 'react-native';

const Util = {
	//屏幕尺寸
	windowSize: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height
	},

	//基于fetch的get方法  只负责下载数据，下载后的处理操作在回调方法中实现
	//successCallback 成功访问回调函数
	//failCallback 访问失败回调函数
	getRequest: (url, successCallback, failCallback) => {
		fetch(url)
		.then((response) => response.json())
		.then((responseJSON) => successCallback(responseJSON))
		.catch((error) => failCallback(error));
	},

	//loading效果
	loading: <ActivityIndicator size='large' color='#19C791' />
}

export default Util;