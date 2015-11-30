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
    .controller('MainCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {

        // ################################### scope control functions // ##########################################

        /**
         * Broadcast on loading -> first page load.
         */
        $rootScope.$broadcast('toggleLoading', false);
    }]);
