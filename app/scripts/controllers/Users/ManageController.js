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
    .controller('UserManageCtrl', [ '$scope', 'userModel', 'userGroupModel', 'userGroupHasUserModel', 'lodash' ,
        function ($scope, userModel, userGroupModel, userGroupHasUserModel, lodash) {

            // ################################ controller objects default states // #######################################

            /**
             * Init users groups
             */
            $scope.userGroups = userGroupModel.findAll();

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
             * @type {boolean}
             */

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
                var userData = userModel.findAll();

                angular.forEach(userData, function (user, key){

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
                    $scope.users.push(user);
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
                console.log(userId);

                //search for your to delete from scope
                var indexToModify = lodash.findIndex($scope.users, function (chr) {
                    return chr.ID == userId;
                });


                //validate search result
                if (indexToModify !== -1) {
                    $scope.users[indexToModify].group.ID = userGroupId;
                    console.log($scope.users[indexToModify]);
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
                }
            };


            //call init on button after load
            init();
        }]);
