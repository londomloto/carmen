
(function(){

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config(routerProvider, loaderProvider, API) {
        
        ///////// MODULES /////////

        loaderProvider.register({
            'store.styles': [
                'node_modules/font-awesome/css/font-awesome.css',
                'node_modules/bootstrap/dist/css/bootstrap.css',
                'node_modules/bootstrap/dist/css/bootstrap-theme.css',
                'assets/css/carmen.css',
                'assets/css/animate.css',
                'assets/css/effects.min.css'
            ],

            'store.home.styles': {
                files: ['assets/css/carmenslider.css'],
                media: 'all'
            },

            'store.scripts': [
                'node_modules/bootstrap/dist/js/bootstrap.js'
            ],

            'store.home.scripts': [
                'assets/js/carmenslider.js',
                'app/store/home/home.module.js'
            ]
        });

        ///////// ROUTES /////////

        routerProvider
            .group('store', {
                deps: ['store.styles', 'store.scripts'],
                layout: 'layouts/store.html',
                routes: {
                    'home': {
                        url: '/home',
                        deps: ['store.home.styles', 'store.home.scripts'],
                        templateUrl: 'app/store/home/home.html',
                        controller: 'StoreHomeController as vm'
                    },
                    'account': {
                        url: '/account'
                    },
                    'appointment': {
                        url: '/appointment'
                    }
                }
            })
            .group('admin', {
                layout: 'layouts/admin.html',
                routes: {
                    'login': { url: '/login' },
                    'user': { url: '/user' }
                }
            })
            .fallback({
                url: '/store/home'
            });
    }

}());