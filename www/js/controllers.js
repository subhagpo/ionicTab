angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal) {
 
    //Opens the login modal as soon as the controller initializes
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modallogin) {
        $scope.modallogin = modallogin;
        $scope.modallogin.show();
    });

    // Authenticate user
    $scope.login = function() {
        var auth = {
            displayName: 'Subhag Oak',
            email: 'oaks007@hotmail.com',
            profileImageURL: 'img/12.png'
        }
    
        $scope.authData = auth;
    }
  
    $scope.savefbinfo  = function() {
        $scope.modallogin.hide();
    }
})

.controller('FeedbackCtrl', function($scope, $window) {
    $scope.submitSurvey = function() {
         $scope.surveySubmitted = true;
         $scope.$apply();
    }
})
