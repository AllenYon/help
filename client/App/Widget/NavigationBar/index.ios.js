/**
 * Copyright (c) 2015-present, juangua, Inc.
 * All rights reserved.
 *
 * @providesModule MGRctNavigationBar -- one MG Style Navigation Bar
 *
 */

'use strict';

var React = require('react-native');
var MGRctBridge=require('NativeModules').MGRctBridge;

var {
  Text,
  Image,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
} = React;

var PropTypes = React.PropTypes;

var NavBar = React.createClass({
  propTypes: {
    leftBarItemOneURI: PropTypes.string,     // 默认显示返回图标 '<' 也可通过指定leftBarItemURI来设置 例如: 'MGJControls.bundle/btn_navigationbar_back.png'
    leftBarItemOnePressed: PropTypes.func,
    bShowLeftBarItemOne: PropTypes.bool,

    leftBarItemTwoURI: PropTypes.string,
    leftBarItemTwoPressed: PropTypes.func,
    bShowLeftBarItemTwo: PropTypes.bool,

    title: PropTypes.string,                 // Navigation Bar 标题

    rightBarItemTwoText: PropTypes.string,
    rightBarItemTwoPressed: PropTypes.func,  // 例如 () => MGRctBridge.showNotice('菇凉，你的网络好像不是很给力哦')
    bShowRightBarItemTwo: PropTypes.bool,

    rightBarItemOneText: PropTypes.string,
    rightBarItemOnePressed: PropTypes.func,  // 例如 () => MGRctBridge.showNotice('菇凉，你的网络好像不是很给力哦')
    bShowRightBarItemOne: PropTypes.bool,
  },

  getDefaultProps: function () {
    return { bShowLeftBarItemOne: true,   // 默认显示返回按钮
            //  leftBarItemOnePressed: () => MGRctBridge.popViewControllerWithAnimation(0),  // 默认执行返回动作
           };
  },
                  // source={{uri: this.props.leftBarItemOneURI === undefined ? 'MGJControls.bundle/btn_navigationbar_back.png' : this.props.leftBarItemOneURI}}>

  render() {
    return (
      <View ref="this" style={styles.navigationWrapper}>

        <View style={{height:20, opacity:0}}/>

        <View style={styles.navigationBarWrapper}>

        <View style={[styles.barItemImageWrapper, this.props.bShowLeftBarItemOne ? styles.show : styles.hidden]}>
          <TouchableWithoutFeedback
            onPress={this.props.leftBarItemOnePressed}>
              <Image style={styles.barItemImage}
                >
              </Image>
          </TouchableWithoutFeedback>
        </View>

        <View style={[styles.barItemImageWrapper, this.props.bShowLeftBarItemTwo ? styles.show : styles.hidden]}>
          <TouchableWithoutFeedback
            onPress={this.props.leftBarItemTwoPressed}>
              <Image style={styles.barItemImage}
                  source={{uri: this.props.leftBarItemTwoURI}}>
              </Image>
          </TouchableWithoutFeedback>
        </View>

        <View style = {styles.titleTextWrapper}>
          <Text style={styles.titleTextStyle}>
            {this.props.title}
          </Text>
        </View>

        <View style={[styles.barItemTextWrapper, this.props.bShowRightBarItemTwo ? styles.show : styles.hidden]}>
          <TouchableWithoutFeedback
            onPress={this.props.rightBarItemTwoPressed}>
              <Text style={styles.barItemText}>
                  {this.props.rightBarItemTwoText}
              </Text>
          </TouchableWithoutFeedback>
        </View>

        <View style={[styles.barItemTextWrapper, this.props.bShowRightBarItemOne ? styles.show : styles.hidden]}>
          <TouchableWithoutFeedback
            onPress={this.props.rightBarItemOnePressed}>
              <Text style={styles.barItemText}>
                  {this.props.rightBarItemOneText}
              </Text>
          </TouchableWithoutFeedback>
        </View>

        </View>

      </View>
    );
  },
});

var styles = StyleSheet.create({
  navigationWrapper:{
    flexDirection: 'column',
    backgroundColor: '#FAFAFA',
    height: 64,
  },
  navigationBarWrapper:{
    flexDirection: 'row',
    backgroundColor: 'darkslateblue',
    height: 44,
  },
  barItemImageWrapper:{
    height: 44,
    width: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barItemImage:{
    height: 22,
    width: 22,
    resizeMode: Image.resizeMode.contain,
  },
  barItemTextWrapper:{
    height: 44,
    width: 44,
    justifyContent: 'center',
  },
  barItemText:{
    fontSize: 15,
    color: 'white',
    textAlign: 'center',
    marginRight: 10,
  },
  titleTextWrapper:{
    flex: 1,
    height: 44,
    justifyContent: 'center',
  },
  titleTextStyle:{
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    margin: 10,
  },
  hidden:{
    opacity: 0,
  },
  show:{
    opacity: 1,
  },
});

module.exports = NavBar;
