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
    .controller('UserListCtrl', ['userModel', 'userGroupModel', '$scope', 'lodash', '$rootScope', '$timeout'
        , function (userModel, userGroupModel, $scope, lodash, $rootScope, $timeout) {

            // ############################## controller objects default states // #####################################

            /**
             * Init users
             */
            $scope.users = userModel.findAll();

            /**
             * Pagination item per page number
             * @type {number}
             */
            var itemPerPage = 200;

            /**
             * Hold max count of pages at 50 items per pae.
             * {Integer}
             */
            $scope.pageCount = Math.ceil(userModel.findAll().length / itemPerPage);
            /**
             *  Current page id
             * @type {number}
             */
            $scope.currentPage = 1;

            /**
             * Setup init state of current page user items
             * @type {Array.<T>}
             */
            $scope.currentPageUserItem = $scope.users.slice((itemPerPage * ($scope.currentPage - 1 )), itemPerPage * $scope.currentPage);


            // #################################### scope control functions // ##########################################

            /**
             * Set page action
             *
             * @param {number} pageId
             */
            $scope.setPage = function (pageId) {
                $scope.currentPage = pageId;
                $scope.currentPageUserItem = $scope.users.slice((itemPerPage * ($scope.currentPage - 1 )), itemPerPage * $scope.currentPage);
            };


            $timeout(function () {
                $rootScope.$broadcast('toggleLoading', false);
            }, 550);
        }])

    /**
     * Range filter
     * @TODO maybe outsource
     */
    .filter('range', function () {
        return function (input, total) {
            total = parseInt(total);

            for (var i = 0; i < total; i++) {
                input.push(i);
            }

            return input;
        };
    });
