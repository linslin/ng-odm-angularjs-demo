/**
 * User group model
 *
 * @name        model.userGroup
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
        .module('model.userGroup', []) // [-_-]
        .factory('userGroupModel', ['$odm', userGroupModel]);


    /**
     * User model object
     *
     * @param {object} $odm
     *
     * @returns {self}
     */
    function userGroupModel($odm) {

        //Init object
        var self = this;

        //define model object table
        self._table = 'userGroup';

        //define model attributes configuration
        //every attribute is access able via "modelclass.attributeKey"
        // HINT: "modelclass.ID" is automatically added by localStorageDB
        self._attributes = [
            {name: 'title', type: 'text'},
        ];

        //Init model and return -> will merge modelChild and parent class
        return $odm.model().getInstance().init(self);
    }
})();