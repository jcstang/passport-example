var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");


passport.use(new LocalStrategy(
    {
        usernameField: "email"
    },
    function(email, password, done) {
        db.User.findOne({
            where: {
                email: email
            }
        }).then(function(dbUser) {
            if(!dbUser) {
                return done(null, false, {
                    message: "incorrect email."
                });
            }
            else if (!dbUser.validPassword(password)) {
                return done(null, false, {
                    message: "incorrect password."
                });
            }

            return done(null, dbUser);
        });
    }
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, callback) {
    callback(null, user);
});

passport.deserializeUser(function(obj, callback) {
    callback(null, obj);
});

module.exports = passport;