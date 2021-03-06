var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();

var port = process.env.PORT || 5000;
var nav = [{
    Link: '/Books',
    Text: 'Books'
}, {
    Link: '/Authors',
    Text: 'Author'
}];
//var bookRouter = require('./src/routes/bookRoutes')(nav);
//var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);
var adminGameRouter = require('./src/routes/adminGameRoutes')(nav);
var gameRouter = require('./src/routes/gameRoutes')(nav);
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));

require('./src/config/passport')(app)
app.set('views', './src/views');

app.set('view engine', 'ejs');

//app.use('/Books', bookRouter);
app.use('/Auth', authRouter);
//app.use('/Admin', adminRouter);
app.use('/GamesAdmin', adminGameRouter);
app.use('/Games', gameRouter);
app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hello from render',
        nav: [{
            Link: '/Authors',
            Text: 'Authors'
        }, {
            Link: '/Games',
            Text: 'Games'
        }]
    });
});
app.get('/ga,es', function (req, res) {
    res.send('Hello games');

});
app.listen(5000, function (err) {
    console.log('running server on port ' + port);
});