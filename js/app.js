"use strict";

(function(){

angular
.module("wdinstagram", ['ui.router','ngResource'])
.config(['$stateProvider', RouterFunction])
.controller('PhotoIndexController', ['PhotoFactory', function(PhotoFactory){
    this.photos = PhotoFactory.query();
}])
.controller('PhotoNewController', ['PhotoFactory', function(PhotoFactory){
    this.photo = new PhotoFactory();
    this.create = function(){
    this.photo.$save();
    }
}])
.controller('PhotoEditController', ['PhotoFactory','$stateParams', function(PhotoFactory, $stateParams){
    this.photo = PhotoFactory.get({id: $stateParams.id});
    this.update = function() {
        this.photo.$save();
    }
}])
.controller('PhotoShowController', ['PhotoFactory','$stateParams', function(PhotoFactory, $stateParams){
    this.photo = PhotoFactory.get({id: $stateParams.id});
}])
.factory('PhotoFactory', ['$resource', function($resource){
    return $resource('http://localhost3000/photos/:id')
}])

function RouterFunction($stateProvider) {
    $stateProvider
    .state('photoIndex',{
        url: '/photos',
        templateUrl: 'js/ng-views/index.html',
        controller: 'PhotoIndexController',
        controllerAs: 'vm',
    })
    .state('photoNew',{
        url: '/photos/new',
        templateUrl: 'js/ng-views/new.html',
        controller: 'PhotoNewController',
        controllerAs: 'vm',
    })
    .state('photoEdit',{
        url: '/photos/:id/edit',
        templateUrl: 'js/ng-views/edit.html',
        controller: 'PhotoEditController',
        controllerAs: 'vm',
    })
    .state('photoShow',{
        url: '/photos/:id',
        templateUrl: 'js/ng-views/show.html',
        controller: 'PhotoShowController',
        controllerAs: 'vm',
    });
}

})();
