'use strict';

var React = require('react-native');
var styles = require('./style');
var Button =require('../../Widget/Button');

var API_LOGIN='http://127.0.0.1:3000/login';

var {
  ScrollView,
  TextInput,
  Text,
  View,
} = React;


var Login = React.createClass({
    getInitialState: function() {
      return {
        username:'',
        password:'',
      };
    },
    _onPressLogin:function(){
        var userName=this.state.username;
        var password=this.state.password;
        var req=API_LOGIN+'?name='+userName+'&password='+password;

        fetch(req)
          .then((response) => response.json())
          .then((responseData) => {
            console.log(responseData);
            this.setState({
              post_text: responseData.text,
              post_url: responseData.url,
              loaded: true
            });
            if(responseData.kids){
              // this.fetchComments(responseData.kids, 0, responseData.kids.length, []);
            }
          })
          .done();

        console.log(password);
    },

    render: function() {
      return (
        <ScrollView >
          <View style={{flexDirection:'row',flex:1}}>
            <Text>用户名</Text>
            <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1,flex:1}}
              onChangeText={(text) => this.setState({username:text})}
              value={this.state.text}/>
          </View>
          <View style={{flexDirection:'row',flex:1}}>
          <Text>密码</Text>
          <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1,flex:1}}
              onChangeText={(text) => this.setState({password:text})}
              value={this.state.text}
              />
          </View>
          <Button onPress={this._onPressLogin}>登录</Button>
        </ScrollView>
      );
    },
});

module.exports = Login;
