
(function(){

    angular
        .module('app')
        .config(config);

    /** @ngInject */
    function config(routerProvider, loaderProvider, API) {
        
        ///////// MODULES /////////

        loaderProvider.register({
            'store.styles': [
                'node_modules/font-awesome/css/font-awesome.min.css',
                'node_modules/bootstrap/dist/css/bootstrap.min.css',
                'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
                'assets/css/store.css',
                'assets/css/animate.css',
                'assets/css/effects.min.css'
            ],

            'store.home.styles': [ 'assets/css/storeslider.css' ],

            'store.scripts': [
                'node_modules/bootstrap/dist/js/bootstrap.min.js',
                'app/store/store.module.js'
            ],

            'store.home.scripts': [
                'assets/js/storeslider.js',
                'app/store/home/home.module.js'
            ],

            'store.products.scripts': [ 'app/store/products/products.module.js' ],

            'admin.styles': [
                'node_modules/font-awesome/css/font-awesome.min.css',
                // 'node_modules/ionicons-npm/css/ionicons.min.css',
                'node_modules/roboto-fontface/css/roboto/roboto-fontface.css',
                'node_modules/bootstrap/dist/css/bootstrap.min.css',
                'node_modules/bootstrap/dist/css/bootstrap-theme.min.css',
                'assets/css/admin/admin.css',
                'assets/css/admin/skins/skin-red-light.css'
            ],

            'admin.scripts': [
                'node_modules/bootstrap/dist/js/bootstrap.min.js',
                'node_modules/jquery-slimscroll/jquery.slimscroll.js',
                'node_modules/fastclick/lib/fastclick.js',
                'assets/js/admin/admin.js',
                'app/admin/admin.module.js',
                'app/admin/admin.directive.js'
            ],

            'admin.dashboard.scripts': [ 'app/admin/dashboard/dashboard.module.js' ],
            'admin.products.scripts': [ 'app/admin/products/products.module.js' ],
            'admin.users.scripts': [ 'app/admin/users/users.module.js' ],
            'admin.tokens.scripts': [ 'app/admin/tokens/tokens.module.js' ]
        });

        ///////// ROUTES /////////

        routerProvider
            .group('store', {
                deps: ['store.styles', 'store.scripts'],
                views: {
                    '@': {
                        templateUrl: 'layouts/store.html',
                        controller: 'StoreController as storevm',        
                    }
                },
                routes: {
                    'home': {
                        url: '/home',
                        deps: ['store.home.styles', 'store.home.scripts'],
                        views: {
                            '@store': {
                                templateUrl: 'app/store/home/home.html',
                                controller: 'StoreHomeController as vm'
                            }
                        }
                    },
                    'products': {
                        url: '/products',
                        deps: ['store.products.scripts'],
                        views: {
                            '@store': {
                                templateUrl: 'app/store/products/products.html',
                                controller: 'StoreProductsController as storeproductsvm'
                            }
                        }
                    },
                    'products.detail': {
                        url: '/:slug',
                        views: {
                            '@store.products': {
                                templateUrl: 'app/store/products/products.detail.html'
                            }
                        }
                    },
                    'account': {
                        url: '/account'
                    },
                    'register': {
                        url: '/register',
                        views: {
                            '@store': {
                                templateUrl: 'app/store/register/register.html'
                            }
                        }
                    },
                    'appointment': {
                        url: '/appointment',
                        views: {
                            '@store': {
                                templateUrl: 'app/store/appointment/appointment.html'
                            }
                        }
                    },
                    'aboutus': {
                        url: '/aboutus',
                        views: {
                            '@store': {
                                templateUrl: 'app/store/aboutus/aboutus.html'
                            }
                        }
                    }
                }
            })
            .group('admin', {
                deps: ['admin.styles', 'admin.scripts'],
                views: {
                    '@': {
                        templateUrl: 'layouts/admin.html',
                        controller: 'AdminController as adminvm'
                    }
                },
                routes: {
                    'index': { 
                        url: ''
                    },
                    'dashboard': {
                        url: '/dashboard',
                        deps: ['admin.dashboard.scripts'],
                        controller: 'AdminDashboardController as admindashboardvm'
                    },
                    'products': {
                        url: '/products',
                        deps: ['admin.products.scripts'],
                        views: {
                            '@admin': {
                                templateUrl: 'app/admin/products/products.html',
                                controller: 'AdminProductsController as adminproductsvm'
                            }
                        }
                    },
                    'login': { 
                        url: '/login' 
                    },
                    'users': { 
                        url: '/users',
                        deps: ['admin.users.scripts'],
                        views: {
                            '@admin': {
                                templateUrl: 'app/admin/users/users.html',
                                controller: 'UsersController as usersvm'
                            }
                        }
                    },
                    'tokens': {
                        url: '/tokens',
                        deps: ['admin.tokens.scripts'],
                        views: {
                            '@admin': {
                                templateUrl: 'app/admin/tokens/tokens.html',
                                controller: 'TokensController as tokensvm'
                            }   
                        }
                    }
                }
            })
            .fallback({
                url: '/store/home'
            });
    }

}());