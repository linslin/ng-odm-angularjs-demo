/**
 * Content generator controller
 *
 * @name        ContentGeneratorCtrl
 * @author      Nils Gajsek <info@linslin.org>
 * @copyright   Nils Gajsek http://www.linslin.org
 * @package     ng-odm-angular.js-demo
 * @version     1.0
 */

//ECMA6 Strict
'use strict';

angular.module('angularDemoApp')
    .controller('ContentGeneratorCtrl', ['$scope', 'userModel', 'userGroupModel','userGroupHasUserModel', 'mock.surname', 'mock.firstname', 'mock.email',
        function ($scope, userModel, userGroupModel, userGroupHasUserModel, mockSurname, mockFirstname, mockEmail) {

            // ############################# controller objects default states // ######################################

            /**
             * Init random data
             */
            var randomData = {
                groups: [
                    "Admin",
                    "User",
                    "Editor",
                    "Guest"
                ]
            };


            // ################################### scope control functions // ##########################################


            /**
             *
             * @param {int} count
             */
            function generateRandomData(count) {

                //cleanup data
                userModel.deleteAll();
                userGroupModel.deleteAll();
                userGroupHasUserModel.deleteAll();

                //create groups
                angular.forEach(randomData.groups, function (groupName, key) {
                    userGroupModel.ID = null;
                    userGroupModel.title = groupName;
                    userGroupModel.save();
                });

                //insert users
                for (var i = 0; i < count; i++) {
                    userModel.ID = null;
                    userModel.firstname = mockFirstname.data[Math.floor((Math.random() * mockFirstname.data.length))];
                    userModel.surname = mockSurname.data[Math.floor((Math.random() * mockSurname.data.length))];
                    userModel.email = mockEmail.data[Math.floor((Math.random() * mockEmail.data.length))];
                    userModel.save();
                }

                // put users into group
                angular.forEach(userModel.findAll(), function (user, key) {
                    userGroupHasUserModel.ID = null;
                    userGroupHasUserModel.userId = user.ID;
                    userGroupHasUserModel.groupId = Math.floor((Math.random() * 4))
                    userGroupHasUserModel.save();
                });
            }

            /**
             * $scope action generate small data stack
             */
            $scope.generateSmallStack = function () {
                generateRandomData(25);
            };

            /**
             * $scope action generate small data stack
             */
            $scope.generateBigStack = function () {
                generateRandomData(1000);
            }

            /**
             * $scope action generate small data stack
             */
            $scope.deleteAllData = function () {
                //cleanup data
                userModel.deleteAll();
                userGroupModel.deleteAll();
                userGroupHasUserModel.deleteAll();
            }
        }]);
