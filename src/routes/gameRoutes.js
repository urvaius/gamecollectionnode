var express = require('express');
var gameRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var router = function (nav) {
    //var gameService = require('../services/goodreadsService')();
    //var gameController = require('../controllers/gameController')(bookService, nav);
    var gameController = require('../controllers/gameController')();
    gameRouter.use(gameController.middleware);
    gameRouter.route('/')
        .get(gameController.getIndex);

    gameRouter.route('/:id')
        .get(gameController.getById);

    return gameRouter;
};
module.exports = router;