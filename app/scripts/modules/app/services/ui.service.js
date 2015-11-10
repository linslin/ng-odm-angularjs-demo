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
        .module('app.ui', [])  // [-_-]
        .controller('uiServiceCtrl', [
            '$scope',
            '$rootScope',
            '$location',
            uiServiceCtrl]);


    /**
     * UI service controller
     *
     * @param {$scope}       $scope
     * @param {$rootScope}   $rootScope
     * @param {$location}    $location
     */
    function uiServiceCtrl($scope, $rootScope, $location) {


        // ############################## controller objects default states // #####################################

        /**
         * Loading toggle ui box
         * @type {boolean}
         */
        $scope.loading = false;



        // #################################### scope control functions // ##########################################

        /**
         * Global broadcast listener
         *
         * @type {boolean} status
         */
        $rootScope.$on('toggleLoading', function (event, status) {
            $scope.loading = status;
        });
    }
})();