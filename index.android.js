/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
require('./source/asyncStorage/');

//使用 ScrollView 实现电影列表
// import MovieList from './source/LessonScrollView/ScrollViewList';

//使用 ListView 实现电影列表
//import MovieList from './source/LessonListView/movieList';

//使用Navigator实现页面跳转、带参跳转、参数回调
//import NavigatorMain from './source/LessonNavigator/navigator';

//React Navigator使用案例
//import App from './source/ReactNavigator/App';

//网络获取电影列表
//import MovieList from './source/LessonFetch/MovieList';

//使用 react-native-tab-navigator 实现底部导航
//import MainPage from './source/LessonTabNavigator/MainPage';

//GridView实现
import GridView from './source/LessonGridView/GridView';

//使用ListView实现GridView
import ListGridView from './source/LessonGridView/ListGridView';

//使用ActivityIndicator实现加载动画
import Loading from './source/activityIndicator/Loading';

//使用豆瓣API实现小案例
import MainPage from './source/DoubanDemo/MainPage';

//利用Animated实现折叠面板
import Panels from './source/pages/Panels';

import StorageLesson from './source/asyncStorage/StorageLesson';

AppRegistry.registerComponent('ReactNativeDemo', () => StorageLesson);
