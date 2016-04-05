var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();
/**
 * [port description]
 * Specify the port 
 * If there is no port predefined, 5000 is the default port
 * @type {[type]}
 */
var port = process.env.PORT || 5000;

// Before splitting into separate file
// var bookRouter = express.Router();

var nav = [{Link: '/Books', Text: 'Book'}, 
		   {Link: '/Authors', Text: 'Author'}];
// After splitting into separate file
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(session({secret: 'library'}));

require('./src/config/passport')(app);

app.set('views', 'src/views');

/**
 * Specify which template engine will be used
 * 'jade', '.hbs', 'ejs'
 */
app.set('view engine', 'ejs');

/**
 * Handlebars Template
 * 
 */
// var handlebars = require('express-handlebars');
// app.engine('.hbs', handlebars({extname: '.hbs'}));

var nav = [{Link: '/Books', Text: 'Books'}, 
		   {Link: '/Authors', Text: 'Authors'}];

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res) {
	// use 'render' intead to use template engine like Jade, Handlebars or EJS
	// title, list: pass some references into the template file
	res.render('index', {title: 'Hello from render', 
						 nav: [{Link: '/Books', Text: 'Books'}, 
						 	   {Link: '/Authors', Text: 'Authors'}]				 
						});
});

app.get('/books', function(req, res){
	res.send('Hello Books\n');
});

app.listen(port, function(err){
	console.log('Running server on port ' + port);
});