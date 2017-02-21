
(function(){

    angular
        .module('core')
        .provider('transient', transient)
        .provider('session', session)
        .provider('router', router)
        .provider('loader', loader)
        .provider('theme', theme)
        .provider('auth', auth)
        .provider('site', site)
        .provider('api', api);

    function transient() {
        this.$get = factory;

        /** @ngInject */
        function factory($rootScope) {

            return {
                init: init,
                set: set,
                get: get
            };

            function init() {
                set('user', {
                    authenticated: false
                });
                
                set('site', {
                    title: null
                });

                set('page', {
                    title: null,
                    description: null
                });

                set('route', {
                    state: null,
                    params: null
                });

                set('theme', {
                    bodyCls: 'hold-transition'
                });
            }

            function hash(key) {
                return '__' + key + '__';
            }

            function set(key, value) {
                var keys = key.split('.'),
                    root = hash(keys.shift());

                if ($rootScope[root] === undefined) {
                    $rootScope[root] = {};
                }

                if (keys.length) {
                    _.set($rootScope[root], _.join(keys, '.'), value);
                } else {
                    $rootScope[root] = value;
                }
                
                return value;
            }

            function get(key) {
                return $rootScope[hash(key)];
            }
        }
    }

    function session() {
        this.$get = factory;

        /** @ngInject */
        function factory($window) {

            var storage = $window.localStorage;

            return {
                all: all,
                has: has,
                get: get,
                put: put,
                pull: pull,
                flush: flush
            };

            function all() {
                var result = {};
                var key, data;

                for (key in storage) {
                    data = JSON.parse(storage.getItem(key));
                    result[key] = data.value;
                }

                return result;
            }

            function has(key) {
                return !!storage.getItem(key);
            }

            function get(key, defaultValue) {
                if (has(key)) {
                    var data = JSON.parse(storage.getItem(key));
                    return data.value;
                }
                return defaultValue;
            }

            function put(key, value) {
                var data = {};

                data.key = key;
                data.value = value;

                storage.setItem(key, JSON.stringify(data));
            }

            function pull(key) {
                storage.removeItem(key);
            }

            function flush() {
                for (var key in storage) {
                    storage.removeItem(key);
                }
            }
        }
    }

    /** @ngInject */
    function router($stateProvider, $urlRouterProvider) {
        
        this.group = group;
        this.fallback = fallback;

        this.$get = factory;

        function group(name, options) {
            var groupState = name,
                groupRoute = { abstract: true, deps: [] },
                groupRoutes = options.routes || {};

            groupRoute.url = '/' + groupState;

            for (var key in options) {
                if (key != 'routes') {
                    groupRoute[key] = options[key];
                }
            }

            var groupResolver = {
                init: groupState + 'GroupInit',
                deps: groupState + 'GroupDeps'
            };

            groupRoute.resolve = {};

            /** @ngInject */
            groupRoute.resolve[groupResolver.init] = function(site) {
                return site.init();
            };

            /** @ngInject */
            groupRoute.resolve[groupResolver.deps] = function(loader) {
                return loader.load(groupRoute.deps);
            };

            $stateProvider.state(groupState, groupRoute);
            
            _.forOwn(groupRoutes, function(route, state){
                state = groupState + '.' + state;

                if (route.deps !== undefined) {
                    route.resolve = route.resolve || {};

                    route.resolve.dependencies = [
                        groupResolver.deps, 
                        'loader', 
                        function(deps, loader) {
                            return loader.load(route.deps);
                        }
                    ];
                }

                $stateProvider.state(state, route);
            });

            return this;
        }

        function fallback(state) {
            if (state.url) {
                $urlRouterProvider.otherwise(state.url);
            }
            return this;
        }

        function factory() {
            /*return {
                states: states,
                params: params
            };

            function states() {

            }

            function params() {

            }*/
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

    function theme() {
        this.$get = factory;

        function factory(transient) {
            return {
                init: init
            };

            function init(options) {
                options = options || {};
                transient.set('theme', options);
            }
        }
    }

    function site() {
        this.$get = factory;

        /** @ngInject */
        function factory($rootScope, $http, transient, API) {
            return {
                init: init
            };

            function init() {
                return $http.get(API.URL + 'api/site/status').then(function(res){
                    var data = res.data || {};
                    return transient.set('site', data);
                });
            }
        }
    }

    function auth() {
        this.$get = factory;

        /** @ngInject */
        function factory($http) {
            return {
                id: id,
                user: user,
                check: check,
                login: login,
                logout: logout
            };

            function id() {

            }

            function user() {

            }

            function check() {

            }

            function login(email, password, remember) {

            }

            function logout() {

            }
        }
    }

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