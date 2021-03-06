var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var gameController = function (gameService, nav) {
    var middleware = function (req, res, next) {
        //if (!req.user) {
        //    res.redirect('/');
        // }
        next();
    };
    var getIndex = function (req, res) {
        // var url = 'mongodb://localhost:27017/libraryApp';
        var url = 'mongodb://urvaius:Buffy11$@arne-5-mongo1-shard-00-00-ujozx.mongodb.net:27017,arne-5-mongo1-shard-00-01-ujozx.mongodb.net:27017,arne-5-mongo1-shard-00-02-ujozx.mongodb.net:27017/gameLibraryApp?ssl=true&replicaSet=arne-5-mongo1-shard-0&authSource=admin';
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('games');

            collection.find({}).toArray(
                function (err, results) {
                    res.render('gameListView', {
                        title: 'Games',
                        nav: nav,
                        games: results
                    });
                }
            );
        });
    };


    var getById = function (req, res) {
        var id = new objectId(req.params.id);
        // var url = 'mongodb://localhost:27017/libraryApp';
        var url = 'mongodb://urvaius:Buffy11$@arne-5-mongo1-shard-00-00-ujozx.mongodb.net:27017,arne-5-mongo1-shard-00-01-ujozx.mongodb.net:27017,arne-5-mongo1-shard-00-02-ujozx.mongodb.net:27017/gameLibraryApp?ssl=true&replicaSet=arne-5-mongo1-shard-0&authSource=admin';
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('games');

            collection.findOne({
                    _id: id
                },
                function (err, results) {
                    if (results.gameId) {
                        gameService.getGameById(results.gameId,
                            function (err, game) {
                                results.game = game;
                                res.render('gameView',{
                                    title: 'Games',
                                    nav: nav,
                                    game: results
                                });

                            });

                    } else {
                        res.render('gameView', {
                            title: 'Games',
                            nav: nav,
                            game: results
                        });
                    }
                }
            );
        });
    };
    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    };
};

module.exports = gameController;