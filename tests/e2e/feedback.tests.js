describe('Flipping around tabs', function() {  
    var loginButton;
    
     beforeEach(function() {
        loginButton = element(by.id('login'));
        loginButton.click();
     });
 
    it('Make sure Account tab is shown, flip to Feedback and back', function() {
        // Check if we are on the accounts page.
        var displayName = element(by.id('displayName'));
        expect(displayName.getText()).toContain('Subhag Oak');
        
        // Go the the tabs display
        var enterButton = element(by.id('enter'));
        enterButton.click();
        browser.driver.sleep(1000);
        
        // Click the Feedback tab 
        element(by.className('ion-ios-infinite-outline')).click();
        browser.driver.sleep(1000);
        
        // Validate that the Account tab is shown
        expect(browser.getLocationAbsUrl()).toMatch("/tab/feedback");
        // Check if the first quuestion is visible 
        var test = element(by.id('question'));
        expect(test.getText()).toContain('workshop');
        
        // Click the Account tab 
        element(by.className('ion-ios-person-outline')).click();
        browser.driver.sleep(1000);
        
        // Validate that the Account tab is shown
        expect(browser.getLocationAbsUrl()).toMatch("/tab/account");
        test = element(by.id('email'));
        expect(test.getText()).toContain('Email');
        
    })

});