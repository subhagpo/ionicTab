/// <reference path="../definitions/harness.d.ts" />
var assert = require("assert");
var acquisitionSdk = require("../script/acquisition-sdk");
var mockApi = require("./acquisition-rest-mock");
var latestPackage = clone(mockApi.latestPackage);
var configuration = {
    serverUrl: mockApi.serverUrl,
    deploymentKey: mockApi.validDeploymentKey,
};
var templateCurrentPackage = {
    deploymentKey: mockApi.validDeploymentKey,
    description: "sdfsdf",
    label: "v1",
    appVersion: latestPackage.appVersion,
    packageHash: "hash001",
    isMandatory: false,
    packageSize: 100
};
var scriptUpdateResult = {
    deploymentKey: mockApi.validDeploymentKey,
    description: latestPackage.description,
    downloadUrl: latestPackage.downloadURL,
    label: latestPackage.label,
    appVersion: latestPackage.appVersion,
    isMandatory: latestPackage.isMandatory,
    packageHash: latestPackage.packageHash,
    packageSize: latestPackage.packageSize
};
var nativeUpdateResult = {
    updateAppVersion: true,
    appVersion: latestPackage.appVersion
};
describe("Acquisition SDK", function () {
    beforeEach(function () {
        mockApi.latestPackage = clone(latestPackage);
    });
    it("Package with lower label and different package hash gives update", function (done) {
        var acquisition = new acquisitionSdk.AcquisitionManager(new mockApi.HttpRequester(), configuration);
        acquisition.queryUpdateWithCurrentPackage(templateCurrentPackage, function (error, returnPackage) {
            assert.equal(null, error);
            assert.deepEqual(scriptUpdateResult, returnPackage);
            done();
        });
    });
    it("Package with equal package hash gives no update", function (done) {
        var equalVersionPackage = clone(templateCurrentPackage);
        equalVersionPackage.packageHash = latestPackage.packageHash;
        var acquisition = new acquisitionSdk.AcquisitionManager(new mockApi.HttpRequester(), configuration);
        acquisition.queryUpdateWithCurrentPackage(equalVersionPackage, function (error, returnPackage) {
            assert.equal(null, error);
            assert.equal(null, returnPackage);
            done();
        });
    });
    it("Package with higher different hash and higher label version gives update", function (done) {
        var higherVersionPackage = clone(templateCurrentPackage);
        higherVersionPackage.packageHash = "hash990";
        var acquisition = new acquisitionSdk.AcquisitionManager(new mockApi.HttpRequester(), configuration);
        acquisition.queryUpdateWithCurrentPackage(higherVersionPackage, function (error, returnPackage) {
            assert.equal(null, error);
            assert.deepEqual(scriptUpdateResult, returnPackage);
            done();
        });
    });
    it("Package with lower native version gives update notification", function (done) {
        var lowerAppVersionPackage = clone(templateCurrentPackage);
        lowerAppVersionPackage.appVersion = "0.0.1";
        var acquisition = new acquisitionSdk.AcquisitionManager(new mockApi.HttpRequester(), configuration);
        acquisition.queryUpdateWithCurrentPackage(lowerAppVersionPackage, function (error, returnPackage) {
            assert.equal(null, error);
            assert.deepEqual(nativeUpdateResult, returnPackage);
            done();
        });
    });
    it("Package with higher native version gives no update", function (done) {
        var higherAppVersionPackage = clone(templateCurrentPackage);
        higherAppVersionPackage.appVersion = "9.9.0";
        var acquisition = new acquisitionSdk.AcquisitionManager(new mockApi.HttpRequester(), configuration);
        acquisition.queryUpdateWithCurrentPackage(higherAppVersionPackage, function (error, returnPackage) {
            assert.equal(null, error);
            assert.deepEqual(null, returnPackage);
            done();
        });
    });
    it("An empty response gives no update", function (done) {
        var lowerAppVersionPackage = clone(templateCurrentPackage);
        lowerAppVersionPackage.appVersion = "0.0.1";
        var emptyReponse = {
            statusCode: 200,
            body: JSON.stringify({})
        };
        var acquisition = new acquisitionSdk.AcquisitionManager(new mockApi.CustomResponseHttpRequester(emptyReponse), configuration);
        acquisition.queryUpdateWithCurrentPackage(lowerAppVersionPackage, function (error, returnPackage) {
            assert.equal(null, error);
            done();
        });
    });
    it("An unexpected (but valid) JSON response gives no update", function (done) {
        var lowerAppVersionPackage = clone(templateCurrentPackage);
        lowerAppVersionPackage.appVersion = "0.0.1";
        var unexpectedResponse = {
            statusCode: 200,
            body: JSON.stringify({ unexpected: "response" })
        };
        var acquisition = new acquisitionSdk.AcquisitionManager(new mockApi.CustomResponseHttpRequester(unexpectedResponse), configuration);
        acquisition.queryUpdateWithCurrentPackage(lowerAppVersionPackage, function (error, returnPackage) {
            assert.equal(null, error);
            done();
        });
    });
    it("Package for companion app ignores high native version and gives update", function (done) {
        var higherAppVersionCompanionPackage = clone(templateCurrentPackage);
        higherAppVersionCompanionPackage.appVersion = "9.9.0";
        var companionAppConfiguration = clone(configuration);
        configuration.ignoreAppVersion = true;
        var acquisition = new acquisitionSdk.AcquisitionManager(new mockApi.HttpRequester(), configuration);
        acquisition.queryUpdateWithCurrentPackage(higherAppVersionCompanionPackage, function (error, returnPackage) {
            assert.equal(null, error);
            assert.deepEqual(scriptUpdateResult, returnPackage);
            done();
        });
    });
    it("If latest package is mandatory, returned package is mandatory", function (done) {
        mockApi.latestPackage.isMandatory = true;
        var acquisition = new acquisitionSdk.AcquisitionManager(new mockApi.HttpRequester(), configuration);
        acquisition.queryUpdateWithCurrentPackage(templateCurrentPackage, function (error, returnPackage) {
            assert.equal(null, error);
            assert.equal(true, returnPackage.isMandatory);
            done();
        });
    });
    it("If invalid arguments are provided, an error is raised", function (done) {
        var invalidPackage = clone(templateCurrentPackage);
        invalidPackage.appVersion = null;
        var acquisition = new acquisitionSdk.AcquisitionManager(new mockApi.HttpRequester(), configuration);
        try {
            acquisition.queryUpdateWithCurrentPackage(invalidPackage, function (error, returnPackage) {
                assert.fail("Should throw an error if the native implementation gave an incorrect package");
                done();
            });
        }
        catch (error) {
            done();
        }
    });
    it("If an invalid JSON response is returned by the server, an error is raised", function (done) {
        var lowerAppVersionPackage = clone(templateCurrentPackage);
        lowerAppVersionPackage.appVersion = "0.0.1";
        var invalidJsonReponse = {
            statusCode: 200,
            body: "invalid {{ json"
        };
        var acquisition = new acquisitionSdk.AcquisitionManager(new mockApi.CustomResponseHttpRequester(invalidJsonReponse), configuration);
        acquisition.queryUpdateWithCurrentPackage(lowerAppVersionPackage, function (error, returnPackage) {
            assert.notEqual(null, error);
            done();
        });
    });
    it("If deploymentKey is not valid...", function (done) {
        // TODO: behaviour is not defined
        done();
    });
    it("reportStatus(...) signals completion", function (done) {
        var acquisition = new acquisitionSdk.AcquisitionManager(new mockApi.HttpRequester(), configuration);
        acquisition.reportStatus(acquisitionSdk.AcquisitionStatus.DeploymentFailed, "message", (function (error, parameter) {
            if (error) {
                throw error;
            }
            assert.equal(parameter, null);
            done();
        }));
    });
});
function clone(initialObject) {
    return JSON.parse(JSON.stringify(initialObject));
}