
(function(){

    angular
        .module('admin.products', ['admin'])
        .controller('AdminProductsController', AdminProductsController);

    /** @ngInject */
    function AdminProductsController(transient) {

        transient.set('page', {
            title: 'Products',
            description: 'List all available products'
        });

    }

}());