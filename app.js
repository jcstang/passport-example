var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require("./config/passport");

var PORT = process.env.PORT || 8100;
var db = require("./models");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


// routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// app.listen(PORT, function() {
//     console.log("app listening on PORT: " + PORT);
// });

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("==> boom listening on port %s. viist http://localhost:%s/ in your browser.", PORT, PORT);
    });
});