// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var path     = require('path');
var port     = process.env.PORT || 8000;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var favicon = require('serve-favicon');
var configDB = require('./config/database.js');
var routes = require('./app/routes/index');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
var fs  = require('fs');


// configuration ===============================================================
const mongoURI = 'mongodb://meraki:$oftdev2ELKJJ@ds259732.mlab.com:59732/ggcinternapp';

const connection = mongoose.connect(configDB.url);
const conn = mongoose.createConnection(configDB.url);
require('./config/passport'); 

mongoose.connection.on('connected', () => {
    console.log('Connected to database!');
});

mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});


// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms



// NEW GRIDFS STUFF

Grid.mongo = mongoose.mongo;
var gfs = Grid(conn.db);


app.post('/uploadTest', (req, res) => {

var ferpaPath = path.join(__dirname, 'ferpa.pdf');
console.log('posted');

conn.once('open', function() {
    console.log('- Connection open -');

    var writestream = gfs.createWriteStream({
        filename: 'ferpa.pdf'
    });

    fs.createReadStream(ferpaPath).pipe(writestream);

    writestream.on('close', function(file) {
        console.log(file.filename + ' Written to db');
    });
});
});






app.use(express.static(path.join(__dirname, 'public')))


// Set favicon to the SST crest
app.use(favicon(__dirname + '/public/images/logo.png'));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'dfgd5155435445df1gdfgdry5y4345' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

require('./app/routes/index.js')(app, passport);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

