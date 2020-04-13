// Requiring bcrypt for password hashing. Using the bcryptjs version as 
//the regular bcrypt module sometimes causes errors on Windows machines
// var bcrypt = require("bcryptjs");
var bcrypt = require("bcrypt");
//
// Creating our User model
//Set it as export because we will need it required on the server
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        // The email cannot be null, and must be a proper email before creation
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        // The password cannot be null
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    // Creating a custom method for our User model. 
    //This will check if an unhashed password entered by the 
    //user can be compared to the hashed password stored in our database
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password

    // User.hook("beforeCreate", function (user) {
    //     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    // });
    // User.hook('beforeCreate', function(user, options) {
    //     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    // })

    User.beforeCreate(function(user, options) {
        // return hashPassword(user.password).then(function(hashedPw) {
        //     user.password = hashedPw;
        // });
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    return User;
};

//This is a fix by Samaila Philemon Bala in case you want to use ES6
//and the above is not working

//User.beforeCreate(user => {
//  user.password = bcrypt.hashSync(
//  user.password,
//bcrypt.genSaltSync(10),
//null
//);
//});