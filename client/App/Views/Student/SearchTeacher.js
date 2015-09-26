'use strict';

var React = require('react-native');
var styles = require('./style');

var {
  ScrollView,
  Text,
  View,
} = React;


var SearchTeacher = React.createClass({
    render: function() {
      return (
        <ScrollView >
          <View style={{flex:1,backgroundColor:'red'}}></View>
        </ScrollView>
      );
    },
});

module.exports = SearchTeacher;
