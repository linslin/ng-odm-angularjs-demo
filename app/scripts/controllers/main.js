'use strict';

/**
 * @ngdoc function
 * @name angularDemoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularDemoApp
 */
angular.module('angularDemoApp')
  .controller('MainCtrl', ['$odm', 'userModel' , function ($odm, userModel) {

      $odm.db().init();

      userModel.ID = null;
      userModel.namespace = 'test';
      userModel.save().then(function(){
          userModel.findAll().then(function() {
              console.log(userModel);
          });
      });

    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  }]);
