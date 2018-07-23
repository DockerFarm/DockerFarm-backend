'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

var _config = require('../../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;


var User = new Schema({
    email: String,
    password: String,
    username: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    social: {
        google: {
            id: String,
            accessToken: String
        },
        facebook: {
            id: String,
            accessToken: String
        }
    }
});

var encryptPassword = function encryptPassword(password) {
    return _crypto2.default.createHmac('sha256', _config2.default.hashSecret).update(password).digest('hex');
};

User.statics.localSignup = function (_ref) {
    var email = _ref.email,
        password = _ref.password,
        username = _ref.username;

    var user = new this({
        email: email,
        password: encryptPassword(password),
        username: username
    });

    return user.save();
};

User.statics.findByEmail = function (email) {
    return this.findOne({ email: email }).exec();
};

User.methods.verifyPassword = function (password) {
    return this.password == encryptPassword(password);
};

exports.default = _mongoose2.default.model('User', User);
//# sourceMappingURL=User.js.map