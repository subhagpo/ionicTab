describe('Testing feedback screen ', function(){  

    
    beforeEach(function() {
        browser.ignoreSynchronization = true;
        var loginButton = element(by.id('login'));
        loginButton.click();
        
        var enterButton = element(by.id('enter'));
        enterButton.click();
        browser.driver.sleep(1000);
        // Click the Feedback tab 
        element(by.className('ion-ios-infinite-outline')).click();
        browser.driver.sleep(1000);
    });

    it('Make sure feedback tab is open and flip to account', function() {
        expect(browser.getLocationAbsUrl()).toMatch("/tab/feedback");
        // Check if the first quuestion is visible 
        var test = element(by.id('question'));
        expect(test.getText()).toContain('workshop');
        
        // Click the Accounts tab 
        element(by.className('ion-ios-person-outline')).click();
        browser.driver.sleep(1000);
        
        expect(browser.getLocationAbsUrl()).toMatch("/tab/account");
        test = element(by.id('gender'));
        expect(test.getText()).toContain('Male');
        
    })

});