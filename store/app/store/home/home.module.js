
(function(){

    angular
        .module('store.home', ['app'])
        .controller('StoreHomeController', StoreHomeController)
        .directive('uislider', uislider);

    function StoreHomeController() {
        
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