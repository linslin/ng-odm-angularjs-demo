/**
 * Route service configuration
 * Is called on first page load.
 *
 * @name        app.route
 * @author      Nils Gajsek <info@linslin.org>
 * @copyright   Nils Gajsek http://www.linslin.org
 * @package     ng-odm-angular.js-demo
 * @version     1.0
 */
(function () {

    //use strict -> ECMAScript5 error reporting
    'use strict';


    // ################################################ angularJS Module define // ####################################

    /**
     * Route service object, part of app module
     */
    angular
        .module('app.route', ['ngRoute'])  // [-_-]
        .config(['$routeProvider', config])
        .controller('routeServiceCtrl', [
            '$scope',
            '$rootScope',
            '$location',
            routeServiceCtrl])
        .factory('route', [run]);


        /**
         * Application routes routine
         *
         * @param $routeProvider
         */
        function config ($routeProvider) {

            /**
             * Configure application routes
             */
            $routeProvider
                .when('/', {
                    templateUrl: 'views/main.html',
                    controller: 'MainCtrl'
                })
                .when('/listUsers', {
                    templateUrl: 'views/users/list.html',
                    controller: 'UserListCtrl'
                })
                .when('/manageUsers', {
                    templateUrl: 'views/users/manage.html',
                    controller: 'UserManageCtrl'
                })
                .when('/manageUserGroups', {
                    templateUrl: 'views/userGroups/manage.html',
                    controller: 'UserGroupManageCtrl'
                })
                .otherwise({
                    redirectTo: '/'
                });
        }

        /**
         * Factory container, only used to trigger ".config" function on startup
         */
        function run() {
            return true;
        }


        /**
         * Route service container
         *
         * @param {$scope}       $scope
         * @param {$rootScope}   $rootScope
         * @param {$location}    $location
         */
        function routeServiceCtrl($scope, $rootScope, $location) {

            /**
             * Scope service "isPage". Check if given route is current page
             *
             * @param {string} pageRoute
             *
             * @return boolean
             */
            $scope.isPage = function(pageRoute) {

                //check if current path is pageRoute
                if ($location.path() === pageRoute) {
                    return true;
                }

                return false;
            }
        }
})();