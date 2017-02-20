
(function(){

    angular
        .module('core')
        .provider('router', router)
        .provider('loader', loader)
        .provider('site', site)
        .provider('api', api);

    /** @ngInject */
    function router($stateProvider, $urlRouterProvider) {
        
        this.group = group;
        this.register = register;
        this.fallback = fallback;

        this.$get = factory;

        function group(name, options) {
            var groupState = { abstract: true },
                routes = options.routes || {};

            if (options.layout) {
                groupState.templateUrl = options.layout;
            }

            groupState.url = '/' + name;

            groupState.resolve = {
                /** @ngInject */
                site: function(site) {
                    return site.init();
                },
                /** @ngInject */
                groupDependencies: function(loader) {
                    return loader.load(options.deps || []);
                }
            };

            $stateProvider.state(name, groupState);

            _.forOwn(routes, function(route, state){
                state = name + '.' + state;

                if (route.views === undefined) {
                    var place;

                    place = '@' + name;

                    route.views = {};
                    route.views[place] = {};

                    if (route.templateUrl) {
                        route.views[place].templateUrl = route.templateUrl;
                        delete route.templateUrl;
                    }

                    if (route.controller) {
                        route.views[place].controller = route.controller;
                        delete route.controller;
                    }
                }

                if (route.deps !== undefined) {
                    var deps = route.deps;
                    delete route.deps;

                    route.resolve = route.resolve || {};

                    /** @ngInject */
                    route.resolve.routeDependencies = function(groupDependencies, loader) {
                        return loader.load(deps);
                    };
                }
                
                $stateProvider.state(state, route);
            });

            return this;
        }

        function register(routes) {
            
        }

        function fallback(state) {
            if (state.url) {
                $urlRouterProvider.otherwise(state.url);
            }
        }

        function factory() {
            return {};
        }
    }

    /** @ngInject */
    function loader($ocLazyLoadProvider) {
        this.$get = factory;
        this.register = register;

        function register(modules) {
            var config = {
                modules: []
            };

            _.forOwn(modules, function(options, name){
                var module;

                if (_.isArray(options)) {
                    options = {
                        files: options
                    };
                }

                if (options.insertBefore === undefined) {
                    options.insertBefore = /\.scripts/.test(name) ? '#body-files' : '#head-files';
                }

                module = _.extend({name: name}, options);
                config.modules.push(module);
            });

            $ocLazyLoadProvider.config(config);
        }

        /** @ngInject */
        function factory($ocLazyLoad) {
            return {
                load: load
            };

            function load(modules) {
                return $ocLazyLoad.load(modules, {serie: true});
            }
        }
    }

    /** @ngInject */
    function site() {
        this.$get = factory;

        /** @ngInject */
        function factory($rootScope, $http, API) {
            return {
                init: init
            };

            function init() {
                return $http.get(API.URL + 'site').then(function(res){
                    var data = res.data || {};
                    $rootScope.site = data;
                    return data;
                });
            }
        }
    }

    /** @ngInject */
    function api() {

        this.$get = factory;

        /////////
        
        function factory() {
            return {
                get: get,
                post: post,
                put: put,
                del: del
            };

            /////////
            
            function get(path, data) {

            }

            function post(path, data) {

            }

            function put(path, data) {

            }

            function del(path, data) {

            }

            function request(options) {

            }
        };

    }

}());