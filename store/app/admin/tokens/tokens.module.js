
(function(){

    angular
        .module('admin.tokens', ['admin'])
        .controller('TokensController', TokensController);

    /** @ngInject */
    function TokensController(transient) {

        transient.set('page', {
            title: 'Access Tokens',
            description: 'List all registered access tokens'
        });

    }

}());