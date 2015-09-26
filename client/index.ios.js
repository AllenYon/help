/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var TabBarExample =require('./App/Views/TabBarView');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

var Helper = React.createClass({
  render: function() {
    return (
      <TabBarExample/>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('Helper', () => Helper);
