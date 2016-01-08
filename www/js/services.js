angular.module('starter.services', [])

.factory('Auth', function() {
    var auth = {
        displayName: 'Subhag Oak',
        email: 'oaks007@hotmail.com',
        cover: 'img/12.png',
        gender: 'mail'
    }
    
    return {
        instance : function () {
            return auth;
        }
    }
})

.factory('Questions', function() {
  // Some fake testing data
  var questions = [
     {
        Value: 'How do you rate this workshop on a scale of 1 to 10?',
        Rating: null
     }, 
     {
        Value: 'How do you rate MSFT work in the mobile app dev space on a scale of 1 to 10?',
        Rating: null
  }];

  return {
    all: function() {
      return questions;
    }
  };
});