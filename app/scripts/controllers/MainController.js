/**
 * Main controller
 *
 * @name        MainCtrl
 * @author      Nils Gajsek <info@linslin.org>
 * @copyright   Nils Gajsek http://www.linslin.org
 * @package     ng-odm-angular.js-demo
 * @version     1.0
 */

//ECMA6 Strict
'use strict';

angular.module('angularDemoApp')
    .controller('MainCtrl', ['$odm', 'userModel', function ($odm, userModel) {


        userModel.ID = null;
        userModel.namespace = 'test';
        userModel.save().then(function () {
            userModel.findAll().then(function () {
                console.log(userModel);
            });
        });

        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    }]);
