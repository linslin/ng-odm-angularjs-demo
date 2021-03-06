/**
 * User group manage controller
 *
 * @name        UserManageCtrl
 * @author      Nils Gajsek <info@linslin.org>
 * @copyright   Nils Gajsek http://www.linslin.org
 * @package     ng-odm-angular.js-demo
 * @version     1.0
 */

//ECMA6 Strict
'use strict';


angular.module('angularDemoApp')
    .controller('UserGroupManageCtrl', [ '$scope', 'userGroupModel', 'lodash', 'userGroupHasUserModel', '$timeout', '$rootScope',
        function ($scope, userGroupModel, lodash, userGroupHasUserModel, $timeout, $rootScope) {

        // ################################ controller objects default states // #######################################


        /**
         * Init users
         */
        $scope.userGroups = userGroupModel.findAll();

        /**
         * User Add error scope
         * @param user
         */
        $scope.error = {
            title: false
        };

        /**
         * Hold default form data
         *
         * @name  defaultFormData
         * @type {{surname: string, firstname: string, email: string}}
         */
        var defaultFormData = {
            title: ''
        };

        /**
         * Default alert box state
         * @type {boolean}
         */
        $scope.showAlert = false;


        // ###################################### scope control functions // ###########################################

        /**
         * Add user
         *
         * @param {object} user
         */
        $scope.addUserGroup = function (userGroup) {

            //Init valid state
            var valid = true;

            //validate input
            if (userGroup === undefined || userGroup.title === undefined || String(userGroup.title).length === 0) {
                valid = false;
                $scope.error.title = true;
            } else {
                $scope.error.title = false;
            }


            //save if valid
            if (valid) {

                //Setup user model
                userGroupModel.ID = null;
                userGroupModel.title = userGroup.title;

                //Save to local storage db
                userGroupModel.save();

                $scope.userGroups.push({
                    ID: userGroupModel.ID,
                    title: userGroupModel.title
                });

                //set alert
                $scope.showAlert = true;

                //reset form
                $scope.addUserGroupForm.$setPristine();
                $scope.userGroup = angular.copy(defaultFormData);
            } else {
                //set alert
                $scope.showAlert = false;
            }
        };


        /**
         * Get user group count
         *
         * @param userGroupId
         * @returns {*}
         */
        $scope.getUserGroupCount = function (userGroupId) {

            //search for your to delete from scope
            var indexToDelete = lodash.findIndex($scope.userGroups, function (chr) {
                return chr.ID == userGroupId;
            });

            //validate search result
            if (indexToDelete !== -1) {
                $scope.userGroups[indexToDelete].userCount = userGroupHasUserModel.countByAttributes({groupId: userGroupId});
            }
        };

        /**
         * Delete user action
         *
         * @param userGroupId
         */
        $scope.deleteUserGroup = function (userGroupId) {

            //delete all users in group
            userGroupHasUserModel.deleteByAttributes({ "groupId": userGroupId});

            //delete group
            if (userGroupModel.deleteByPk(userGroupId)) {

                //search for your to delete from scope
                var indexToDelete = lodash.findIndex($scope.userGroups, function (chr) {
                    return chr.ID == userGroupId;
                });

                //validate search result
                if (indexToDelete !== -1) {
                    $scope.userGroups.splice(indexToDelete, 1);
                }
            }
        };

        $timeout(function () {
            $rootScope.$broadcast('toggleLoading', false);
        }, 550);
    }]);
