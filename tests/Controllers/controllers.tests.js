/*
describe('Controllers', function(){
    var scope;
    var window;
    var ionicSlideBoxDelegate;
    var questions;
    
    // load the controller's module
    beforeEach(module('starter.controllers'));
    
    beforeEach(inject(function (_Questions_) {
        questions = _Questions_;
    }));
    

    beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        window = jasmine.createSpyObj('window', ['navigator']);
        ionicSlideBoxDelegate = jasmine.createSpyObj('ionicSlideBoxDelegate', ['next']);

        $controller('FeedbackCtrl', {
            $scope: scope,
            $window : window,
            $ionicSlideBoxDelegate : ionicSlideBoxDelegate,
            Questions : questions
        });
    }));
    
    it('can get an instance of my factory', inject(function(Friends) {
        expect(Friends).toBeDefined();
    }));

    // tests start here
    it('should have current rating to 5', function(){
        expect(scope.dynamic).toEqual(5);
    });
    
    it('should have Max rating to 10', function(){
        expect(scope.dynamic).toEqual(10);
    });
    
     it('should not have survey submitted', function(){
        expect(scope.surveySubmitted).toEqual(false);
    });
});
*/