/**
 * Meishuguan App
 * Login Component
 *
 * @hengg
 */
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    ScrollView,
    StatusBar,
    Image,
    Text,
    ListView,
    View,
    TouchableOpacity,
    NativeModules,
    Alert,
    Dimensions
} from 'react-native';

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;
const globalStyles = {
    navBar: {

    },
    navBarText: {

    }, 
    navBarTitle: {

    }
}

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const SORTS = [
    {type:'all', title:'全部'},
    {type:'guohua', title:'国画'},
    {type:'youhua', title:'油画'},
    {type:'banhua', title:'版画'},
    {type:'diaosu', title:'雕塑'},
    {type:'sheying', title:'摄影'},
    {type:'zonghe', title:'综合'},
];

export default class Experts extends Component {

    constructor(props) {
        super(props);
        
        let selectAllColor = '#000000';
        let filterState = 0;
        this.sortDataSource = ds.cloneWithRows(SORTS);
        this.state = {
            expertDataSource: ds, // 专家列表的数据源
            selectAllState: false,  //是否全选
            selectAllColor,
            filterState,
            allExperts: true,  //全部
            guohua: false,  //国画
            youhua: false,  //油画
            banhua: false,  //版画
            diaosu: false,  //雕塑
            sheying: false,  //摄影
            zonghe: false,  //综合
        };
        this.expertSource = [];
    }

    componentWillMount() {
    	//获取网络数据  http://47.93.16.147:8080/api/ex/list?type=all
        const EXPERTURL = "http://47.93.16.147:8080/api/ex/list";
        let p = "type=all";
        fetch(EXPERTURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: p
        }).then(
            (response) => response.json()
        ).then(
            (responseJson) => {
                if (responseJson.code === 200) {
                    this.setState({
                        expertDataSource: ds.cloneWithRows(responseJson.data)
                    });
                } else {
                    Alert.alert('提示', responseJson.msg);
                }
            }
        ).catch((error) => {
            Alert.alert('提示', '请求失败，请检查网络连接。');
        })
          
        this.expertSource = ds;
    }

    onListItemPress(rowData) {
        let newData;
        let selected = !rowData.selected;
        let experts = [...this.expertSource];
        newData = Object.assign({}, rowData, {selected: selected});
        for(let i=0;i<experts.length;i++){
            if(experts[i].index===rowData.index){
                experts[i] = newData;
            }
        }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(experts)
        });
        this.expertSource = experts;
    }

    onFilterPressOut() {
    }

    /**
     * 点击筛选
     */
    onFilterPress() {
        
        if (this.state.filterState === 0) {
            this.setState({
                filterState: 1
            })
        } else {
            this.setState({
                filterState: 0
            })
        }
    }

    onSelectAllPress() {
        if (this.state.selectAllState) {
            this.setState({
                selectAllState: !this.state.selectAllState,
                selectAllColor: '#000000',
            });

        } else {
            this.setState({
                selectAllState: !this.state.selectAllState,
                selectAllColor: '#f58200',
            });
        }
        let experts = [...this.expertSource];
        for (let i = 0; i < experts.length; i++) {
            let newData;
            newData = Object.assign({}, experts[i], {selected: !this.state.selectAllState});
            experts[i] = newData;
        }
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(experts)
        });
        this.expertSource = experts;
    }

    onConfirmButtonPressOut() {
    }

    /**
     * 渲染专家 Item
     */
    renderRow(rowData) {
        return (
            <View style={styles.row}>
                <TouchableOpacity onPress={() => this.onListItemPress(rowData)} underlayColor="transparent">
                    <View style={styles.expertsImgOdd}>
                        <Image source={{uri:rowData.photo}} style={[styles.expertsImg,
                            rowData.selected ? {borderColor: '#f58200', borderWidth: 4} : {}]}>
                        </Image>
                        <Text style={styles.expertsName}>{rowData.name}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
       
    }

    /**
     * 渲染类别 Item
     */
    renderFiter(rowData) {
        return (
            <View style={styles.row}>
                       <TouchableOpacity style={[styles.filterSub,this.state.guohua?{borderColor:'#231f20'}:{}]}
                          onPress={()=>this.selectExpertType('{rowData.code}')}>
                        <Text style={[styles.filterSubText,this.state.guohua?{color:'#231f20'}:{}]}>{rowData.title}</Text>
                    </TouchableOpacity>

            </View>
        );
    }

    /**
     * 筛选后
     * @param  {string} type 筛选类别
     */
    selectExpertType(type){
        switch (type) {
            case 'all':  //全部
                this.setState({
                    allExperts:!this.state.allExperts,
                    guohua:false,
                    youhua:false,
                    banhua:false,
                    diaosu:false,
                    sheying:false,
                    zonghe:false
                });
                break;
            case 'guohua':  //国画
                // let experts = [...this.expertSource];
                // let newData=[];
                // if(this.state.guohua===false){
                // for (let i = 0; i < experts.length; i++) {
                //     if(experts[i].type===type){
                //         newData.push(experts[i])
                //     }
                // }
                // this.setState({
                //     dataSource: this.state.dataSource.cloneWithRows(newData)
                // });
                // this.expertSource = experts;
                // }else {
                //     this.setState({
                //         dataSource: this.state.dataSource.cloneWithRows(experts)
                //     });
                // }
                this.setState({
                    guohua:!this.state.guohua,
                    allExperts:false
                });
                break;
            case 'youhua':  //油画
                this.setState({
                    youhua:!this.state.youhua,
                    allExperts:false
                });
                break;
            case 'banhua':  //版画
                this.setState({
                    banhua:!this.state.banhua,
                    allExperts:false
                });
                break;
            case 'sheying':  //摄影
                this.setState({
                    sheying:!this.state.sheying,
                    allExperts:false
                });
                break;
            case 'diaosu':  //雕塑
                this.setState({
                    diaosu:!this.state.diaosu,
                    allExperts:false
                });
                break;
            case 'zonghe':  //综合
                this.setState({
                    zonghe:!this.state.zonghe,
                    allExperts:false
                });
                break;
        }
        let experts = [...this.expertSource];
        let newData = [];
        if(this.state.allExperts===true){
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(experts)
            });
        }else{
            if(this.state.guohua===true){
                newData=newData.concat(this.originalData.data.guohua);
            }
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(newData)
            });
        }

    }

    render() {
        return (
            <View style={{height: height-100, width: width,backgroundColor:'white'}} >
                <StatusBar hidden={false} barStyle="dark-content"/>
                <View style={{backgroundColor: '#f5f5f5', height: 20}}/>
                <View style={globalStyles.navBar}>
                    <TouchableOpacity
                        onPress={() => this.onFilterPress()}
                        onPressOut={() => this.onFilterPressOut()} activeOpacity={1}
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={{height: 22, width: 22, marginLeft: 40}}
                               source={{uri: "http://pic.qiantucdn.com/58pic/22/06/55/57b2d98e109c6_1024.jpg"}}/>
                        <Text style={{
                            marginLeft: 7.5, fontFamily: 'HYQiHei', fontSize: 16, letterSpacing: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0)', color: '#9b9b9b'
                        }}>筛选</Text>
                    </TouchableOpacity>
                    <View style={{marginLeft: 25, width: 1, height: 21, backgroundColor: '#e1e1e1'}}>
                    </View>
                    <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.onSelectAllPress()}>
                        <Image style={{height: 23, width: 23, marginLeft: 25}}
                               source={{uri: "http://pic.qiantucdn.com/58pic/22/06/55/57b2d98e109c6_1024.jpg"}}/>
                        <Text style={{
                            marginLeft: 7.5,
                            fontFamily: 'HYQiHei',
                            fontSize: 16,
                            letterSpacing: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0)',
                            color: '#9b9b9b'
                        }
                        }>全选</Text>
                    </TouchableOpacity>
                    <Text style={[globalStyles.navBarText, globalStyles.navBarTitle]}>展览项目评审专家库</Text>
                    <TouchableOpacity
                        onPressOut={() => this.onConfirmButtonPressOut()} 
                        activeOpacity={1}>
                        <View style={{
                            height: 40, width: 125, marginLeft: 120, flexDirection: 'row', alignItems: 'center',
                            backgroundColor: '#f87e11', borderRadius: 2.5
                        }}
                        >
                            <Image style={{height: 14, width: 19, marginLeft: 16}}
                                   source={{uri: "http://pic.qiantucdn.com/58pic/22/06/55/57b2d98e109c6_1024.jpg"}}/>
                            <Text style={{
                                color: 'white',
                                marginLeft: 10,
                                fontFamily: 'HYQiHei',
                                fontSize: 16,
                                letterSpacing: 2,
                                backgroundColor: 'rgba(255, 255, 255, 0)'
                            }}>确认选择</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{
                    height: 66, backgroundColor: '#ebebeb', borderBottomWidth: 1, borderBottomColor: '#ddd',
                    opacity: this.state.filterState, alignItems: 'center',
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity style={[styles.filterSub, {marginLeft: 90},
                        this.state.allExperts?{borderColor:'#231f20'}:{}]}
                    onPress={()=>this.selectExpertType('all')}>
                        <Text style={[styles.filterSubText,this.state.allExperts?{color:'#231f20'}:{}]}>
                            全部类别</Text>
                    </TouchableOpacity>
              
                     <ListView contentContainerStyle={styles.list}
                                  dataSource={this.sortDataSource} initialListSize={21} pageSize={3}
                                  scrollRenderAheadDistance={500}
                                  renderRow={(rowData) => this.renderFiter(rowData)}/>
                </View>
                <ScrollView style={{marginTop: (this.state.filterState === 1) ? 40 : 8}}>
                    <View style={{alignItems: 'center', justifyContent: 'center'}}>

                        <ListView contentContainerStyle={styles.list}
                                  dataSource={this.state.expertDataSource} initialListSize={21} pageSize={3}
                                  scrollRenderAheadDistance={500}
                                  renderRow={(rowData) => this.renderRow(rowData)}/>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    textInputStyle: {
        width: 200,
        height: 40,
        padding: 10,
        marginTop: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'white',
        backgroundColor: 'white',
        alignSelf: 'center'
    },
    buttonStyle: {
        width: 200,
        height: 40,
        padding: 10,
        marginTop: 5,
        borderColor: 'cornflowerblue',
        backgroundColor: 'cornflowerblue',
        color: 'white',
        borderWidth: 1,
        borderRadius: 5,
        overflow: 'hidden'
    },
    list: {
        // justifyContent: 'space-around',
        width: 910,
        flexDirection: 'row',
        flexWrap: 'wrap',
        // alignItems: 'flex-start',
    },
    row: {
        width: 227.5,
        height: 254,
        alignItems: 'center',
    },
    expertsImgOdd: {
        width: 156,
        height: 156,
        // borderRadius: 10,
        backgroundColor: '#ddd',
        // shadowColor: '#000000',
        // shadowOpacity: 35,
        // shadowOffset: {width: -1, height: 1},
        // shadowRadius: 2,
    },
    expertsImg: {
        width: 156,
        height: 156,
        // borderRadius: 10,
        // marginTop: 30,
    },
    expertsImgEven: {
        width: 156,
        height: 156,
        borderRadius: 10,
        marginTop: 70,
        backgroundColor: '#ddd',
        shadowColor: '#000000',
        shadowOpacity: 35,
        shadowOffset: {width: -1, height: 1},
        shadowRadius: 2,
    },
    expertsName: {
        marginTop: 12.5,
        marginLeft: 0,
        fontSize: 18,
        fontFamily: 'FZYanSongS-M-GB',
        color: '#231f20',
        backgroundColor: 'rgba(255,255,255,0)'
    },

    navBarLeft: {
        fontSize: 16,
        flex: 1,
        textAlign: 'left',
        marginLeft: 5,
    },
    navBarRight: {
        fontSize: 16,
        flex: 1,
        textAlign: 'right',
        marginRight: 5
    },
    tabBarImg: {
        width: 25,
        height: 25
    },
    filterSub: {
        backgroundColor: '#ffffff', borderRadius: 2, borderWidth: 1, borderColor: '#e1e1e1',
        marginLeft: 17
    },
    filterSubText: {marginVertical: 10, marginHorizontal: 16.5, fontSize: 16, color: '#9b9b9b'}

});