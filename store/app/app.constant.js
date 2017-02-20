
(function(){

    angular
        .module('app')
        .constant('_', _)
        .constant('$', $)
        .constant('API', {
            ID: 3,
            URL: 'http://carmen.apache.vm/service/',
            KEY: ''
        });

}());