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
    .controller('ContentGeneratorCtrl', ['$scope', 'userModel', 'userGroupModel','userGroupHasUserModel', 'mock.surname', 'mock.firstname', 'mock.email', '$timeout',
        function ($scope, userModel, userGroupModel, userGroupHasUserModel, mockSurname, mockFirstname, mockEmail, $timeout) {

            // ############################# controller objects default states // ######################################

            /**
             * Holds dialog loading text to display
             * @type {string}
             */
            $scope.loadingText = 'Please wait .. creating dummy data...';

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


            /**
             * Dialog modal view toggle
             * @type {boolean}
             */
            $scope.openDialog = false;

            /**
             * Loading progress 0 to 100.
             * @type {number}
             */
            $scope.loadingProgress = 0;

            /**
             * Loading item count
             * @type {number}
             */
            $scope.itemCount = 0;

            /**
             * Loading item count max
             * @type {number}
             */
            $scope.itemCountMax = 0;


            // ################################### scope control functions // ##########################################


            /**
             *
             * @param {int} count
             */
            function generateRandomData(count) {

                //Init
                $scope.itemCountMax = count;

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

                function myTimeout (i) {
                    $timeout(function() {
                        userModel.ID = null;
                        userModel.firstname = mockFirstname.data[Math.floor((Math.random() * mockFirstname.data.length))];
                        userModel.surname = mockSurname.data[Math.floor((Math.random() * mockSurname.data.length))];
                        userModel.email = mockEmail.data[Math.floor((Math.random() * mockEmail.data.length))];
                        userModel.save();

                        userGroupHasUserModel.ID = null;
                        userGroupHasUserModel.userId = userModel.ID;
                        userGroupHasUserModel.groupId = Math.floor((Math.random() * 4))
                        userGroupHasUserModel.save();

                        //setup progress bar status
                        $scope.loadingProgress = Math.floor(((i+1) / count) * 100);
                        $scope.itemCount = i+1;


                        if ((i+1) >= count) {
                            //close dialog after short delay
                            $timeout(function() {
                                $scope.openDialog = false;
                            }, 1500);
                        }
                    }, (i+1) * 15);
                }

                //insert users
                for (var i = 0; i < count; i++) {
                    myTimeout(i);
                }

            }

            /**
             * $scope action generate small data stack
             */
            $scope.generateSmallStack = function () {

                //Init progress bar
                $scope.loadingProgress = 0;
                $scope.itemCount = 0;
                $scope.loadingText = 'Please wait .. creating dummy data...';
                $scope.openDialog = true;

                //close dialog after short delay
                $timeout(function() {
                    generateRandomData(25);
                }, 500);
            };

            /**
             * $scope action generate small data stack
             */
            $scope.generateBigStack = function () {

                //Init progress bar
                $scope.loadingProgress = 0;
                $scope.itemCount = 0;
                $scope.loadingText = 'Please wait .. creating dummy data...';
                $scope.openDialog = true;

                //close dialog after short delay
                $timeout(function() {
                    generateRandomData(1500);
                }, 500);
            }

            /**
             * $scope action generate small data stack
             */
            $scope.deleteAllData = function () {

                $scope.loadingProgress = 100;
                $scope.itemCount = userModel.findAll().length + userGroupModel.findAll().length;
                $scope.itemCountMax = userModel.findAll().length + userGroupModel.findAll().length;
                $scope.loadingText = 'Please wait .. cleaning up data...';
                $scope.openDialog = true;

                //cleanup data
                userModel.deleteAll();
                userGroupModel.deleteAll();
                userGroupHasUserModel.deleteAll();


                //close dialog after short delay
                $timeout(function() {
                    $scope.openDialog = false;
                }, 1500);
            }
        }]);
