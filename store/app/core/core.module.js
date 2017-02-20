
(function(){

    angular
        .module('core', [
            'ui.router',
            'oc.lazyLoad'
        ])
        .run(run);

    /** @ngInject */
    function run($rootScope) {
        $rootScope.site = {};
    }

}());