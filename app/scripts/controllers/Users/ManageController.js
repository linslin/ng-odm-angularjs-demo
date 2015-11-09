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
         * Init users nested with groups
         */
        var userData = userModel.findAll();

        //Init
        $scope.users = [];
        var userGroupHasUserModelClones = [];
        var userGroupModelClones = [];


        angular.forEach(userData, function (user, key){

            //Init
            var groupData = {
                ID: null,
                title: 'None'
            };

            // clone object to make async handling work here
            var userGroupHasUserData = userGroupHasUserModel.findByAttributes({userId: user.ID});

            if (userGroupHasUserData !== undefined && userGroupHasUserData.groupId !== 0 ) {

                //find user group data by PK
                var userGroupData = userGroupModel.findByPk(userGroupHasUserData.groupId);

                groupData = {
                    ID: userGroupData.ID,
                    title: userGroupData.title
                };
            }

            // set group data & and user data
            user.group = groupData;
            $scope.users.push(user);
        });

        /**
         * Init users groups
         */
        $scope.userGroups = userGroupModel.findAll();

        /**
         * User Add error scope
         * @param user
         */
        $scope.error = {
            sirname: false,
            firstname: false,
            email: false
        };

        /**
         * Hold default form data
         *
         * @name  defaultFormData
         * @type {{sirname: string, firstname: string, email: string}}
         */
        var defaultFormData = {
            sirname: '',
            firstname: '',
            email: ''
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

            if (user === undefined || user.sirname === undefined || String(user.sirname).length === 0) {
                valid = false;
                $scope.error.sirname = true;
            } else {
                $scope.error.sirname = false;
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
                userModel.sirname = user.sirname;
                userModel.email = user.email;

                //Save to local storage db
                userModel.save().then(function(){
                    $scope.users.push({
                        ID: userModel.ID,
                        firstname: userModel.firstname,
                        sirname: userModel.sirname,
                        email: userModel.email
                    });

                    //set alert
                    $scope.showAlert = true;

                    //reset form
                    $scope.addUserForm.$setPristine();
                    $scope.user = angular.copy(defaultFormData);
                });
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
            var indexToDelete = lodash.findIndex($scope.users, function (chr) {
                return chr.ID == userId;
            });

            //validate search result
            if (indexToDelete !== -1) {
                $scope.users[indexToDelete].group.ID = userGroupId;
                $scope.users[indexToDelete].group.title = userGroupTitle;
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
    }]);
