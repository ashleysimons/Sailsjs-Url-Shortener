var Promise = require("bluebird");
var sinon = require('sinon');
var modelUtilService = {
    getToken: function() {
        return Math.random().toString(36).substring(2, 8);
    },
    getUniqueTokenSingleAttempt: function(modelType){
        return new Promise(function(resolve, reject)
        {
            var tokenAttempt = modelUtilService.getToken();
            Url.find({token:tokenAttempt})
                .then(function(urls) {
                    if(urls.length > 0){
                        reject(new Error("Token was already taken. "));
                    } else {
                        resolve(tokenAttempt);
                    }
                })
                .catch(function(err){
                    var errorMessage = "Whilst checking for the existence of " + tokenAttempt + " got error: " + err.message;
                    sails.error(errorMessage);
                    reject(new Error(errorMessage));
                });
        });
    },
    getUniqueTokenMultipleAttempts: function(){
        return new Promise(function(resolve, reject){
            var attemptCount = 0;
            var anonTokenLoopAttempt = function(){
                modelUtilService.getUniqueTokenSingleAttempt()
                    .then(function(token){
                        resolve(token);
                    })
                    .catch(function(err){
                        if(attemptCount < 10){
                            attemptCount++;
                            anonTokenLoopAttempt();
                        } else {
                            reject(new Error("Exceeded attempt limit"));
                        }
                    });
            }
            anonTokenLoopAttempt();
        });
    }
};
module.exports = modelUtilService;