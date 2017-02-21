
(function(){

    angular
        .module('store.home', ['app'])
        .controller('StoreHomeController', StoreHomeController)
        .directive('uislider', uislider);

    /** @ngInject */
    function StoreHomeController($scope) {
        
        $scope.products = [
            {name: 'Example Product', slug: 'example-product-1', image: '1.jpg'}
        ];

    }

    function uislider() {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, element, attrs) {
            element.bsTouchSlider();
        }
    }


}());