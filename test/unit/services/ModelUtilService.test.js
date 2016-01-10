var assert = require('assert-plus');
var sinon = require('sinon');
var sandbox;

beforeEach(function () {
    sandbox = sinon.sandbox.create();
});

afterEach(function () {
    sandbox.restore();
});

describe('ModelUtilService', function() {
    describe('sails.config.environment', function(done) {
        it('should have test env', function () {
            assert.equal("test", sails.config.environment);
        });
    });
    describe('sails.config.environment', function() {
        it('should get back six char string', function () {
            var string = ModelUtilService.getToken();
            assert.string(string, "token");
            assert.equal(6, string.length, "token length");
        });
    });
    describe('#getUniqueTokenSingleAttempt()', function() {
        it('should return a unique string', function (done) {
            ModelUtilService.getUniqueTokenSingleAttempt(Url).then(function(token){
                assert.string(token, "token is string");
                assert.equal(6, token.length, "token length");
                done();
            });
        });
    });
    describe('#getUniqueTokenMultipleAttempts()', function() {
        it('it should fail after 11 attempts', function (done) {
            var getTokenStub = sandbox.stub(ModelUtilService, "getToken");
            getTokenStub.returns("foobah");
            sandbox.spy(ModelUtilService, "getUniqueTokenSingleAttempt");
            Url.create({token: "foobah", path: "http://google.com"}).then(function(url){
                assert.equal("foobah", url.token, "saved url token");
                ModelUtilService.getUniqueTokenMultipleAttempts(Url)
                .catch(function(err){
                    assert.equal(11, ModelUtilService.getUniqueTokenSingleAttempt.callCount, "getUniqueTokenSingleAttempt call count");
                    done();
                });
            })

        });
        it('should return a unique string', function (done) {
            sandbox.spy(ModelUtilService, "getUniqueTokenSingleAttempt");

            ModelUtilService.getUniqueTokenMultipleAttempts(Url).then(function(token){
                assert.string(token, "token");
                assert.equal(6, token.length, "token length");
                assert.equal(1, ModelUtilService.getUniqueTokenSingleAttempt.callCount, "getUniqueTokenSingleAttempt call count");
                done();
            });
        })

    });
});