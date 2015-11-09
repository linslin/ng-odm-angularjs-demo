/**
 * User model
 *
 * @name        model.user
 * @author      Nils Gajsek <info@linslin.org>
 * @copyright   Nils Gajsek
 * @package     ng-odm-angular.js-demo
 * @version     1.0
 */
(function () {

    //use strict -> ECMAScript5 error reporting
    'use strict';


    // ################################################ angularJS Module define // #####################################

    /**
     * User Model, Application model.
     */
    angular
        .module('model.user', []) // [-_-]
        .factory('userModel', ['$odm', userModel]);


    /**
     * User model object
     *
     * @param {object} $odm
     *
     * @returns {self}
     */
    function userModel($odm) {

        //Init object
        var self = this;

        //define model object table
        self._table = 'user';

        //define model attributes configuration
        //every attribute is access able via "modelclass.attributeKey"
        // HINT: "modelclass.ID" is automatically added by localStorageDB
        self._attributes = [
            {name: 'firstname', type: 'text'},
            {name: 'sirname', type: 'text'},
            {name: 'email', type: 'text'},
            {name: 'web', type: 'text'}
        ];

        //Init model and return -> will merge modelChild and parent class
        return $odm.model().getInstance().init(self);
    }
})();