'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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
    endpoints: [{
        url: { type: String },
        name: { type: String },
        isActive: { type: Boolean }
    }],
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
        github: {
            id: String,
            accessToken: String
        }
    }
});

var encryptPassword = function encryptPassword(password) {
    return _crypto2.default.createHmac('sha256', _config2.default.sha256Secret).update(password).digest('hex');
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

User.statics.socialSignup = function (_ref2) {
    var email = _ref2.email,
        provider = _ref2.provider,
        accessToken = _ref2.accessToken,
        username = _ref2.username,
        socialId = _ref2.socialId;


    var existUser = this.findByEmail(email);

    if (!exustUser) {
        existUser = new this({
            email: email,
            username: username,
            social: (0, _defineProperty3.default)({}, provider, {
                id: socialId,
                accessToken: accessToken
            })
        });
    } else {
        existUser.update({
            social: (0, _defineProperty3.default)({}, provider, {
                id: socialId,
                accessToken: accessToken
            })
        });
    }

    return user.save();
};

User.statics.findBySocialId = function (_ref3) {
    var provider = _ref3.provider,
        id = _ref3.id;

    return this.findOne((0, _defineProperty3.default)({}, 'social.' + provider + '.id', id)).exec();
};

User.statics.findByEmail = function (email) {
    return this.findOne({ email: email }).exec();
};

User.methods.verifyPassword = function (password) {
    return this.password == encryptPassword(password);
};

exports.default = _mongoose2.default.model('User', User);
//# sourceMappingURL=User.js.map