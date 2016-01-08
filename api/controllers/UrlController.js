/**
 * UrlController
 *
 * @description :: Server-side logic for managing urls
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    add: function (req, res) {
        var newUrl = req.body;
        Url.create({token: Math.random().toString(36).substring(2, 8), path: newUrl.path}, function(err, url){
            if(err){
                res.json(500, {});
            } else {
                res.json(200, url);
            }
        });
    }
};

