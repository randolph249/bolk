/**
 *定义前端路由
 **/
angular.module('bolkApp').config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    /**
    *路径映射
    {
      root:'入口页面',//所有的购买功能都放到这个入口下边
      notfound:'404页面',
      locate:'定位入口'
    }
    **/
    $stateProvider
      .state('root', {
        url: '/',
        templateUrl: '../assets/views/root/root.html',
        controller: 'rootCtrl',
        resolve: {
          loadCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name: 'bolkApp',
              files: [
                '../assets/views/root/root.js',
                '../assets/views/root/root.css',
                '../assets/views/root/reset.css',
                'http://at.alicdn.com/t/font_1445354985_608782.css'
              ]
            })
          }]
        }
      });
  }
]);

//默认跳转到首页
angular.module('bolkApp').run(['$state', '$rootScope', '$timeout', function(
  $state,
  $rootScope, $timeout) {
  var t = $timeout(function() {
    $state.go('root');
  }, 50);
  var startWatcher = $rootScope.$on('$stateChangeStart', function(e,
    toState, toParam) {
    $timeout.cancel(t);
    startWatcher();
  });
}]);
