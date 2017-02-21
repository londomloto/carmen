
(function(){

    angular
        .module('core', [
            'ui.router',
            'oc.lazyLoad'
        ])
        .config(config)
        .run(run);

    /** @ngInject */
    function config($compileProvider, $httpProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/\s*(https?|ftp|mailto|data|blob|javascript):/);
        // $httpProvider.interceptors.push('httpInterceptor');
    }

    /** @ngInject */
    function run($rootScope, transient) {

        // setup transient
        transient.init();

        $rootScope.$on('$stateChangeStart', function(evt, state, params){
            transient.set('route', {
                state: angular.copy(state),
                params: angular.copy(params)
            });
        });
    }

}());