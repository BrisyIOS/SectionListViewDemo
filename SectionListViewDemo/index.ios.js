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
  View,
  ListView,
  Image
} from 'react-native';

// 引入JSON数据
var Car = require('./Car.json');
var jsonData = Car.data;

// ECMAScript 5的写法
var SectionListViewDemo = React.createClass({

    // 初始化变量
    getInitialState() {

      var getSectionHeaderData = (dataBlob,sectionID) => {
        return dataBlob[sectionID];
      };
      var getRowData = (dataBlob,sectionID,rowID) => {
        return dataBlob[sectionID + ":" + rowID];
      };
      return {
        dataSource: new ListView.DataSource({
          // 获取组数据
          getSectionHeaderData: getSectionHeaderData,
          // 获取行数据
          getRowData: getRowData,
          rowHasChanged: (r1,r2) => r1!==r2,
          sectionHeaderHasChanged: (s1,s2) => s1!==s2
        })
      }
    },

    // render函数
    render() {

      return (
          <ListView

              // 设置数据源
              dataSource={this.state.dataSource}
              // 绘制组
              renderSectionHeader={this.renderSectionHeader}
              // 绘制行
              renderRow={this.renderRow}
          />
      )
    },

    // 绘制组
    renderSectionHeader(sectionData) {
    return (
        <View>
          <Text style={styles.sectionTextStyle}>{sectionData}</Text>
        </View>
    )
  },

    // 绘制行
    renderRow(rowData) {
      return (
          <View style={styles.rowStyle}>
            <Image source={{uri: rowData.icon}} style={styles.imageStyle} />
            <Text>{rowData.name}</Text>
          </View>
      )
    },

    // 视图绘制完毕的时候会调用此方法
    componentDidMount() {
      this.createDataBlob();
    },

    // 创建dataBlob数据
     createDataBlob() {

       var dataBlob = {};
       var sectionIDs = [];
       var rowIDs = [];

       for (var i=0; i<jsonData.length; i++) {

         sectionIDs.push(i);
         dataBlob[i] = jsonData[i].title;
         let cars = jsonData[i].cars;
         rowIDs[i] = [];
         for (var j=0; j<cars.length; j++) {

           rowIDs[i].push(j);
           dataBlob[i+":"+j] = cars[j];
         }
       }

       // 更新数据源
       this.setState({
         dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob,sectionIDs,rowIDs)
       })
     }

})

// 设置样式
const styles = StyleSheet.create({

  rowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10
  },

  imageStyle: {
    width: 60,
    height: 60,
    marginRight: 20
  },
  sectionTextStyle: {
    padding: 10,
    color: 'red',
    backgroundColor: 'gray',
    height: 60,
    lineHeight: 60
  }

})

AppRegistry.registerComponent('SectionListViewDemo', () => SectionListViewDemo);
