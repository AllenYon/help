NavigationBar
===========
---------------

RN版导航栏组件
---------------

### 调用方式：
    var MGRctNavigationBar = require('../../widget/NavigationBar/NavigationBar.ios');

    eg:
    <MGRctNavigationBar
      title = 'React Native'

      bShowRightBarItemOne = {true}
      rightBarItemOneText = '分享'
      rightBarItemOnePressed = {
        () => MGRctBridge.sharedAction('React Native Share Test', 'content', 'http://s16.mogucdn.com/p1/150623/upload_ie2geylemi2tontggezdambqgiyde_300x200.png', 'http://www.mogujie.com')
      } />
### 方法：

    *

### 参数：

      leftBarItemOneURI: PropTypes.string,     // 默认显示返回图标 '<' 也可通过指定leftBarItemURI来设置 例如:    'MGJControls.bundle/btn_navigationbar_back.png'
      leftBarItemOnePressed: PropTypes.func,   // 默认执行返回上一页的动作
      bShowLeftBarItemOne: PropTypes.bool,     // 默认为YES 显示返回按钮

      leftBarItemTwoURI: PropTypes.string,     // 导航栏左侧第二个按钮图标
      leftBarItemTwoPressed: PropTypes.func,
      bShowLeftBarItemTwo: PropTypes.bool,     // 默认为NO 隐藏左侧第二个按钮

      title: PropTypes.string,                 // Navigation Bar 标题

      rightBarItemTwoText: PropTypes.string,
      rightBarItemTwoPressed: PropTypes.func,  // 例如 () => MGRctBridge.showNotice('菇凉，你的网络好像不是很给力哦')
      bShowRightBarItemTwo: PropTypes.bool,

      rightBarItemOneText: PropTypes.string,
      rightBarItemOnePressed: PropTypes.func,  // 例如 () => MGRctBridge.showNotice('菇凉，你的网络好像不是很给力哦')
      bShowRightBarItemOne: PropTypes.bool,


### License

Copyright (c) 2015-present, juangua, Inc.
Licensed under the MIT license.
