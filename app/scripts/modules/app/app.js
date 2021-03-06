/**
 * angularDemoApp
 *
 * @name        angularDemoApp
 * @author      Nils Gajsek <info@linslin.org>
 * @copyright   Nils Gajsek http://www.linslin.org
 * @package     ng-odm-angular.js-demo
 * @version     1.0
 */

//ECMA6 Strict
'use strict';

angular
    .module('angularDemoApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ngLodash',
        'ODMConfiguration',
        'mock.surname',
        'mock.firstname',
        'mock.email',
        'ngOdm',
        'model.user',
        'model.userGroup',
        'model.userGroupHasUser',
        'app.startupRoutine',
        'app.route',
        'app.ui'
    ])
    .run(['startupRoutine', run]);


    // ################################################## angularJS Methods  // ########################################


    /**
     * Application start run routine
     *
     * @param $ionicPlatform
     * @param startupRoutine
     */
    function run(startupRoutine) {

        //run startup routine on any direct reload
        startupRoutine.run();
    }
