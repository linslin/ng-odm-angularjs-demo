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
    .controller('ContentGeneratorCtrl', ['$odm', 'userModel',
        function ($odm, userModel) {



            // ################################ controller objects default states // ######################################

            /**
             * Init users
             */
            var randomData = {
                user:  {
                    firstname: [
                        "Bob",
                        "Bobby"
                    ],
                    surname: "",
                    email: ""
                },
                groups: [
                    {
                        title: "Admin"
                    },
                    {
                        title: "User"
                    },
                    {
                        title: "Editor"
                    },
                    {
                        title: "Guest"
                    }
                ]
            };


            // ###################################### scope control functions // ###########################################

        }]);
