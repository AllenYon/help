'use strict';

var React = require('react-native');
var Button = require('../Widget/Button');
var Login = require('./User/Login');
var ModalExample =require('./ModalExample')

var {
  StyleSheet,
  NavigatorIOS,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
} = React;


var DevView = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
        component: DevContent,
        title: 'Dev',
        }}
      />
    );
  },
});



var DevContent= React.createClass({
  _renderLogin:function(){

    return (
      <Button
        onPress={(e)=>{
          this.props.navigator.push({
                  title: "登录",
                  component: Login,
                  leftButtonTitle: 'Back',
                  onLeftButtonPress: () => this.props.navigator.pop(),
                });
        }}
        >登录</Button>
    );
  },
  render:function(){
    return(
      <ScrollView>
        {this._renderLogin()}
      </ScrollView>
    );
  },
});

var styles = StyleSheet.create({
  row :{
    color: '#0089FF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F6F6EF',
  },
});

module.exports = DevView;
