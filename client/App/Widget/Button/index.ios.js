/**
 * Copyright (c) 2015-present, juangua, Inc.
 * All rights reserved.
 *
 * ButtonView
 */
'use strict';

var React = require('react-native');

var {
  Text,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet,
} = React;


var ButtonView = React.createClass({
  render: function() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        style={[this.props.style||styles.button]}>
        <Text>
          {this.props.children}
        </Text>
      </TouchableOpacity>
    );
  },
});


var styles = StyleSheet.create({
  button:{
    height:44,
    width:88,
    backgroundColor:'red'
  },
});
module.exports = ButtonView;
