'use strict';

var React = require('react-native');
var Button = require('../Widget/Button');
var NavBar = require('../Widget/NavigationBar');
var SearchTeacher=require('./Student/SearchTeacher')


var {
  StyleSheet,
  NavigatorIOS,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} = React;


var HelpIndexView = React.createClass({
  statics: {
    title: '<TabBarIOS>',
    description: 'Tab-based navigation.',
  },

  getInitialState: function() {
    return {
      selectedTab: 'redTab',
      notifCount: 0,
      presses: 0,
    };
  },

  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
        component: ChatListView,
        title: 'ChatListView',
        passProps: { myProp: 'foo' },
        rightButtonTitle: 'Add',
        onRightButtonPress: this._handleNextButtonPress,
        }}
      />
    );
  },

});


var ChatListView = React.createClass({
    getInitialState: function() {
      var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
      return {
        // dataSource: ds.cloneWithRows(['row 1', 'row 2']),
        dataSource:ds.cloneWithRows(this._genRows({})),
      };

    },
    _handleBackButtonPress: function() {
      this.props.navigator.pop();
    },
    _handleNextButtonPress: function() {
      this.props.navigator.push(nextRoute);
    },
    _genRows: function(pressData: {[key: number]: boolean}): Array<string> {
      var dataBlob = [];
      for (var ii = 0; ii < 100; ii++) {
        var pressedText = pressData[ii] ? ' (pressed)' : '';
        dataBlob.push('Row ' + ii + pressedText);
      }
      return dataBlob;
    },

    _renderRow: function(rowData: string, sectionID: number, rowID: number) {
    return (
      <TouchableHighlight onPress={() => this._pressRow(rowID)}>
        <View>
          <View style={styles.row}>
            <Text style={styles.text}>
              {rowData + ' - ' }
            </Text>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableHighlight>
    );
    },

    _onPressStudent:function(){
      this.props.navigator.push({
              title: "我是学生",
              component: SearchTeacher,
              leftButtonTitle: 'Back',
              onLeftButtonPress: () => this.props.navigator.pop(),
              onRightButtonPress: () => {},
              passProps: {
                text: 'This page has an icon for the right button in the nav bar',
              }
            });
    },
    render: function() {
      return (
        <ScrollView>
          <TouchableOpacity
            onPress={()=>this._onPressStudent()}>
            <Text>
              xxxxxxxxx
            </Text>
          </TouchableOpacity>

          <Button
            style={{height:44, width:88, backgroundColor:'blue'}}
            onPress={this._onPressStudent}>
            我是学生
          </Button>
          <Button
            style={{height:44, width:88, backgroundColor:'blue'}}
            onPress={this._onPressStudent}>
            我是老师
          </Button>
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

module.exports = HelpIndexView;
