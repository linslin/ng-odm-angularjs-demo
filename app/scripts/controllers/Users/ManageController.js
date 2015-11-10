/**
 * User manage controller
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
    .controller('UserManageCtrl', [ '$scope', 'userModel', 'userGroupModel', 'userGroupHasUserModel', 'lodash', '$rootScope', '$timeout',
        function ($scope, userModel, userGroupModel, userGroupHasUserModel, lodash, $rootScope, $timeout) {


            // ############################### controller objects default states // #####################################

            /**
             * Init users groups
             */
            $scope.userGroups = userGroupModel.findAll();

            /**
             * Pagination item per page number
             * @type {number}
             */
            var itemPerPage = 90;

            /**
             * Hold max count of pages at 50 items per pae.
             * {Integer}
             */
            $scope.pageCount = 1;

            /**
             *  Current page id
             * @type {number}
             */
            $scope.currentPage = 1;


            /**
             * Setup init state of current page user items
             * @type {Array.<T>}
             */
            $scope.currentPageUserItem = {};

            /**
             * User Add error scope
             * @param user
             */
            $scope.error = {
                surname: false,
                firstname: false,
                email: false
            };

            /**
             * Hold default form data
             *
             * @name  defaultFormData
             * @type {{surname: string, firstname: string, email: string}}
             */
            var defaultFormData = {
                surname: '',
                firstname: '',
                email: ''
            };

            /**
             * Default group data object
             *
             * @type {{ID: null, title: string}}
             */
            var defaultGroupData = {
                ID: null,
                title: 'None'
            };

            /**
             * Default alert box state
             * @type {boolean}
             */
            $scope.showAlert = false;


            /**
             * Default alert box state
             * @type {Array}
             */
            $scope.users = [];



            // ###################################### scope control functions // ###########################################

            /**
             * Init users nested with groups
             */
            function init () {

                //Get all users
                $scope.users = userModel.findAll();
                $scope.pageCount = Math.ceil($scope.users.length / itemPerPage);

                //slice item for current page
                $scope.currentPageUserItem =  $scope.users.slice((itemPerPage * ($scope.currentPage -1 )),itemPerPage *$scope.currentPage);

                //generate group data for UI
                generateGroupData();

                $timeout(function () {
                    $rootScope.$broadcast('toggleLoading', false);
                }, 550);
            }


            /**
             * Will add group data to current page items
             */
            function generateGroupData () {

                angular.forEach($scope.currentPageUserItem, function (user, key){


                    // clone object to make async handling work here
                    var userGroupHasUserData = userGroupHasUserModel.findByAttributes({userId: user.ID});

                    if (userGroupHasUserData !== undefined && userGroupHasUserData.groupId !== 0 ) {

                        //find user group data by PK
                        var userGroupData = userGroupModel.findByPk(userGroupHasUserData.groupId);

                        user.group = {
                            ID: userGroupData.ID,
                            title: userGroupData.title
                        };
                    } else {
                        user.group =  angular.copy(defaultGroupData);
                    }

                    // set group data & and user data
                    $scope.currentPageUserItem[key] = user;
                });
            }


            /**
             * Add user
             *
             * @param {object} user
             */
            $scope.addUser = function (user) {

                //Init valid state
                var valid = true;

                //validate input
                if (user === undefined || user.firstname === undefined || String(user.firstname).length === 0) {
                    valid = false;
                    $scope.error.firstname = true;
                } else {
                    $scope.error.firstname = false;
                }

                if (user === undefined || user.surname === undefined || String(user.surname).length === 0) {
                    valid = false;
                    $scope.error.surname = true;
                } else {
                    $scope.error.surname = false;
                }

                if (user === undefined || user.email === undefined || String(user.email).length === 0) {
                    valid = false;
                    $scope.error.email = true;
                } else {
                    $scope.error.email = false;
                }


                //save if valid
                if (valid) {

                    //Setup user model
                    userModel.ID = null;
                    userModel.firstname = user.firstname;
                    userModel.surname = user.surname;
                    userModel.email = user.email;

                    //Save to local storage db
                    userModel.save();

                    $scope.users.push({
                        ID: userModel.ID,
                        firstname: userModel.firstname,
                        surname: userModel.surname,
                        email: userModel.email,
                        group: defaultGroupData
                    });

                    //set alert
                    $scope.showAlert = true;

                    //reset form
                    $scope.addUserForm.$setPristine();
                    $scope.user = angular.copy(defaultFormData);
                } else {
                    //set alert
                    $scope.showAlert = false;
                }
            };

            /**
             *
             * @param userId
             * @param userGroupId
             */
            $scope.setUserToGroup = function (userId, userGroupId, userGroupTitle) {

                //delete current group relations
                userGroupHasUserModel.deleteByAttributes({ "userId": userId});

                //setup user group has user model data
                userGroupHasUserModel.ID = null;
                userGroupHasUserModel.userId = userId;
                userGroupHasUserModel.groupId = userGroupId;

                //try save
                userGroupHasUserModel.save();

                //search for your to delete from scope
                var indexToModify = lodash.findIndex($scope.users, function (chr) {
                    return chr.ID == userId;
                });


                //validate search result
                if (indexToModify !== -1) {
                    $scope.users[indexToModify].group.ID = userGroupId;
                    $scope.users[indexToModify].group.title = userGroupTitle;
                }
            };


            /**
             * Delete user action
             *
             * @param userId
             */
            $scope.deleteUser = function (userId) {
                if (userModel.deleteByPk(userId)) {

                    //search for your to delete from scope
                    var indexToDelete = lodash.findIndex($scope.users, function (chr) {
                        return chr.ID == userId;
                    });

                    //validate search result
                    if (indexToDelete !== -1) {
                        $scope.users.splice(indexToDelete, 1);
                    }

                    //search for your to delete from scope
                    var indexToDelete = lodash.findIndex($scope.currentPageUserItem, function (chr) {
                        return chr.ID == userId;
                    });
                    //validate search result
                    if (indexToDelete !== -1) {
                        $scope.currentPageUserItem.splice(indexToDelete, 1);
                    }
                }
            };


            /**
             * Set page action
             *
             * @param {number} pageId
             */
            $scope.setPage = function (pageId) {

                $scope.currentPage = pageId;
                $scope.currentPageUserItem = $scope.users.slice((itemPerPage * ($scope.currentPage -1 )), itemPerPage *$scope.currentPage);

                //generate group data for UI
                generateGroupData();
            };


            //call init on button after load
            init();
        }]);
