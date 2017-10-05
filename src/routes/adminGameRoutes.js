var express = require('express');
var adminGameRouter = express.Router();
var mongodb = require('mongodb').MongoClient;


var games = [{
        title: 'Space invaders',
        genre: 'Historical Fiction',
        developer: 'Lev Nikolayevich Tolstoy',
        own: false
    },
    {
        title: 'Everquest',
        genre: 'Fantasy',
        developer: 'Terry brooks',
        own: true

    },
    {
        title: 'Final Fantasy 7',
        genre: 'Historical Fiction',
        developer: 'forget his name',
        own: true
    },
    {
        title: 'Leisure suite larry',
        genre: 'Science Fiction',
        developer: 'HG Wells',
        own: false

    }
];

var router = function (nav) {

    adminGameRouter.route('/addGames')
        .get(function (req, res) {
            // var url = 'mongodb://localhost:27017/libraryApp';
            var url = 'mongodb://urvaius:Buffy11$@arne-5-mongo1-shard-00-00-ujozx.mongodb.net:27017,arne-5-mongo1-shard-00-01-ujozx.mongodb.net:27017,arne-5-mongo1-shard-00-02-ujozx.mongodb.net:27017/gameLibraryApp?ssl=true&replicaSet=arne-5-mongo1-shard-0&authSource=admin';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('games');
                collection.insertMany(games,
                    function (err, results) {
                        res.send(results);
                        db.close();
                    }
                );
            });
            // res.send('inserting books');
        });

    return adminGameRouter;
};

module.exports = router;