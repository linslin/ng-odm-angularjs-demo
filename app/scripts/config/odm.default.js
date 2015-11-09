/**
 * angular-odm default configuration
 *
 * @name        config
 * @author      Nils Gajsek <nils.gajsek@linslin.org>
 * @copyright   2015 linslin.org
 * @package     ng-odm-angularjs-demo
 * @version     1.0
 */
(function () {

    //use strict -> ECMAScript5 error reporting
    'use strict';


    // ################################################ AngularJS Module define // #####################################

    /**
     * ODM constant. Application default main configuration.
     *
     * @name config
     */
    angular.module('ODMConfiguration', []).constant('ODM', {
        dbSchema: {
            name: 'exampleDb',
            tables: [
                {
                    name: 'user',
                    resetOnInit: false,
                    columns: [ // localStorageDB is automatically adding a unique ID attribute to every table.
                        {name: 'firstname', type: 'text'},
                        {name: 'sirname', type: 'text'},
                        {name: 'email', type: 'text'},
                        {name: 'web', type: 'text'}
                    ]
                },
                {
                    name: 'userGroup',
                    resetOnInit: false,
                    columns: [ // localStorageDB is automatically adding a unique ID attribute to every table.
                        {name: 'title', type: 'text'}
                    ]
                },
                {
                    name: 'userGroupHasUser',
                    resetOnInit: false,
                    columns: [ // localStorageDB is automatically adding a unique ID attribute to every table.
                        {name: 'userId', type: 'integer'},
                        {name: 'groupId', type: 'integer'}
                    ]
                }
            ]
        }
    })
})();