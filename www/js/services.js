angular.module('starter.services', [])

.factory('Questions', function() {
  // Some fake testing data
  var questions = [
     {
        Id: 0,
        Value: 'How do you rate this workshop on a scale of 1 to 10?',
        Rating: null
     }, 
     {
        Id: 1,
        Value: 'How do you rate MSFT work in the mobile app dev space on a scale of 1 to 10?',
        Rating: null
     },
     {
        Id: 2,
        Value: 'How do you rate this app on a scale of 1 to 10?',
        Rating: 8
     }
  ];

  return {
    all: function() {
      return questions;
    },
    get: function(id) {
      for (var i = 0; i < questions.length; i++) {
        if (questions[i].Id === parseInt(id)) {
          return questions[i];
        }
      }
      return null;
    }
  };
});