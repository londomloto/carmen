
(function(){

    angular
        .module('admin.users', ['admin'])
        .controller('UsersController', UsersController);

    /** @ngInject */
    function UsersController(transient) {

        transient.set('page', {
            title: 'Users',
            description: 'List all registered users'
        });

    }

}());