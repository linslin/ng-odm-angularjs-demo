/**
 * User list controller
 *
 * @name        UserListCtrl
 * @author      Nils Gajsek <info@linslin.org>
 * @copyright   Nils Gajsek http://www.linslin.org
 * @package     ng-odm-angular.js-demo
 * @version     1.0
 */

//ECMA6 Strict
'use strict';


angular.module('angularDemoApp')
    .controller('UserListCtrl', function () {
        this.awesomeThings = [
            'HTML5 Boilerplate',
            'AngularJS',
            'Karma'
        ];
    });
