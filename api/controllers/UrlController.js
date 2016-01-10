/**
 * UrlController
 *
 * @description :: Server-side logic for managing urls
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    add: function (req, res) {
        var newUrl = req.body;
        ModelUtilService.getUniqueTokenMultipleAttempts()
            .then(function(token){
                Url.create({token: token, path: newUrl.path})
                    .then(function(url){
                        res.json(200, url);
                    })
                    .catch(function(err){
                        res.json(501, {});
                    });
            })
            .catch(function(err){
                res.json(502, {'error': err.message });
            });
    },
    find: function(req, res){
        Url.findOne({id:req.param('id')}).exec(function(err, url){
            if(err){
                res.json(500, {});
            } else {
                res.json(200, url);
            }
        });
    },
    redirect: function(req, res){
        Url.findOne({token:req.param('token')}).exec(function(err, url){
            if(url != undefined && url.path != undefined){
                res.redirect(url.path);
            } else {
                res.notFound();
            }
        });
    }
};

