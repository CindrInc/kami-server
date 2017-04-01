var express = require('express');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var bodyParser = require('body-parser');
var path = require('path');

var port = process.env.PORT || 3000;
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

var routes = require("./routes");
app.use('/', routes);

var db = new sqlite3.Database('anime.db');




var dbActions =  {
	createTable: function(table_name, parameters) {
		//current parameters: "id INTEGER primary key, url TEXT, name TEXT, otherNames TEXT, summary TEXT, imageLocation TEXT, genres TEXT, sub BOOLEAN, numberOfEpisodes INTEGER, complete BOOLEAN, lastUpdateDate DATETIME"
		db.run("CREATE TABLE " + table_name + " (" + parameters + ");"
			, function(err) {
				if(!err){
					console.log("Table made!");
				}
				else {
					console.log(err);
				}
		});
	},
	getDateNow: function() {
		//format: YYYYMMDD HHMM
		var d = new Date();

		return "" + d.getFullYear() + d.getMonth() + d.getDate() + " " + d.getHours() + d.getMinutes();
	}

	
};

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, function() {
	console.log("Server started...");
});