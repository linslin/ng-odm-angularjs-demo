/**
 * Startup routine
 * Is called on first page load.
 *
 * @name        app.startupRoutine
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
     * startup Routine service, part of app module
     */
    angular
        .module('app.startupRoutine', [])  // [-_-]
        .factory('startupRoutine', [
            '$rootScope',
            '$cookieStore',
            '$timeout',
            '$odm',
            startupRoutine
        ]);


        // ############################################# angularJS factory methods  // ##################################


        /**
         * Startup routine wrapper
         *
         * @param {object} $rootScope
         * @param {object} $cookieStore
         * @param {object} $timeout
         * @param {object} $odm
         *
         * @returns self
         */
        function startupRoutine(
            $rootScope,
            $cookieStore,
            $timeout,
            $odm
        ) {


            /**
             * Return object functions
             */
            return {

                /**
                 * Application startup routine
                 */
                run: function () {
                    //application init stuff here
                }
            };
        }
})();